import {postData} from './function.js';

/**
 * 向服务器上传试卷文件
 * */
async function uploadFile() {
  const file = $('#exampaper').prop('files')[0];
  const type = $('#validationDefault04').val();
  const examID = $('#validationDefault03').val();
  console.log(type);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('id', examID);
  console.log(formData);
  const getData = await postData('uploadQuiz', formData);
  if (getData === 200) {
    alert('上传成功');
  }
  if (getData === 500) {
    alert('上传失败');
  }
  console.log(getData);
}

export {uploadFile};
