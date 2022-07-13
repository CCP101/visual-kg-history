const {decrypt} = require("./util");


async function registerCheck(data){
    let username = data.username;
    let password = data.password;
    let rememberCheck = data.rememberCheck;
    let realPassword = await decrypt(password);
    console.log(realPassword);
    return realPassword;
}

exports.registerCheck = registerCheck;