/*
* 配套exam.html
* 根据考试号下载试卷
* TODO：用户ID辨别实现 读取cookies实现
* */

import getData, {getQueryVariable} from "./function.js";

window.onload = async function () {
    const examID = getQueryVariable("examID");
    console.log(examID)
    const examPaperData = await getData("examGet", examID,"exam");
    for (let i=0; i < examPaperData.length ;i++) {
        let data = examPaperData[i];
        $("#jsAddExam").append("<div class=\"container\">\n" +
            "<P>" + (i+1) + "." +  data['quiz_question'] + "</P>\n" +
            "<form id = \"q" + i +"\" name=\"" + data['quiz_id'] + "\">\n" +
            "<div class=\"radio\">\n" +
            // todo 实现选择顺序随机(配合数据库实现选项编码)
            "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] +"'>" + data['quiz_c1'] +
            "</label>\n" + "</div>"+
            "<div class=\"radio\">\n" +
            "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] +"'>" + data['quiz_c2'] +
            "</label>\n" + "</div>"+
            "<div class=\"radio\">\n" +
            "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] +"'>" + data['quiz_c3'] +
            "</label>\n" + "</div>"+
            "<div class=\"radio\">\n" +
            "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] +"'>" + data['quiz_c4'] +
            "</label>\n" + "</div>"+
            "</form>\n" +
            "</div>\n"+
            "<div class=\"row bg-light\"><br></div>"
        );
    }
}