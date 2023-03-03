const {connectMysql} = require('./util');

/**
 * 从MySQL试题库中随机抽取题目
 * @param {String} examID - 考试ID
 * @return {Array} result - 题目
 * */
async function examGenerateFormMysql(examID) {
  console.log(examID);
  const examGetSQL = `SELECT quiz_id,quiz_question,
       quiz_c1,quiz_c2,quiz_c3,quiz_c4 
        FROM quiz_save WHERE exam_uuid = '${examID}' ORDER BY rand() LIMIT 10;`;
  const result = await connectMysql(examGetSQL);
  // for (let i=0; i < result.length; i++) {
  //   const data = result[i];
  //   console.log(data["quiz_question"]);
  // }
  return result;
}

exports.examGenerateFormMysql = examGenerateFormMysql;
