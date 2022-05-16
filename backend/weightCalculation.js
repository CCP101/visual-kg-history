const neo4j = require("neo4j-driver");
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
const mysql = require('mysql');
const fs = require("fs");
const { parse } = require("csv-parse");
const ExcelJS = require('exceljs');


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

async function DataToMysql(){
    let result = await importInitData();
    console.log(result.size);
    for(let node of result){
        let query = `INSERT INTO people (\`name\`, \`weight\`) VALUES ('${node}',0)`;
        await ConnectMysql(query);
    }
}
// DataToMysql();

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
generateText();
const workbook = new ExcelJS.Workbook();