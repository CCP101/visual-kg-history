const mysql = require('mysql');
const neo4j = require("neo4j-driver");
const fs = require("fs");
const { parse } = require("csv-parse");
//在此配置数据库连接参数,config配置解决JS关于数字类型的转换问题
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'),
    { disableLosslessIntegers: true });
const mysqlConnect = {
    host: 'localhost',
    user: 'root',
    password: 'ROOT',
    database: 'cq_history'
}
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ bits: 512 }, 'pkcs1-public-pem', 'pkcs1-private-pem');
const publicDer = key.exportKey('pkcs8-public');
const privateDer = key.exportKey('pkcs8-private');
console.log(publicDer)

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
        let connection = mysql.createConnection(mysqlConnect);
        connection.connect("", undefined);
        console.log(query);
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
 * Neo4j数据库写入实现
 * 不带查询的写入/删除等操作
 * @param query Cypher语句
 * @param key 关键字
 * @return {Promise<[]>} 以期约方式返回写入结果
 */
async function NodesWrite(query, key) {
    return new Promise((resolve, reject) => {
        let session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    // console.log(keys)
                },
                onNext: record => {
                    // 已解决，统一返回查询结果后处理，不在中间过程处理
                    // let result = record._fields[0].low;
                    // resolve(result);
                    session.close();
                },
                onCompleted: (result) => {
                    // console.log("Neo4j finished");
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
 * Neo4j数据库查询返回实现
 * 全部返回仅返回数据库查询状态，必须分次拦截处理后返回
 * @param query Cypher语句
 * @param key 关键字
 * @return {Promise<[]>} 以期约方式返回查询结果
 */
async function NodesRead(query, key) {
    return new Promise((resolve, reject) => {
        let session = driver.session({ defaultAccessMode: neo4j.session.READ });
        let res = [];
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    // console.log(keys)
                },
                onNext: record => {
                    // console.log(record)
                    res.push(record.get(key))
                    // console.log(key + "  " + record.get(key))
                },
                onCompleted: (result) => {
                    // console.log(res);
                    // console.log(result);
                    resolve(res);
                    session.close(); // returns a Promise
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
async function csvRead(file_path) {
    return new Promise(function (resolve, reject) {
        let result = [];
        fs.createReadStream(file_path)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
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

function ReturnServerKey(){
    return new Promise(function (resolve, reject) {
        resolve(publicDer);
    });
}




exports.ConnectMysql = ConnectMysql;
exports.NodesWrite = NodesWrite;
exports.NodesRead = NodesRead;
exports.csvRead = csvRead;
exports.ReturnServerKey = ReturnServerKey;