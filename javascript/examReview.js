/*
* 配套ReviewAnswer.html
* 根据用户ID及考试号查看考试情况
* TODO：严重垃圾面条代码修改
* */

import getData, {getQueryVariable} from "./function.js";

window.onload = async function () {
    const examID = getQueryVariable("examID");
    console.log(examID)
    const examPaperData = await getData("examReview", examID,"exam");
    console.log(examPaperData)
    for (let i=0; i < examPaperData.length ;i++) {
        let data = examPaperData[i];
        let stu_A = data.quiz_answer;
        let real_A = data.quiz_A;
        let right = false;
        if (stu_A === real_A) {right = true}
        let addHTML ="<div class=\"container\">\n" +
                        "<P>" + (i+1) + "." +  data['quiz_question'] + "</P>\n" +
                        "<form id = \"q" + i +"\" name=\"" + data['quiz_id'] + "\">\n"
        // todo 代码优化
        if (stu_A === "NULL"){
            addHTML += "<i class=\"fa fa-exclamation\" aria-hidden=\"true\"></i> 未作答"
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] +"' disabled>" + data['quiz_c1'] +
                "</label>\n" + "</div>"
        }
        else if (data['quiz_c1'] === real_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] +"' disabled>" + data['quiz_c1'] +
                "</label>\n" + "</div>"
        }else if(!right && data['quiz_c1'] === stu_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] +"' disabled>" + data['quiz_c1'] +
                "</label>\n" + "</div>"
        }else{
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c1'] +"' disabled>" + data['quiz_c1'] +
                "</label>\n" + "</div>"
        }
        if (data['quiz_c2'] === real_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] +"' disabled>" + data['quiz_c2'] +
                "</label>\n" + "</div>"
        }else if(!right && data['quiz_c2'] === stu_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] +"' disabled>" + data['quiz_c2'] +
                "</label>\n" + "</div>"
        }else{
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c2'] +"' disabled>" + data['quiz_c2'] +
                "</label>\n" + "</div>"
        }
        if (data['quiz_c3'] === real_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] +"' disabled>" + data['quiz_c3'] +
                "</label>\n" + "</div>"
        }else if(!right && data['quiz_c3'] === stu_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] +"' disabled>" + data['quiz_c3'] +
                "</label>\n" + "</div>"
        }else{
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c3'] +"' disabled>" + data['quiz_c3'] +
                "</label>\n" + "</div>"
        }
        if (data['quiz_c4'] === real_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] +"' disabled>" + data['quiz_c4'] +
                "</label>\n" + "</div>"
        }else if(!right && data['quiz_c4'] === stu_A) {
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] +"' disabled>" + data['quiz_c4'] +
                "</label>\n" + "</div>"
        }else{
            addHTML += "<div class=\"radio\">\n";
            addHTML += "<i class=\"fa fa-square\" aria-hidden=\"true\"></i>"
            addHTML += "<label><input type=\"radio\" name=\"optradio" + i + "\" value='" + data['quiz_c4'] +"' disabled>" + data['quiz_c4'] +
                "</label>\n" + "</div>"
        }
        $("#jsAddExam").append(addHTML);
    }
}