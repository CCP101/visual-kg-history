const {decrypt, connectMysql} = require('./util');
const moment = require('moment');
const crytpo = require('crypto');

/**
 * 用户登录库
 * @param {object} data 用户数据
 * @return {Promise<number>} returnCode 用户登录相应代码
 */
async function loginCheck(data) {
  const username = data.username;
  const password = data.password;
  const realPassword = await decrypt(password);
  const hmac = crytpo.createHmac('sha256', 'TUST');
  const encryptPassword = hmac.update(realPassword).digest('Base64');
  const loginSql = `SELECT * FROM users 
         WHERE username = '${username}' AND password = '${encryptPassword}'`;
  const result = await connectMysql(loginSql);
  console.log(result);
  let returnCode = 700;
  if (result.length === 0) {
    returnCode = 500;
  } else if (result.length === 1) {
    returnCode = 200;
  }
  return new Promise(function(resolve, reject) {
    resolve(returnCode);
  });
}

/**
 * 注册用户
 * @param {object} data 用户数据
 * @return {Promise<number>} returnCode 注册用户响应代码
 */
async function registerUser(data) {
  // TODO: 注册用户生成UUID
  const username = data.username;
  const password = data.password;
  const addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const realPassword = await decrypt(password);
  const hmac = crytpo.createHmac('sha256', 'TUST');
  const encryptPassword = hmac.update(realPassword).digest('Base64');
  const UserInsertSql = `INSERT INTO users (username, password, auth, addTime) 
    VALUES ('${username}', '${encryptPassword}', 1, '${addTime}')`;
  const result = await connectMysql(UserInsertSql);
  let returnCode = 200;
  if (result.affectedRows !== 1) {
    returnCode = 500;
  }
  return new Promise(function(resolve, reject) {
    resolve(returnCode);
  });
}

exports.loginCheck = loginCheck;
exports.registerUser = registerUser;
