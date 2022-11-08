"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
require("core-js/modules/es.promise.js");
var _function = _interopRequireWildcard(require("./function.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
* 配套exam.html
* 根据考试号下载试卷
* */

window.onload = async function () {
  const examID = (0, _function.getQueryVariable)("examID");
  console.log(examID);
  const examPaperData = await (0, _function.default)("examGet", examID, "exam");
  for (let i = 0; i < examPaperData.length; i++) {
    let data = examPaperData[i];
    let choices = [data["quiz_c1"], data["quiz_c2"], data["quiz_c3"], data["quiz_c4"]];
    choices.shuffle();
    $("#jsAddExam").append("<div class=\"container\">\n" + "<P>" + (i + 1) + "." + data['quiz_question'] + "</P>\n" + "<form id = \"q" + i + "\" name=\"" + data['quiz_id'] + "\">\n" + "<div class=\"radio\">\n" + "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + choices[0] + "'>" + choices[0] + "</label>\n" + "</div>" + "<div class=\"radio\">\n" + "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + choices[1] + "'>" + choices[1] + "</label>\n" + "</div>" + "<div class=\"radio\">\n" + "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + choices[2] + "'>" + choices[2] + "</label>\n" + "</div>" + "<div class=\"radio\">\n" + "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + choices[3] + "'>" + choices[3] + "</label>\n" + "</div>" + "</form>\n" + "</div>\n" + "<div class=\"row bg-light\"><br></div>");
  }
};