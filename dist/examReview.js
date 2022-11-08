"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
require("core-js/modules/es.promise.js");
var _function = _interopRequireWildcard(require("./function.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
* 配套ReviewAnswer.html
* 根据用户ID及考试号查看考试情况
* */

window.onload = async function () {
  const examID = (0, _function.getQueryVariable)("examID");
  console.log(examID);
  const examPaperData = await (0, _function.default)("examReview", examID, "exam");
  for (let i = 0; i < examPaperData.length; i++) {
    let data = examPaperData[i];
    let stu_A = data.quiz_answer;
    let real_A = data.quiz_A;
    let right = false;
    if (stu_A === real_A) {
      right = true;
    }
    // TODO: 严重垃圾面条代码修改 彩色实现
    let addHTML = "<div class=\"container\">\n" + "<P>" + (i + 1) + "." + data['quiz_question'] + "</P>\n" + "<form id = \"q" + i + "\" name=\"" + data['quiz_id'] + "\">\n";
    if (stu_A === "NULL") {
      addHTML += "<i class=\"fa fa-exclamation\" aria-hidden=\"true\"></i> 未作答";
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] + "' disabled>" + data['quiz_c1'] + "</label>\n" + "</div>";
    } else if (data['quiz_c1'] === real_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] + "' disabled>" + data['quiz_c1'] + "</label>\n" + "</div>";
    } else if (!right && data['quiz_c1'] === stu_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] + "' disabled>" + data['quiz_c1'] + "</label>\n" + "</div>";
    } else {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] + "' disabled>" + data['quiz_c1'] + "</label>\n" + "</div>";
    }
    if (data['quiz_c2'] === real_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] + "' disabled>" + data['quiz_c2'] + "</label>\n" + "</div>";
    } else if (!right && data['quiz_c2'] === stu_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] + "' disabled>" + data['quiz_c2'] + "</label>\n" + "</div>";
    } else {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] + "' disabled>" + data['quiz_c2'] + "</label>\n" + "</div>";
    }
    if (data['quiz_c3'] === real_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] + "' disabled>" + data['quiz_c3'] + "</label>\n" + "</div>";
    } else if (!right && data['quiz_c3'] === stu_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] + "' disabled>" + data['quiz_c3'] + "</label>\n" + "</div>";
    } else {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] + "' disabled>" + data['quiz_c3'] + "</label>\n" + "</div>";
    }
    if (data['quiz_c4'] === real_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] + "' disabled>" + data['quiz_c4'] + "</label>\n" + "</div>";
    } else if (!right && data['quiz_c4'] === stu_A) {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] + "' disabled>" + data['quiz_c4'] + "</label>\n" + "</div>";
    } else {
      addHTML += "<div class=\"radio\">\n";
      addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>";
      addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] + "' disabled>" + data['quiz_c4'] + "</label>\n" + "</div>";
    }
    $("#jsAddExam").append(addHTML);
  }
};