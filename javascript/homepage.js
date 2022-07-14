import getData, {postData} from "../javascript/function.js";
let encryptor = new JSEncrypt();
let publicKey = await getData("key", "publicKey", "get");
encryptor.setPublicKey(publicKey);


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
    let getData = await postData("router", data);
    console.log(getData);
}

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
    let checkUsername = await getData("userCheck", username, "username");
}
export { login,register };