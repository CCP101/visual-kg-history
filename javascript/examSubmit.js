import {getQueryVariable, postData} from './function.js';

/**
 * 向服务器提交试卷*/
async function uploadAnswer() {
  const data = [];
  const examID = getQueryVariable('examID');
  for (let i=0; i < 10; i++) {
    const point = 'q' + i;
    const answer = $('input[name=\'optradio' + i + '\']:checked').val();
    const parent = document.getElementById(point).name;
    console.log(answer, parent);
    // 不使用form提交，重新包装数据提交
    data.push({
      'exam_id': examID,
      'quiz_id': parent,
      'quiz_answer': answer,
    });
  }
  const getResult = await postData('examSubmit', data);
  if (getResult === 500) {
    alert('提交失败');
  } else {
    alert('提交成功，您的分数为：' + getResult);
    window.location.href='examLog.html';
  }
}

export {uploadAnswer};
