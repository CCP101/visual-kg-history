"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _function = _interopRequireWildcard(require("../javascript/function.js"));
var _function2 = require("./function.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _function.cookiesCheck)();
let getLog = await (0, _function.default)("userSql", "getExamLog", 'exam');
let tbody = document.querySelector('tbody');
for (let i = 0; i < getLog.length; i++) {
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  let data = getLog[i];
  let td1 = document.createElement('td');
  td1.innerHTML = data['exam_id'];
  tr.appendChild(td1);
  let td2 = document.createElement('td');
  td2.innerHTML = data['submit_time'];
  tr.appendChild(td2);
  let td3 = document.createElement('td');
  td3.innerHTML = data['log_id'];
  tr.appendChild(td3);
  let td4 = document.createElement('td');
  td4.innerHTML = data['score'];
  tr.appendChild(td4);
  let td6 = document.createElement('td');
  td6.innerHTML = "<button class=\"btn btn-primary\" id=\"ExamJump\" onclick=\"window.location.href='ReviewAnswer.html?examID=" + data['log_id'] + "'\"> \n" + "                  查看\n" + "                </button>";
  tr.appendChild(td6);
}