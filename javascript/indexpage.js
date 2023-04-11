import {getData, exitSystem} from './function.js';

const getWeight = await getData('sql', 'getAllExam', 'exam');
const tbody = document.querySelector('tbody');
for (let i=0; i < getWeight.length; i++) {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  const data = getWeight[i];
  const td1 = document.createElement('td');
  td1.innerHTML = data['exam_name'];
  tr.appendChild(td1);
  const td2 = document.createElement('td');
  td2.innerHTML = data['exam_id'];
  tr.appendChild(td2);
  const td3 = document.createElement('td');
  td3.innerHTML = new Date(data['exam_begin']).toLocaleString();
  tr.appendChild(td3);
}

document.getElementById('btn').addEventListener('click', exitSystem);
