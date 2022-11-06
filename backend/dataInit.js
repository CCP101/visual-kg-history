const { ConnectMysql, NodesWrite, NodesRead, csvRead } = require('./util');
const {v1: uuidv1} = require("uuid");
const fs = require("fs");
let Nodeset = new Set();
/**
 * CSV文件传值处理
 * @param file_path 文件地址
 * @return {Promise<{Set,Set}>} 以期约方式返回Neo4j查询结果{结点结果，关系结果}
 */
async function importInitData(file_path) {
    let result = await csvRead(file_path);
    console.log(result[0]);
    // for (let row in result) {
    //     console.log(result[row][0] + "  " + result[row][1]+ "  " + result[row][2] + "  " + result[row][3]);
    // }
    return result;
}

/**
 * 初始化顺序1：创建MySQL人物记录
 * 单次调用，将数据写入MySQL数据库
 * 10.19修改 增加点的唯一ID 写入图数据库
 */
async function DataToMysql() {
    let deleteTable1 = `DROP TABLE IF EXISTS \`people\``;
    let deleteTable2 = `CREATE TABLE \`people\`(
        \`name\`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        \`weight\` double                                                        NULL DEFAULT NULL,
        \`name_id\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
        PRIMARY KEY (\`name\`) USING BTREE
    ) ENGINE = InnoDB
      CHARACTER SET = utf8mb4
      COLLATE = utf8mb4_0900_ai_ci
      ROW_FORMAT = Dynamic;`;
    await ConnectMysql(deleteTable1);
    await ConnectMysql(deleteTable2);
    let result = await importInitData('../data/PeopleRelation2.csv');
    let set1 = new Set();
    for (let row in result) {
        set1.add(result[row][0]);
        set1.add(result[row][1]);
    }
    console.log(set1.size);
    for (let people of set1) {
        let pointID = uuidv1();
        let NodeInformation = {name: people, weight: 0, name_id: pointID};
        Nodeset.add(NodeInformation)
    }
    // 清洗重复数据后重新构造包含ID与人名的全局Set，并将ID写入图数据库中，保持一致唯一性
    console.log(Nodeset.size);
    for (let people of Nodeset) {
        let query = `INSERT INTO people (\`name\`, \`weight\`, \`name_id\`) 
                        VALUES ('${people['name']}',0,'${people['name_id']}')`;
        await ConnectMysql(query);
    }
}

/**
 * 初始化顺序2：将数据写入Neo4j数据库
 * 将数据写入Neo4j数据库内
 */
async function ImportDataToNeo4j() {
    let deleteTable = 'match (n:DPerson) detach delete n';
    await NodesWrite(deleteTable, "result");
    let result = await importInitData("../data/PeopleRelation2.csv");
    // 创建节点
    for (let people of Nodeset) {
        //写入节点信息，并写入节点与MySQL数据库中共有的ID
        let query = `CREATE (n:DPerson {name: '${people['name']}',id:'${people['name_id']}'})`;
        await NodesWrite(query, "result");
    }
    for (let row of result) {
        let p1 = row[0];
        let p2 = row[1];
        let rel = row[2];
        let direction = row[3];
        if (direction !== "") {
            if (direction === "1"){
                let query = `MATCH (p1:DPerson{name:'${p1}'}),(p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
                await NodesWrite(query, "result");
            }else{
                let query = `MATCH (p1:DPerson{name:'${p1}'}),(p2:DPerson{name:'${p2}'}) CREATE (p1)<-[r:${rel}]-(p2)`;
                await NodesWrite(query, "result");
            }
        } else {
            let query1 = `MATCH (p1:DPerson{name:'${p1}'}),(p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
            // let query2 = `MATCH (p1:DPerson{name:'${p1}'}),(p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
            await NodesWrite(query1, "result");
            // await NodesPromise(query2, "result");
        }
    }
    console.log("Write to Neo4j Success!");
}

/**
 * 初始化顺序3：计算权重后写入MySQL数据库
 */
async function calWeight() {
    let result = await importInitData("../data/PeopleRelation2.csv");
    let set = new Set();
    for (let row in result) {
        set.add(result[row][0]);
        set.add(result[row][1]);
    }
    for (let people of set) {
        let NeoQuery = `match ((n:DPerson{name:'${people}'})-[]-(x:DPerson)) return count(x)`;
        let NeoResult = await NodesRead(NeoQuery, "count(x)");
        let query = `UPDATE people SET weight = ${NeoResult[0]} WHERE name = "${people}"`;
        await ConnectMysql(query);
    }
}

/**
 * 初始化顺序4：计算权重后写入MySQL数据库
 * todo 引入外部历史数据库 属于未来工作 非紧急
 */
async function dataToJSON() {
    let query = `SELECT * FROM people`;
    let result = await ConnectMysql(query);
    let data = [];
    for (let row in result) {
        let obj = {};
        obj['id'] = result[row]['name_id'];
        obj['name'] = result[row]['name'];
        obj['weight'] = result[row]['weight'];
        obj['text'] = "test";
        obj['image'] = "photo_name"
        data.push(obj);
    }
    let json = JSON.stringify(data);
    fs.writeFileSync('../data/json/node_information.json', json);
}

async function dataInit() {
    await DataToMysql();
    await ImportDataToNeo4j();
    await calWeight();
    await dataToJSON();
}
exports.dataInit = dataInit;