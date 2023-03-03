const moment = require('moment');
const {v1: uuidv1} = require('uuid');
const {connectMysql} = require('./util');

/**
  阅卷后给出分数并将相关信息写入数据库
  @param {Array} data - 阅卷数据
  @param {String} username - 用户名
  @return {Number} score - 分数
 */
async function examCheck(data, username) {
  const submitUUID = uuidv1();
  const userId = username;
  const addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let score = 0;
  const mysqlCheck = await examLog(data);
  if (mysqlCheck !== 200) {
    return 500;
  }
  for (const num in data) {
    if (num === '') {
      continue;
    }
    const quizID = data[num].quiz_id;
    const quizAnswer = data[num].quiz_answer;
    const quizCheckSQL = `SELECT * FROM quiz_save WHERE quiz_id = '${quizID}'`;
    const quizCheck = await connectMysql(quizCheckSQL);
    if (quizCheck[0].quiz_A === quizAnswer) {
      score += 10;
    }
  }
  console.log(score);
  const submitLogSQL = 'INSERT INTO ' +
      'exam_submit_log(log_id, user_id, exam_id, submit_time, score) ' +
      `VALUES ('${submitUUID}','${userId}',
      '${data[0].exam_id}','${addTime}','${score}')`;
  const responseSubmitSQL = await connectMysql(submitLogSQL);
  if (responseSubmitSQL === undefined) {
    console.log('NOT SUCCESS');
    return 500;
  }
  return score;

  /**
   * 将作答记录写入数据库中
   * @param {object} data - 作答记录
   * */
  async function examLog(data) {
    for (const num in data) {
      if (num === '') {
        continue;
      }
      const quizUUID = uuidv1();
      const examID = data[num].exam_id;
      const quizID = data[num].quiz_id;
      let quizAnswer = data[num].quiz_answer;
      if (quizAnswer === undefined) {
        quizAnswer = 'NULL';
      }
      const logSQL = 'INSERT INTO exam_log' +
          '(log_id, exam_submit_id, exam_id, quiz_id, quiz_answer, log_time) ' +
          `VALUES ('${quizUUID}','${submitUUID}','${examID}',
          '${quizID}','${quizAnswer}','${addTime}')`;
      const response = await connectMysql(logSQL);
      if (response === undefined) {
        console.log('NOT SUCCESS');
        return 500;
      }
    }
    return 200;
  }
}

exports.examCheck = examCheck;
