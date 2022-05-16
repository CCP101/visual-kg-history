const neo4j = require("neo4j-driver");
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
const mysql = require('mysql');
const fs = require("fs");
const { parse } = require("csv-parse");
const ExcelJS = require('exceljs');

/**
 * JS连接MySQL数据库实现(本代码由Github Copilot提供)
 * @param query Cypher语句
 * @return {Promise<any>} 以期约方式返回数据库查询结果
 * JS的MySQL连接模块未实现对于MySQL8认证的支持，因此需要自行在MySQL安装目录下找到mysql_config_editor.exe文件，并执行如下命令：
 * mysql_config_editor set --login-path=local --host=localhost --user=root --password
 * 如果没有找到mysql_config_editor.exe文件，则可以通过以下方式安装：
 * https://dev.mysql.com/downloads/connector/nodejs/
 * TODO：本地MySQL数据库认证方式被降级，需要验证以上方案的可行性
 */
async function ConnectMysql(query) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ROOT',
            database: 'cq_history'
        });
        connection.connect();
        // console.log(query);
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        connection.end();
    });
}

/**
 * CSV文件读取实现
 * @return {Promise<{Set,Set}>} 以期约方式返回Neo4j查询结果{结点结果，关系结果}
 */
async function importInitData(){
    let set = new Set();
    let set2 = new Set();
    let result = [];
    let result2 = [];
    return new Promise(function (resolve, reject) {
        fs.createReadStream("../data/PeopleRelation.csv")
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                // console.log(row);
                result.push(row[0]);
                result.push(row[1]);
                result2.push(row[2]);
            })
            .on("end", function () {
                for (let node of result) {
                    if (!set.has(node)) {
                        set.add(node);
                    }
                }
                for (let relation of result2) {
                    if (!set2.has(relation)) {
                        set2.add(relation);
                    }
                }
                console.log("finished");
                resolve({set,set2});
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    });
}

/**
 * Neo4j数据库查询实现
 * 实现查询数字结果，无法复现和直接重用
 * TODO：或获得结果后在下游进行对于数据的处理
 * @param query Cypher语句
 * @param key 关键字
 * @return {Promise<[]>} 以期约方式返回数据库查询结果
 */
function NodesPromise(query,key) {
    return new Promise((resolve, reject) => {
        let session = driver.session({defaultAccessMode: neo4j.session.READ});
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    // console.log(keys)
                },
                onNext: record => {
                    let result = record._fields[0].low;
                    resolve(result);
                    session.close();
                },
                onCompleted: (result) => {
                    // console.log(result);
                },
                onError: error => {
                    console.log(error)
                }
            })
    });
}

/**
 * 单次调用，将数据写入MySQL数据库
 */
async function DataToMysql(){
    let result = await importInitData();
    console.log(result.size);
    for(let node of result){
        let query = `INSERT INTO people (\`name\`, \`weight\`) VALUES ('${node}',0)`;
        await ConnectMysql(query);
    }
}
// DataToMysql();

/**
 * 单次调用，计算权重后写入MySQL数据库
 */
async function calWeight(){
    let result = await importInitData();
    for(let node of result){
        let NeoQuery = `match ((n:DPerson{name:'${node}'})-[]-(x:DPerson)) return count(x)`;
        let NeoResult = await NodesPromise(NeoQuery, "count(x)");
        let query = `UPDATE people SET weight = ${NeoResult} WHERE name = "${node}"`;
        console.log(query)
        await ConnectMysql(query);
    }
}
// calWeight();

/**
 * 打包CSV数据并返回
 * @return {Promise<[]>} 以期约方式返回数据库查询结果
 */
async function QuizGenerate(){
    return new Promise(async function (resolve, reject) {
        let result = [];
        fs.createReadStream("../data/PeopleRelation.csv")
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                let result_row = {};
                let p1 = row[0];
                let p2 = row[1];
                let rel = row[2];
                result_row.p1 = p1;
                result_row.p2 = p2;
                result_row.rel = rel;
                result.push(result_row);
            })
            .on("end", function () {
                console.log("finished");
                resolve(result);
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    });
}

/**
 * 生成试题并输出
 */
async function generateText(){
    let result = await importInitData();
    let node = result.set;
    let relation = result.set2;
    let resultCSV = await QuizGenerate();
    for (let i = 0; i < 100; i++) {
        let p1 = resultCSV[i].p1;
        let p2 = resultCSV[i].p2;
        let rel = resultCSV[i].rel;
        let query1 = `SELECT people.weight FROM people WHERE name = "${p1}"`;
        let query2 = `SELECT people.weight FROM people WHERE name = "${p2}"`;
        let weight1 = await ConnectMysql(query1);
        let weight2 = await ConnectMysql(query2);
        // let results = JSON.parse(JSON.stringify(weight1))
        let p1v = weight1[0].weight;
        let p2v = weight2[0].weight;
        let quiz = `${p1}与${p2}的关系是(?)，答案是（${rel}），${p1}的权重是${p1v}，${p2}的权重是${p2v}`;
        console.log(quiz);
    }

}
generateText().then(r => {
    console.log(r)
});

//TODO: Excel实现
const workbook = new ExcelJS.Workbook();