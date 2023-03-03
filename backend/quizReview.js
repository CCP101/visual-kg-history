const {connectMysql} = require('./util');
/**
 * 于数据库中查询考试结果，返回需要重点标出的内容
 * @param {string} examID 考试ID
 * @return {Promise<[]>} 以期约方式返回查询结果
 * */
async function getExamResultForKG(examID) {
  const sql = 'SELECT quiz_save.quiz_question ' +
      'FROM exam_log,quiz_save WHERE quiz_save.quiz_id = exam_log.quiz_id ' +
      'AND exam_log.exam_submit_id = ' + `'${examID}'` +
      'AND quiz_save.quiz_A !=exam_log.quiz_answer';
  const res = await connectMysql(sql);
  const person = [];
  // FIXME: 临时判断代码 后期修正 只能判断春秋战国考试
  for (let i = 0; i < res.length; i++) {
    const log = res[i]['quiz_question'];
    const p1 = log.split('与')[0];
    const p2 = log.split('与')[1].split('的')[0];
    person.push([p1, p2]);
  }
  return new Promise((resolve) => {
    resolve(person);
  });
}

exports.getExamResultForKG = getExamResultForKG;
