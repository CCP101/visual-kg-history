const moment = require('moment');
const {v1: uuidv1} = require('uuid');
const {ConnectMysql} = require('./util');


async function examCheck(data, username) {
  const submit_UUID = uuidv1();
  const user_id = username;
  const addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let score = 0;
  const mysqlCheck = await examLog(data);
  if (mysqlCheck !== 200) {
    return 500;
  }
  for (const num in data) {
    const quizID = data[num].quiz_id;
    const quiz_answer = data[num].quiz_answer;
    const quizCheckSQL = `SELECT * FROM quiz_save WHERE quiz_id = '${quizID}'`;
    const quizCheck = await ConnectMysql(quizCheckSQL);
    if (quizCheck[0].quiz_A === quiz_answer) {
      score += 10;
    }
  }
  console.log(score);
  const submitLogSQL = 'INSERT INTO exam_submit_log(log_id, user_id, exam_id, submit_time, score) ' +
        `VALUES ('${submit_UUID}','${user_id}','${data[0].exam_id}','${addTime}','${score}')`;
  const responseSubmitSQL = await ConnectMysql(submitLogSQL);
  if (responseSubmitSQL === undefined) {
    console.log('NOT SUCCESS');
    return 500;
  }
  return score;


  async function examLog(data) {
    for (const num in data) {
      const quiz_UUID = uuidv1();
      const examID = data[num].exam_id;
      const quizID = data[num].quiz_id;
      let quiz_answer = data[num].quiz_answer;
      if (quiz_answer === undefined) {
        quiz_answer = 'NULL';
      }
      const logSQL = 'INSERT INTO exam_log(log_id, exam_submit_id, exam_id, quiz_id, quiz_answer, log_time) ' +
                `VALUES ('${quiz_UUID}','${submit_UUID}','${examID}','${quizID}','${quiz_answer}','${addTime}')`;
      const response = await ConnectMysql(logSQL);
      if (response === undefined) {
        console.log('NOT SUCCESS');
        return 500;
      }
    }
    return 200;
  }
}

exports.examCheck = examCheck;
