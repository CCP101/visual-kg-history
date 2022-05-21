const mysql = require('mysql');
const neo4j = require("neo4j-driver");
const fs = require("fs");
const { parse } = require("csv-parse");
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'));

/**
 * JS连接MySQL数据库实现(本代码由Github Copilot提供)
 * @param query Cypher语句
 * @return {Promise<any>} 以期约方式返回数据库查询结果
 * JS的MySQL连接模块未实现对于MySQL8认证的支持，因此需要自行在MySQL安装目录下找到mysql_config_editor.exe文件，并执行如下命令：
 * mysql_config_editor set --login-path=local --host=localhost --user=root --password
 * 如果没有找到mysql_config_editor.exe文件，则可以通过以下方式安装：
 * https://dev.mysql.com/downloads/connector/nodejs/
 * 本地MySQL数据库认证方式被降级，暂未认证该方案
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
        // console.log("MySql finished");
        connection.end();
    });
}

/**
 * Neo4j数据库查询实现
 * 已解决：实现查询数字结果，无法复现和直接重用
 * @param query Cypher语句
 * @param key 关键字
 * @return {Promise<[]>} 以期约方式返回数据库查询结果
 */
async function NodesPromise(query,key) {
    return new Promise((resolve, reject) => {
        let session = driver.session({defaultAccessMode: neo4j.session.READ});
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    // console.log(keys)
                },
                onNext: record => {
                    // 建议传参最后获得的结果，方便本函数的复用
                    // let result = record._fields[0].low;
                    // resolve(result);
                    session.close();
                },
                onCompleted: (result) => {
                    console.log("Neo4j finished");
                    // console.log(result);
                    resolve(result);

                },
                onError: error => {
                    console.log(error)
                }
            })
    });
}

/**
 * CSV文件读取实现，代码重用交由下游处理
 * @return {Promise<>} 以期约方式返回CSV文件结果
 */
async function csvRead(file_path){
    return new Promise(function (resolve, reject) {
        let result = [];
        fs.createReadStream(file_path)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                // console.log(row);
                result.push(row);
            })
            .on("end", function () {
                console.log("CSV finished");
                // console.log(result);
                resolve(result);
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    });
}

exports.ConnectMysql = ConnectMysql;
exports.NodesPromise = NodesPromise;
exports.csvRead = csvRead;