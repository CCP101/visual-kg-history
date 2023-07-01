const mysql = require('mysql');
const neo4j = require('neo4j-driver');
const NodeRSA = require('node-rsa');
const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('SKLP');
const {parse} = require('csv-parse');
const dotenv = require('dotenv');

dotenv.config();

// 在此配置数据库连接参数,config配置解决JS关于数字类型的转换问题
const driver = neo4j.driver(
    process.env.NEO4J_URL,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
    {disableLosslessIntegers: true});
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

/**
 * 服务器初始化设置NodeRSA
 * 调试说明：每次生成的公匙不一致，服务器重启，而前端不清除缓存刷新的情况下会导致无法解密，非BUG
 * 设计为理想情况下服务端永久不重启，或后期将公匙导出到本地文件
 * @param publicDer RSA公匙
 * @param privateDer RSA私匙
 */
const key = new NodeRSA({b: 512});
key.setOptions({encryptionScheme: 'pkcs1'});
const publicDer = key.exportKey('pkcs8-public');
// const privateDer = key.exportKey('pkcs8-private');
logger.info(publicDer);

/**
 * JS连接MySQL数据库实现
 * @param {string} query Cypher语句
 * @param {string/null} args JS ? SQL语句占位符替代实现
 * @return {Promise<any>} 以期约方式返回数据库查询结果
 * 1.Node.js在长期不访问数据库的情况下，可能会报错
 * mysql Error: Connection lost The server closed the connection
 * 需要创建MySQL连接池智能解决该问题
 * 因此原版本代码弃用，改用连接池，问题描述见连接：
 * https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 * 2.为了防止SQL注入攻击，统一不信任前端的连接与发来的数据
 * 因此在处理MYSQL查询拼接过程中，统一使用？占位符以及MySQL字符串转义实现来查询
 * 并且原写法 ...function 会导致无法迭代数据，新写法实现了防止SQL注入功能
 * 3.原生JS不支持函数重载，如需实现需要手动进行实现
 * 参考网站 https://juejin.cn/post/6844903933480009741
 * 或使用TypeScript语言进行编写
 * 4.MySQL8可能存在连接问题，需要在MySQL8中配置
 * ALTER USER 'root'@'localhost' IDENTIFIED
 * WITH mysql_native_password BY 'ROOT';
 */
async function connectMysql(query, args=null) {
  return new Promise(function(resolve, reject) {
    logger.info(query);
    if (typeof args === 'string') {
      mysqlPool.query(query, args, function(err, result) {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      mysqlPool.query(query, function(err, result) {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
  });
}

/**
 * Neo4j数据库写入实现
 * 不带查询的写入/删除等操作
 * @param {string} query Cypher语句
 * @param {string} key 关键字
 * @return {Promise<[]>} 以期约方式返回写入结果
 */
async function nodesWrite(query, key) {
  return new Promise((resolve, reject) => {
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE});
    session
        .run(query)
        .subscribe({
          onKeys: (keys) => {
            // console.log(keys)
          },
          onNext: (record) => {
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
          onError: (error) => {
            logger.error(error);
          },
        });
  });
}

/**
 * Neo4j数据库查询返回实现
 * 全部返回仅返回数据库查询状态，必须分次拦截处理后返回
 * @param {string} query Cypher语句
 * @param {string} key 关键字
 * @return {Promise<[]>} 以期约方式返回查询结果
 */
async function nodesRead(query, key) {
  return new Promise((resolve, reject) => {
    const session = driver.session({defaultAccessMode: neo4j.session.READ});
    const res = [];
    logger.info(query);
    session
        .run(query)
        .subscribe({
          onKeys: (keys) => {
            // console.log(keys)
          },
          onNext: (record) => {
            // console.log(record)
            res.push(record.get(key));
            // console.log(key + "  " + record.get(key))
          },
          onCompleted: (result) => {
            // console.log(res);
            // console.log(result);
            resolve(res);
            session.close(); // returns a Promise
          },
          onError: (error) => {
            console.log(error);
          },
        });
  });
}

/**
 * CSV文件读取实现，代码重用交由下游处理
 * @param {string} filePath 文件路径
 * @return {Promise<[]>} 以期约方式返回CSV文件结果
 */
async function csvRead(filePath) {
  return new Promise(function(resolve, reject) {
    const result = [];
    fs.createReadStream(filePath)
        .pipe(parse({delimiter: ',', from_line: 2}))
        .on('data', function(row) {
          // console.log(row);
          result.push(row);
        })
        .on('end', function() {
          logger.info('CSV finished');
          // console.log(result);
          resolve(result);
        })
        .on('error', function(error) {
          logger.error(error.message);
        });
  });
}

/**
 * 像前端发送服务器的公匙
 * @return {Promise<[]>} 以期约方式返回公匙
 */
function returnServerKey() {
  return new Promise(function(resolve, reject) {
    resolve(publicDer);
  });
}

/**
 * 解密前端发送的密文
 * @param {string} pwd 密文
 * @return {Promise<[]>} 以期约方式返回解密结果
 */
function decrypt(pwd) {
  return new Promise(function(resolve, reject) {
    const realPwd = key.decrypt(pwd, 'utf8');
    resolve(realPwd);
  });
}

/**
 * @param {string} username 检查用户名
 * @return {Promise<[]>} 以期约方式返回查询结果
 * 检查用户名是否存在
 */
async function userNameCheck(username) {
  return new Promise(async function(resolve, reject) {
    const query = 'SELECT * FROM users WHERE username = \'' + username + '\'';
    const result = await connectMysql(query);
    logger.info(result);
    resolve(result);
  });
}

/**
 * @param {int} delay 毫秒数
 * @return {Promise<[]>} 以期约方式返回延时结果
 * JS没有默认的sleep函数，需要自己实现
 */
function sleep(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay);
  });
}


exports.connectMysql = connectMysql;
exports.nodesWrite = nodesWrite;
exports.nodesRead = nodesRead;
exports.csvRead = csvRead;
exports.returnServerKey = returnServerKey;
exports.decrypt = decrypt;
exports.userNameCheck = userNameCheck;
exports.sleep = sleep;
