/*
* 配套examArrangement.html
* 实现查询用户考试安排
* */

import getData, {cookiesCheck} from '../javascript/function.js';
import {countdown} from './function.js';

cookiesCheck();

// FIXME: 现阶段默认考试分配到所有学生 非功能性BUG 非紧急
const getWeight = await getData('sql', 'getExamUpload', 'exam');
const tbody = document.querySelector('tbody');
for (let i=0; i < getWeight.length; i++) {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  const data = getWeight[i];
  const td1 = document.createElement('td');
  td1.innerHTML = data['exam_name'];
  tr.appendChild(td1);
  const td2 = document.createElement('td');
  td2.innerHTML = data['exam_uuid'];
  tr.appendChild(td2);
  const td3 = document.createElement('td');
  if (data['exam_setting'] === 'N') {
    td3.innerHTML = '未指定时间';
  } else {
    td3.innerHTML = new Date(data['exam_begin']).toLocaleString();
  }
  tr.appendChild(td3);
  const td4 = document.createElement('td');
  // td4.innerHTML = data['exam_time'] + "分钟";
  td4.innerHTML = '120分钟';
  tr.appendChild(td4);
  const td5 = document.createElement('td');
  const cd = 'ct' + i;
  td5.innerHTML = '<td>\n' +
        '<div id='+cd+'>\n' +
        '</div></td>';
  tr.appendChild(td5);

  /**
   * 设置1s刷新一次获取最新倒计时
   * */
  function getCountdown() {
    const ct = document.getElementById('ct'+i);
    const timeNow = new Date(2022, 9, 16, 21, 0, 0);
    ct.innerHTML = countdown(timeNow);
    // ct.innerHTML = countdown(new Date(data['exam_begin']));
  }
  window.setInterval(getCountdown, 1000);

  const td6 = document.createElement('td');
  td6.innerHTML = '<button class="btn btn-primary" id="ExamJump" ' +
      'onclick="window.location.href=\'exam.html?examID=' +
      data['exam_uuid']+
      '\'"> \n' +
      '                  测试\n' +
      '                </button>';
  tr.appendChild(td6);
}
