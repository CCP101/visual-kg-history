const mysql = require('mysql');
const neo4j = require("neo4j-driver");
const NodeRSA = require('node-rsa');
const fs = require("fs");
const { parse } = require("csv-parse");
//在此配置数据库连接参数,config配置解决JS关于数字类型的转换问题
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'),
    { disableLosslessIntegers: true });
const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ROOT',
    database: 'cq_history'
});

/**
 * 服务器初始化设置NodeRSA
 * 调试说明：每次生成的公匙不一致，服务器重启，而前端不清除缓存刷新的情况下会导致无法解密，非BUG
 * 设计为理想情况下服务端永久不重启，或后期将公匙导出到本地文件
 * @param publicDer RSA公匙
 * @param privateDer RSA私匙
 */
const key = new NodeRSA({b: 512});
key.setOptions({ encryptionScheme: 'pkcs1' });
const publicDer = key.exportKey('pkcs8-public');
const privateDer = key.exportKey('pkcs8-private');
console.log(publicDer);

/**
 * JS连接MySQL数据库实现
 * @param query Cypher语句
 * @return {Promise<any>} 以期约方式返回数据库查询结果
 * Node.js在长期不访问数据库的情况下，可能会报错
 * mysql Error: Connection lost The server closed the connection
 * 需要创建MySQL连接池智能解决该问题
 * 因此原版本代码弃用，改用连接池，问题描述见连接：
 * https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 */
async function ConnectMysql(query) {
    return new Promise(function (resolve, reject) {
        console.log(query);
        mysqlPool.query(query, function (error, results, fields) {
            resolve(results);
        })
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

/**
 * 像前端发送服务器的公匙
 * @return {Promise<>} 以期约方式返回公匙
 */
function ReturnServerKey(){
    return new Promise(function (resolve, reject) {
        resolve(publicDer);
    });
}

/**
 * 解密前端发送的密文
 * @return {Promise<>} 以期约方式返回解密结果
 */
function decrypt(pwd){
    return new Promise(function (resolve, reject) {
        let real_pwd = key.decrypt(pwd, 'utf8');
        resolve(real_pwd);
    });
}

/**
 * @param username 检查用户名
 * @return {Promise<>} 以期约方式返回查询结果
 * 检查用户名是否存在
 */
async function UsernameCheck(username){
    return new Promise(async function (resolve, reject) {
        let query = "SELECT * FROM users WHERE username = '" + username + "'";
        let result = await ConnectMysql(query);
        console.log(result);
        resolve(result);
    });
}

/**
 * @param delay 毫秒数
 * JS没有默认的sleep函数，需要自己实现
 */
function sleep(delay){
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delay);
    });
}


exports.ConnectMysql = ConnectMysql;
exports.NodesWrite = NodesWrite;
exports.NodesRead = NodesRead;
exports.csvRead = csvRead;
exports.ReturnServerKey = ReturnServerKey;
exports.decrypt = decrypt;
exports.UsernameCheck = UsernameCheck;
exports.sleep = sleep;