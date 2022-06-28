const { ConnectMysql, NodesWrite, NodesRead, csvRead } = require('./util');

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
 */
async function DataToMysql() {
    let deleteTable1 = `DROP TABLE IF EXISTS \`people\``;
    let deleteTable2 = `CREATE TABLE \`people\`(
        \`name\`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        \`weight\` double                                                        NULL DEFAULT NULL,
        PRIMARY KEY (\`name\`) USING BTREE
    ) ENGINE = InnoDB
      CHARACTER SET = utf8mb4
      COLLATE = utf8mb4_0900_ai_ci
      ROW_FORMAT = Dynamic;`;
    await ConnectMysql(deleteTable1);
    await ConnectMysql(deleteTable2);
    let result = await importInitData('../data/PeopleRelation2.csv');
    let set = new Set();
    for (let row in result) {
        set.add(result[row][0]);
        set.add(result[row][1]);
    }
    console.log(set.size);
    for (let people of set) {
        console.log(people);
        let query = `INSERT INTO people (\`name\`, \`weight\`) VALUES ('${people}',0)`;
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
    let set = new Set();
    for (let row in result) {
        set.add(result[row][0]);
        set.add(result[row][1]);
    }
    // 创建节点
    for (let people of set) {
        let query = `CREATE (n:DPerson {name: '${people}'})`;
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

async function dataInit() {
    await DataToMysql();
    await ImportDataToNeo4j();
    await calWeight();
}

exports.dataInit = dataInit;