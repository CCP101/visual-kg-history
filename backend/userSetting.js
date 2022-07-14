const {decrypt, ConnectMysql} = require("./util");
const moment = require('moment')
const crytpo = require('crypto');

//todo:后期实现处理，基本是调模块

async function registerCheck(data){
    let username = data.username;
    let password = data.password;
    let rememberCheck = data.rememberCheck;
    let realPassword = await decrypt(password);
    console.log(realPassword);
    return realPassword;
}

async function loginCheck(data){
    let username = data.username;
    let password = data.password;
    let rememberCheck = data.rememberCheck;
    let realPassword = await decrypt(password);
    console.log(realPassword);
    return realPassword;
}

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
    if (result.affectedRows === 1){
        return 200;
    }else{
        return 500;
    }
}

exports.registerCheck = registerCheck;
exports.registerUser = registerUser;