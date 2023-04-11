/*
* 配套ReviewAnswer.html
* 根据用户ID及考试号查看考试情况
* */
import {getData, getQueryVariable} from './function.js';

window.onload = async function() {
  const examID = getQueryVariable('examID');
  console.log(examID);
  const examPaperData = await getData('examReview', examID, 'exam');
  for (let i=0; i < examPaperData.length; i++) {
    const data = examPaperData[i];
    const stuA = data.quiz_answer;
    const realA = data.quiz_A;
    let right = false;
    if (stuA === realA) {
      right = true;
    }
    // TODO: 严重垃圾面条代码修改 彩色实现
    let addHTML ='<div class="container">\n' +
        '<P>' + (i+1) + '.' + data['quiz_question'] + '</P>\n' +
        '<form id = "q' + i +'" name="' + data['quiz_id'] + '">\n';
    if (stuA === 'NULL') {
      addHTML += '<i class="fa fa-exclamation" aria-hidden="true"></i> 未作答';
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-square" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c1'] +'\' disabled>' + data['quiz_c1'] +
                '</label>\n' + '</div>';
    } else if (data['quiz_c1'] === realA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-check" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c1'] +'\' disabled>' + data['quiz_c1'] +
                '</label>\n' + '</div>';
    } else if (!right && data['quiz_c1'] === stuA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-times" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c1'] +'\' disabled>' + data['quiz_c1'] +
                '</label>\n' + '</div>';
    } else {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-square" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c1'] +'\' disabled>' + data['quiz_c1'] +
                '</label>\n' + '</div>';
    }
    if (data['quiz_c2'] === realA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-check" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c2'] +'\' disabled>' + data['quiz_c2'] +
                '</label>\n' + '</div>';
    } else if (!right && data['quiz_c2'] === stuA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-times" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c2'] +'\' disabled>' + data['quiz_c2'] +
                '</label>\n' + '</div>';
    } else {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-square" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c2'] +'\' disabled>' + data['quiz_c2'] +
                '</label>\n' + '</div>';
    }
    if (data['quiz_c3'] === realA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-check" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c3'] +'\' disabled>' + data['quiz_c3'] +
                '</label>\n' + '</div>';
    } else if (!right && data['quiz_c3'] === stuA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-times" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c3'] +'\' disabled>' + data['quiz_c3'] +
                '</label>\n' + '</div>';
    } else {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-square" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c3'] +'\' disabled>' + data['quiz_c3'] +
                '</label>\n' + '</div>';
    }
    if (data['quiz_c4'] === realA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-check" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c4'] +'\' disabled>' + data['quiz_c4'] +
                '</label>\n' + '</div>';
    } else if (!right && data['quiz_c4'] === stuA) {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-times" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c4'] +'\' disabled>' + data['quiz_c4'] +
                '</label>\n' + '</div>';
    } else {
      addHTML += '<div class="radio">\n';
      addHTML += '<i class="fa fa-square" aria-hidden="true"></i>';
      addHTML += '<label><input type="radio" name="optradio' + i +
          '" value=\'' + data['quiz_c4'] +'\' disabled>' + data['quiz_c4'] +
                '</label>\n' + '</div>';
    }
    $('#jsAddExam').append(addHTML);
  }
};
