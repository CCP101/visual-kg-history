import getData, {postData} from "../javascript/function.js";
let encryptor = new JSEncrypt();
let publicKey = await getData("key", "publicKey", "get");
encryptor.setPublicKey(publicKey);


function register() {
    window.location.href = "register.html";
}

function login(){
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
    postData("router", data);
}

export { register, login };