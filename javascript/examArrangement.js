/*
* 配套examArrangement.html
* 实现查询用户考试安排
* */

import getData, {cookiesCheck, exitSystem} from '../javascript/function.js';
import {countdown} from "./function.js";

cookiesCheck();

// FIXME: 现阶段默认考试分配到所有学生 非功能性BUG 非紧急
let getWeight = await getData("sql","getExamUpload", 'exam');
let tbody = document.querySelector('tbody');
for (let i=0; i < getWeight.length ;i++)
{
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
    if (data['exam_setting'] === 'N')
    {
        td3.innerHTML = "未指定时间";
    }
    else
    {
        td3.innerHTML = new Date(data['exam_begin']).toLocaleString();
    }
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    // td4.innerHTML = data['exam_time'] + "分钟";
    td4.innerHTML = "120分钟";
    tr.appendChild(td4);
    let td5 = document.createElement('td');
    let cd = "ct" + i;
    td5.innerHTML = "<td>\n" +
        "<div id="+cd+">\n" +
        "</div></td>";
    tr.appendChild(td5);

    //设置1s刷新一次获取最新倒计时
    function getCountdown(){
        let ct = document.getElementById("ct"+i);

        let time_now = new Date(2022, 9, 16, 21, 0, 0);
        ct.innerHTML = countdown(time_now);
        // ct.innerHTML = countdown(new Date(data['exam_begin']));
    }
    window.setInterval(getCountdown,1000);

    let td6 = document.createElement('td');
    td6.innerHTML = "<button class=\"btn btn-primary\" id=\"ExamJump\" onclick=\"window.location.href='exam.html?examID=" +
        data['exam_uuid']+
        "'\"> \n" +
        "                  测试\n" +
        "                </button>"
    tr.appendChild(td6);
}