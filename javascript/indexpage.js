import getData, {exitSystem} from "./function.js";

let getWeight = await getData("sql","getAllExam", 'exam');
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
    td3.innerHTML = new Date(data['exam_begin']).toLocaleString();
    tr.appendChild(td3);
}

document.getElementById("btn").addEventListener("click", exitSystem);