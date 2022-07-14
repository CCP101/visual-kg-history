import getData from '../javascript/function.js';
import {countdown} from "./function.js";
let getWeight = await getData("sql","getExamArrangement", 'exam');
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
    td2.innerHTML = data['exam_id'];
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
    td4.innerHTML = data['exam_time'] + "分钟";
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
        ct.innerHTML = countdown(new Date(data['exam_begin']));
    }
    window.setInterval(getCountdown,1000);

    //todo 实现按钮功能
    let td6 = document.createElement('td');
    td6.innerHTML = "<td>\n" +
        "<button id = \"bt"+i+"\" class=\"btn btn-primary btn-sm\" onclick=alert('待完成点击函数跳转')>操作</button>\n" +
        "</div></td>";
    tr.appendChild(td6);
}