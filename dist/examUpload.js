"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = uploadFile;
require("core-js/modules/es.promise.js");
var _function = require("./function.js");
async function uploadFile() {
  let file = $("#exampaper").prop("files")[0];
  let type = $("#validationDefault04").val();
  let examID = $("#validationDefault03").val();
  console.log(type);
  let formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("id", examID);
  console.log(formData);
  let getData = await (0, _function.postData)("uploadQuiz", formData);
  if (getData === 200) {
    alert("上传成功");
  }
  if (getData === 500) {
    alert("上传失败");
  }
  console.log(getData);
}