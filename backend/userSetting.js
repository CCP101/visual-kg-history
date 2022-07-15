const {decrypt, ConnectMysql} = require("./util");
const moment = require('moment')
const crytpo = require('crypto');


async function loginCheck(data){
    let username = data.username;
    let password = data.password;
    let rememberCheck = data.rememberCheck;
    let realPassword = await decrypt(password);
    let hmac = crytpo.createHmac("sha256", "TUST");
    let encryptPassword = hmac.update(realPassword).digest("Base64");
    let loginSql = `SELECT * FROM users WHERE username = '${username}' AND password = '${encryptPassword}'`;
    let result = await ConnectMysql(loginSql);
    console.log(result);
    let returnCode = 700;
    if (result.length === 0){
        returnCode = 500;
    }else if(result.length === 1){
        returnCode = 200;
    }
    return returnCode;
}

/**
 * 注册用户
 * @param data 用户数据
 * @return res MySQL查询结果
 */
async function registerUser(data){
    let username = data.username;
    let password = data.password;
    let addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let realPassword = await decrypt(password);
    let hmac = crytpo.createHmac("sha256", "TUST");
    let encryptPassword = hmac.update(realPassword).digest("Base64");
    let UserInsertSql = `INSERT INTO users (username, password, auth, addTime) 
                        VALUES ('${username}', '${encryptPassword}', 1, '${addTime}')`;
    let result = await ConnectMysql(UserInsertSql);
    let returnCode = 200;
    if (result.affectedRows !== 1){
        returnCode = 500;
    }
    return returnCode;
}

exports.loginCheck = loginCheck;
exports.registerUser = registerUser;