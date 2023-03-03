import getData, {cookiesCheck} from '../javascript/function.js';
// import {countdown} from './function.js';
cookiesCheck();
const getLog = await getData('userSql', 'getExamLog', 'exam');
const tbody = document.querySelector('tbody');
for (let i=0; i < getLog.length; i++) {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  const data = getLog[i];
  const td1 = document.createElement('td');
  td1.innerHTML = data['exam_id'];
  tr.appendChild(td1);
  const td2 = document.createElement('td');
  td2.innerHTML = data['submit_time'];
  tr.appendChild(td2);
  const td3 = document.createElement('td');
  td3.innerHTML = data['log_id'];
  tr.appendChild(td3);
  const td4 = document.createElement('td');
  td4.innerHTML = data['score'];
  tr.appendChild(td4);


  const td6 = document.createElement('td');
  td6.innerHTML = '<button class="btn btn-primary" ' +
      'id="ExamJump" onclick="window.location.href=' +
      '\'ReviewAnswer.html?examID=' +
      data['log_id']+
      '\'"> \n' +
      '                  查看\n' +
      '                </button>';
  tr.appendChild(td6);
}
