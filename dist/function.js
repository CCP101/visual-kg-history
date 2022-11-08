"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.cookiesCheck = cookiesCheck;
exports.countdown = countdown;
exports.default = void 0;
exports.exitSystem = exitSystem;
exports.getCookie = getCookie;
exports.getQueryVariable = getQueryVariable;
exports.postData = postData;
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
const config = {
  ip: 'http://' + window.location.hostname.toString(),
  port: 3000
};

/**
 * 异步实现后端GET请求
 * @param link 后台访问地址
 * @param query 查询语句转写(Neo4j/SQL)
 * @param key Neo4j查询关键字
 * @return {Promise<any>} 以期约方式返回查询结果
 */
async function getData(link, query, key) {
  return new _promise.default((resolve, reject) => {
    var _context, _context2, _context3, _context4;
    let novelist = [];
    axios.defaults.withCredentials = true;
    axios.get((0, _concat.default)(_context = (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = (0, _concat.default)(_context4 = "".concat(config.ip, ":")).call(_context4, config.port, "/")).call(_context3, link, "?query=")).call(_context2, query, "&key=")).call(_context, key), {
      headers: {
        "withCredentials": true
      }
    }).then(function (response) {
      novelist = response.data;
      resolve(novelist);
    }).catch(function (err) {
      console.log(err);
      reject(new Error(err));
    });
  });
}

/**
 * 异步实现后端访问
 * @param link 后台访问地址
 * @param postData post请求数据
 */
function postData(link, postData) {
  return new _promise.default((resolve, reject) => {
    var _context5, _context6;
    //控制axios可传递cookie
    axios.defaults.withCredentials = true;
    axios.post((0, _concat.default)(_context5 = (0, _concat.default)(_context6 = "".concat(config.ip, ":")).call(_context6, config.port, "/")).call(_context5, link), postData, {
      headers: {
        "withCredentials": true
      }
    }).then(function (res) {
      let data = res.data;
      console.log(res);
      resolve(data);
    }).catch(function (err) {
      console.log(err);
      reject(new Error(err));
    });
  });
}

/**
 * 计算倒计时
 * @param time 考试时间
 */
function countdown(time) {
  if (time.getTime() === 0) {
    return 0;
  }
  let time_now = new Date();
  if (time_now.getTime() > time.getTime()) {
    return "已开始";
  }
  let left_time = time.getTime() - time_now.getTime(),
    //距离结束时间的毫秒数
    left_d = Math.floor(left_time / (1000 * 60 * 60 * 24)),
    //计算天数
    left_h = Math.floor(left_time / (1000 * 60 * 60) % 24),
    //计算小时数
    left_m = Math.floor(left_time / (1000 * 60) % 60),
    //计算分钟数
    left_s = Math.floor(left_time / 1000 % 60); //计算秒数
  return left_d + "天" + left_h + ":" + left_m + ":" + left_s; //返回倒计时的字符串
}

/**
 * 获取请求参数
 * @param variable GET请求参数
 */
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 * 退出系统并销毁session与cookies
 */
async function exitSystem() {
  let response = await getData("exit");
  if (response === 200) {
    alert("退出成功");
    window.location.href = "index.html";
  } else {
    alert("退出失败");
  }
}

/**
 * 获取cookies
 * @param cookieName cookies名
 */
function getCookie(cookieName) {
  let strCookie = document.cookie;
  let arrCookie = strCookie.split("; ");
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if (cookieName === arr[0]) {
      return arr[1];
    }
  }
  return "";
}

/**
 * 检查用户是否登录 若无登录信息跳回登录页
 */
function cookiesCheck() {
  let userStatus = getCookie("userLogin");
  if (userStatus === "") {
    alert("请先登录");
    window.location.href = "index.html";
  }
}

/**
 * 使用原生sort存在问题，因此使用Fisher–Yates shuffle洗牌算法
 * 参考知乎链接 https://www.zhihu.com/question/68330851
 * @returns {Array} 打乱数组
 */
Array.prototype.shuffle = function () {
  let array = this;
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};
var _default = getData;
exports.default = _default;