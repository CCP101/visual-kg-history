import getData, {postData, getCookie} from '../javascript/function.js';
const encryptor = new JSEncrypt();
const publicKey = await getData('key', 'publicKey', 'get');
encryptor.setPublicKey(publicKey);
checkLoginCookies();
/**
 * 前端登录检查
 * 返回判断：
 * 200 正常
 * 500 用户名或密码错误
 * 700 服务器错误
 * 以上为本项目通用响应码
 */
async function login() {
  const username = $('#username').val();
  const password = $('#password').val();
  const encryptedPassword = encryptor.encrypt(password);
  const rememberCheck = $('#rememberMm').is(':checked');
  if (username === '' || password === '') {
    alert('用户名或密码不能为空');
    return;
  }
  const data = {
    username: username,
    password: encryptedPassword,
    rememberCheck: rememberCheck,
  };
  const getData = await postData('login', data);
  if (getData === 200) {
    alert('登陆成功');
    window.location.href = 'index.html';
  }
  if (getData === 500) {
    alert('用户名或密码错误');
  }
  if (getData === 700) {
    alert('登陆异常');
  }
  console.log(getData);
}

/**
 * 前端注册功能
 * 200 成功 500 服务器错误
 */
async function register() {
  const username = $('#username').val();
  const password = $('#password').val();
  const checkPassword = $('#checkPassword').val();
  if (username === '' || password === '' || checkPassword === '') {
    alert('用户名或密码不能为空');
    return;
  }
  if (password !== checkPassword) {
    alert('两次密码不一致');
    return;
  }
  const encryptedPassword = encryptor.encrypt(password);
  // 确认注册用户名是否可用
  const checkUsername = await getData('userCheck', username, 'username');
  if (checkUsername.length === 0) {
    const data = {
      username: username,
      password: encryptedPassword,
    };
    const getData = await postData('register', data);
    if (getData === 200) {
      alert('注册成功');
      window.location.href = 'index.html';
    } else {
      alert('注册失败');
    }
  } else {
    alert('用户名已存在');
  }
}

/**
 * 检查登陆状态 若未登录强制跳回主页
 * */
function checkLoginCookies() {
  const cookie = getCookie('userLogin');
  if (cookie !== '') {
    window.location.href = 'index.html';
  }
}
export {login, register, checkLoginCookies};
