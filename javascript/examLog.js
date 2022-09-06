import getData from '../javascript/function.js';
import {countdown} from "./function.js";

let getLog = await getData("sql","getExamLog", 'exam');
let tbody = document.querySelector('tbody');
for (let i=0; i < getLog.length ;i++)
{
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
    td6.innerHTML = "<button class=\"btn btn-primary\" id=\"ExamJump\" onclick=\"window.location.href='ReviewAnswer.html?examID=" +
        data['log_id']+
        "'\"> \n" +
        "                  查看\n" +
        "                </button>"
    tr.appendChild(td6);
}