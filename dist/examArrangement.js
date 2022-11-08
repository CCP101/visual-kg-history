"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));
var _function = _interopRequireWildcard(require("../javascript/function.js"));
var _function2 = require("./function.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
* 配套examArrangement.html
* 实现查询用户考试安排
* */

(0, _function.cookiesCheck)();

// FIXME: 现阶段默认考试分配到所有学生 非功能性BUG 非紧急
let getWeight = await (0, _function.default)("sql", "getExamUpload", 'exam');
let tbody = document.querySelector('tbody');
for (let i = 0; i < getWeight.length; i++) {
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  let data = getWeight[i];
  let td1 = document.createElement('td');
  td1.innerHTML = data['exam_name'];
  tr.appendChild(td1);
  let td2 = document.createElement('td');
  td2.innerHTML = data['exam_uuid'];
  tr.appendChild(td2);
  let td3 = document.createElement('td');
  if (data['exam_setting'] === 'N') {
    td3.innerHTML = "未指定时间";
  } else {
    td3.innerHTML = new Date(data['exam_begin']).toLocaleString();
  }
  tr.appendChild(td3);
  let td4 = document.createElement('td');
  // td4.innerHTML = data['exam_time'] + "分钟";
  td4.innerHTML = "120分钟";
  tr.appendChild(td4);
  let td5 = document.createElement('td');
  let cd = "ct" + i;
  td5.innerHTML = "<td>\n" + "<div id=" + cd + ">\n" + "</div></td>";
  tr.appendChild(td5);

  //设置1s刷新一次获取最新倒计时
  function getCountdown() {
    let ct = document.getElementById("ct" + i);
    let time_now = new Date(2022, 9, 16, 21, 0, 0);
    ct.innerHTML = (0, _function2.countdown)(time_now);
    // ct.innerHTML = countdown(new Date(data['exam_begin']));
  }

  (0, _setInterval2.default)(getCountdown, 1000);
  let td6 = document.createElement('td');
  td6.innerHTML = "<button class=\"btn btn-primary\" id=\"ExamJump\" onclick=\"window.location.href='exam.html?examID=" + data['exam_uuid'] + "'\"> \n" + "                  测试\n" + "                </button>";
  tr.appendChild(td6);
}
document.getElementById("btn").addEventListener("click", _function.exitSystem);