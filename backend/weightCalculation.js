const { ConnectMysql, NodesWrite, csvRead } = require('./util');
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();


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
// importInitData('../data/PeopleRelation2.csv');

/**
 * 初始化顺序1：创建MySQL人物记录
 * 单次调用，将数据写入MySQL数据库
 * 注意：25行数据格式变化，需要重写
 */
async function DataToMysql() {
    let deleteTable = 'delete * from people;';
    await ConnectMysql(deleteTable);
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
// DataToMysql();

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
// ImportDataToNeo4j();


/**
 * 单次调用，计算权重后写入MySQL数据库
 * 注意：25行数据格式变化，需要重写
 */
async function calWeight() {
    let result = await importInitData();
    for (let node of result.set) {
        let NeoQuery = `match ((n:DPerson{name:'${node}'})-[]-(x:DPerson)) return count(x)`;
        let NeoResult = await NodesPromise(NeoQuery, "count(x)");
        console.log(NeoResult.resultConsumedAfter.low);
        let query = `UPDATE people SET weight = ${NeoResult} WHERE name = "${node}"`;
        console.log(query)
        await ConnectMysql(query);
    }
}



/**
 * 生成试题并输出
 * TODO：生成混淆项目存入excel中
 * @return [] 返回生成的试题
 */
async function generateText() {
    let file_path = "../data/PeopleRelation.csv";
    let quizList = [];
    let result = await csvRead(file_path);
    for (let row in result) {
        let p1 = result[row][0];
        let p2 = result[row][1];
        let rel = result[row][2];
        let query1 = `SELECT people.weight FROM people WHERE name = "${p1}"`;
        let query2 = `SELECT people.weight FROM people WHERE name = "${p2}"`;
        let weight1 = await ConnectMysql(query1);
        let weight2 = await ConnectMysql(query2);
        // let results = JSON.parse(JSON.stringify(weight1))
        let p1v = weight1[0].weight;
        let p2v = weight2[0].weight;
        let quiz = `${p1}与${p2}的关系是(?)，答案是（${rel}），${p1}的权重是${p1v}，${p2}的权重是${p2v}`;
        console.log(quiz);
        quizList.push(quiz);
    }
    return quizList;
}

/**
 * 对生成的试题进行处理并将结果存入Excel文件
 */
async function ExcelOutput() {
    let quizResult = await generateText();
    workbook.creator = 'Me';
    workbook.created = new Date(2022, 5, 17);
    workbook.modified = new Date();
    const sheet = workbook.addWorksheet('Quiz');
    sheet.columns = [
        { header: 'qui', key: 'qui', width: 25 },
        { header: 'ans', key: 'ans', width: 25 },
        { header: 'wei1', key: 'wei1', width: 25 },
        { header: 'wei2', key: 'wei2', width: 25 },
    ];
    for (let quiz in quizResult) {
        let quizSplit = quizResult[quiz].split("，");
        console.log(quizSplit);
        let qui = quizSplit[0];
        let ans = quizSplit[1];
        let wei1 = quizSplit[2];
        let wei2 = quizSplit[3];
        sheet.addRow({ qui: qui, ans: ans, wei1: wei1, wei2: wei2 });
    }
    workbook.xlsx.writeFile('../data/Quiz.xlsx').then(function () {
        console.log("done");
    });
    return "done";
}
// ExcelOutput().then(r => {
//     console.log(r)
// });