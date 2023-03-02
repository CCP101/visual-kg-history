const {ConnectMysql} = require('./util');

async function getExamResultForKG(examID) {
  const sql = 'SELECT quiz_save.quiz_question FROM exam_log,quiz_save WHERE quiz_save.quiz_id = exam_log.quiz_id ' +
        'AND exam_log.exam_submit_id = ' + `'${examID}'` +
        'AND quiz_save.quiz_A !=exam_log.quiz_answer';
  const res = await ConnectMysql(sql);
  const person = [];
  // FIXME: 临时判断代码 后期修正 只能判断春秋战国考试
  for (let i = 0; i < res.length; i++) {
    const log = res[i]['quiz_question'];
    const p1 = log.split('与')[0];
    const p2 = log.split('与')[1].split('的')[0];
    person.push([p1, p2]);
  }
  return person;
}

exports.getExamResultForKG = getExamResultForKG;
