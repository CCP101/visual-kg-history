"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLoginCookies = checkLoginCookies;
exports.login = login;
exports.register = register;
require("core-js/modules/es.promise.js");
var _function = _interopRequireWildcard(require("../javascript/function.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let encryptor = new JSEncrypt();
let publicKey = await (0, _function.default)("key", "publicKey", "get");
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
  let username = $("#username").val();
  let password = $("#password").val();
  const encryptedPassword = encryptor.encrypt(password);
  let rememberCheck = $("#rememberMm").is(":checked");
  if (username === "" || password === "") {
    alert("用户名或密码不能为空");
    return;
  }
  let data = {
    username: username,
    password: encryptedPassword,
    rememberCheck: rememberCheck
  };
  let getData = await (0, _function.postData)("login", data);
  if (getData === 200) {
    alert("登陆成功");
    window.location.href = "examArrangement.html";
  }
  if (getData === 500) {
    alert("用户名或密码错误");
  }
  if (getData === 700) {
    alert("登陆异常");
  }
  console.log(getData);
}

/**
 * 前端注册功能
 * 200 成功 500 服务器错误
 */
async function register() {
  let username = $("#username").val();
  let password = $("#password").val();
  let checkPassword = $("#checkPassword").val();
  if (username === "" || password === "" || checkPassword === "") {
    alert("用户名或密码不能为空");
    return;
  }
  if (password !== checkPassword) {
    alert("两次密码不一致");
    return;
  }
  const encryptedPassword = encryptor.encrypt(password);
  // 确认注册用户名是否可用
  let checkUsername = await (0, _function.default)("userCheck", username, "username");
  if (checkUsername.length === 0) {
    let data = {
      username: username,
      password: encryptedPassword
    };
    let getData = await (0, _function.postData)("register", data);
    if (getData === 200) {
      alert("注册成功");
      window.location.href = "index.html";
    } else {
      alert("注册失败");
    }
  } else {
    alert("用户名已存在");
  }
}
function checkLoginCookies() {
  let cookie = (0, _function.getCookie)("userLogin");
  if (cookie !== "") {
    window.location.href = "examArrangement.html";
  }
}