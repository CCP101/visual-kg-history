const {decrypt} = require("./util");

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

exports.registerCheck = registerCheck;