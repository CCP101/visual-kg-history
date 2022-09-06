import getData, {postData} from "../javascript/function.js";
let encryptor = new JSEncrypt();
let publicKey = await getData("key", "publicKey", "get");
encryptor.setPublicKey(publicKey);

/**
 * 前端登录检查
 * 200 正常 500 用户名或密码错误 700 服务器错误
 */
async function login(){
    let username = $("#username").val();
    let password = $("#password").val();
    const encryptedPassword = encryptor.encrypt(password);
    let rememberCheck = $("#rememberMm").is(":checked");
    if(username === "" || password === ""){
        alert("用户名或密码不能为空");
        return;
    }
    let data = {
        username: username,
        password: encryptedPassword,
        rememberCheck: rememberCheck
    };
    let getData = await postData("login", data);
    if (getData === 200){
        alert("登陆成功");
        window.location.href = "examArrangement.html";
    }
    if (getData === 500){
        alert("用户名或密码错误");
    }
    if (getData === 700){
        alert("登陆异常");
    }
    console.log(getData);
}

/**
 * 前端注册功能
 * 200 成功 500 服务器错误
 */
async function register(){
    let username = $("#username").val();
    let password = $("#password").val();
    let checkPassword = $("#checkPassword").val();
    if(username === "" || password === "" || checkPassword === ""){
        alert("用户名或密码不能为空");
        return;
    }
    if(password !== checkPassword){
        alert("两次密码不一致");
        return;
    }
    const encryptedPassword = encryptor.encrypt(password);
    // 确认注册用户名是否可用
    let checkUsername = await getData("userCheck", username, "username");
    if (checkUsername.length === 0) {
        let data = {
            username: username,
            password: encryptedPassword
        };
        let getData = await postData("register", data);
        if (getData === 200){
            alert("注册成功");
            window.location.href = "index.html";
        }else{
            alert("注册失败");
        }
    }else{
        alert("用户名已存在");
    }
}
export { login,register };