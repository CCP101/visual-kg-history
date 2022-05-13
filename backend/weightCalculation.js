const os = require('os');
const neo4j = require("neo4j-driver");
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
const mysql = require('mysql');
const fs = require("fs");
const { parse } = require("csv-parse");


function ConnectMysql(query) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ROOT',
            database: 'cq_history'
        });
        connection.connect();
        console.log(query);
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
    let result = [];
    return new Promise(function (resolve, reject) {
        fs.createReadStream("../data/PeopleRelation.csv")
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                // console.log(row);
                result.push(row[0]);
                result.push(row[1]);
            })
            .on("end", function () {
                for (let node of result) {
                    if (!set.has(node)) {
                        set.add(node);
                    }
                }
                console.log("finished");
                resolve(set)
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