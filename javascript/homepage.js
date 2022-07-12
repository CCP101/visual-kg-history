import getData, {postData} from "../javascript/function.js";

let encryptor = new JSEncrypt();
let publicKey = await getData("key", "publicKey", "get");
encryptor.setPublicKey(publicKey);
console.log(publicKey);



function register() {
    window.location.href = "register.html";
}
function login(){
    let yhm = $("#yhm").val();
    let password = $("#password").val();
    const encryptedPassword = encryptor.encrypt(password);
    console.log(encryptedPassword);
    let rememberMm = $("#rememberMm").is(":checked");
    if(yhm === "" || password === ""){
        alert("用户名或密码不能为空");
        return;
    }
    let data = {
        yhm: yhm,
        pwd: encryptedPassword,
        rememberMm: rememberMm
    };
    postData("router", data);
}

export { register, login };