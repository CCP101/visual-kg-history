const {connectMysql, nodesWrite, nodesRead, csvRead} = require('./util');
const {v1: uuidv1} = require('uuid');
const fs = require('fs');
const Nodeset = new Set();
/**
 * CSV文件传值处理
 * @param {string} filePath 文件地址
 * @return {Promise<{Set,Set}>} 以期约方式返回Neo4j查询结果{结点结果，关系结果}
 */
async function importInitData(filePath) {
  const result = await csvRead(filePath);
  console.log(result[0]);
  // for (let row in result) {
  //     console.log(result[row][0] + "  " +
  //     result[row][1]+ "  " + result[row][2] + "  " + result[row][3]);
  // }
  return result;
}

/**
 * 初始化顺序1：创建MySQL人物记录
 * 单次调用，将数据写入MySQL数据库
 * 10.19修改 增加点的唯一ID 写入图数据库
 */
async function dataToMysql() {
  const deleteTable1 = `DROP TABLE IF EXISTS \`people\``;
  const deleteTable2 = `CREATE TABLE \`people\`(
        \`name\`   varchar(255) CHARACTER SET 
            utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        \`weight\` double  NULL DEFAULT NULL,
        \`name_id\` varchar(255) CHARACTER 
            SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
        PRIMARY KEY (\`name\`) USING BTREE
    ) ENGINE = InnoDB
      CHARACTER SET = utf8mb4
      COLLATE = utf8mb4_0900_ai_ci
      ROW_FORMAT = Dynamic;`;
  await connectMysql(deleteTable1);
  await connectMysql(deleteTable2);
  const result = await importInitData('../data/PeopleRelation2.csv');
  const set1 = new Set();
  for (const row in result) {
    if (row === '') {
      continue;
    }
    set1.add(result[row][0]);
    set1.add(result[row][1]);
  }
  console.log(set1.size);
  for (const people of set1) {
    const pointID = uuidv1();
    const NodeInformation = {name: people, weight: 0, name_id: pointID};
    Nodeset.add(NodeInformation);
  }
  // 清洗重复数据后重新构造包含ID与人名的全局Set，并将ID写入图数据库中，保持一致唯一性
  console.log(Nodeset.size);
  for (const people of Nodeset) {
    const query = `INSERT INTO people (\`name\`, \`weight\`, \`name_id\`) 
                        VALUES ('${people['name']}',0,'${people['name_id']}')`;
    await connectMysql(query);
  }
}

/**
 * 初始化顺序2：将数据写入Neo4j数据库
 * 将数据写入Neo4j数据库内
 */
async function importDataToNeo4j() {
  const deleteTable = 'match (n:DPerson) detach delete n';
  await nodesWrite(deleteTable, 'result');
  const result = await importInitData('../data/PeopleRelation2.csv');
  // 创建节点
  for (const people of Nodeset) {
    // 写入节点信息，并写入节点与MySQL数据库中共有的ID
    const query = `CREATE (n:DPerson 
      {name: '${people['name']}',id:'${people['name_id']}'})`;
    await nodesWrite(query, 'result');
  }
  for (const row of result) {
    const p1 = row[0];
    const p2 = row[1];
    const rel = row[2];
    const direction = row[3];
    if (direction !== '') {
      if (direction === '1') {
        const query = `MATCH (p1:DPerson{name:'${p1}'}),
          (p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
        await nodesWrite(query, 'result');
      } else {
        const query = `MATCH (p1:DPerson{name:'${p1}'}),
          (p2:DPerson{name:'${p2}'}) CREATE (p1)<-[r:${rel}]-(p2)`;
        await nodesWrite(query, 'result');
      }
    } else {
      const query1 = `MATCH (p1:DPerson{name:'${p1}'}),
        (p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
      // let query2 = `MATCH (p1:DPerson{name:'${p1}'}),
      //  (p2:DPerson{name:'${p2}'}) CREATE (p1)-[r:${rel}]->(p2)`;
      await nodesWrite(query1, 'result');
      // await NodesPromise(query2, "result");
    }
  }
  console.log('Write to Neo4j Success!');
}

/**
 * 初始化顺序3：计算权重后写入MySQL数据库
 */
async function calWeight() {
  const result = await importInitData('../data/PeopleRelation2.csv');
  const set = new Set();
  for (const row in result) {
    if (row === '') {
      continue;
    }
    set.add(result[row][0]);
    set.add(result[row][1]);
  }
  for (const people of set) {
    const NeoQuery = `match ((n:DPerson
      {name:'${people}'})-[]-(x:DPerson)) return count(x)`;
    const NeoResult = await nodesRead(NeoQuery, 'count(x)');
    const query = `UPDATE people SET weight = ${NeoResult[0]} 
              WHERE name = "${people}"`;
    await connectMysql(query);
  }
}

/**
 * 初始化顺序4：计算权重后写入MySQL数据库
 */
async function dataToJSON() {
  // TODO: 引入外部历史数据库 属于未来工作 非紧急
  const query = `SELECT * FROM people`;
  const result = await connectMysql(query);
  const data = [];
  for (const row in result) {
    if (row === '') {
      continue;
    }
    const obj = {};
    obj['id'] = result[row]['name_id'];
    obj['name'] = result[row]['name'];
    obj['weight'] = result[row]['weight'];
    obj['text'] = 'test';
    obj['image'] = 'photo_name';
    data.push(obj);
  }
  const json = JSON.stringify(data);
  fs.writeFileSync('../data/json/node_information.json', json);
}

/**
 * 系统初始化并将数据导入
 * */
async function dataInit() {
  await dataToMysql();
  await importDataToNeo4j();
  await calWeight();
  await dataToJSON();
}
exports.dataInit = dataInit;

dataInit();
