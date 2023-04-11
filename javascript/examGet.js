/*
* 配套exam.html
* 根据考试号下载试卷
* */

import {getData, getQueryVariable} from './function.js';

window.onload = async function() {
  const examID = getQueryVariable('examID');
  console.log(examID);
  const examPaperData = await getData('examGet', examID, 'exam');
  for (let i=0; i < examPaperData.length; i++) {
    const data = examPaperData[i];
    const choices = [data['quiz_c1'], data['quiz_c2'],
      data['quiz_c3'], data['quiz_c4']];
    choices.shuffle();
    $('#jsAddExam').append('<div class="container">\n' +
            '<P>' + (i+1) + '.' + data['quiz_question'] + '</P>\n' +
            '<form id = "q' + i +'" name="' + data['quiz_id'] + '">\n' +
            '<div class="radio">\n' +
            '<label><input type="radio" name="optradio' + i +
            '" value=\'' + choices[0] +'\'>' + choices[0] +
            '</label>\n' + '</div>'+
            '<div class="radio">\n' +
            '<label><input type="radio" name="optradio' + i +
            '" value=\'' + choices[1] +'\'>' + choices[1] +
            '</label>\n' + '</div>'+
            '<div class="radio">\n' +
            '<label><input type="radio" name="optradio' + i +
            '" value=\'' + choices[2] +'\'>' + choices[2] +
            '</label>\n' + '</div>'+
            '<div class="radio">\n' +
            '<label><input type="radio" name="optradio' + i +
            '" value=\'' + choices[3] +'\'>' + choices[3] +
            '</label>\n' + '</div>'+
            '</form>\n' +
            '</div>\n'+
            '<div class="row bg-light"><br></div>',
    );
  }
};
