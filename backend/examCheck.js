const moment = require("moment");
const {v1: uuidv1} = require("uuid");
const {ConnectMysql} = require("./util");



async function examCheck(data,username){
    let submit_UUID = uuidv1();
    let user_id = username;
    let addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let score = 0;
    let mysqlCheck = await examLog(data);
    if (mysqlCheck !== 200){
        return 500
    }
    for (let num in data){
        let quizID = data[num].quiz_id;
        let quiz_answer = data[num].quiz_answer;
        let quizCheckSQL = `SELECT * FROM quiz_save WHERE quiz_id = '${quizID}'`;
        let quizCheck = await ConnectMysql(quizCheckSQL);
        if (quizCheck[0].quiz_A === quiz_answer){
            score += 10
        }
    }
    console.log(score);
    let submitLogSQL = "INSERT INTO exam_submit_log(log_id, user_id, exam_id, submit_time, score) " +
        `VALUES ('${submit_UUID}','${user_id}','${data[0].exam_id}','${addTime}','${score}')`;
    let responseSubmitSQL = await ConnectMysql(submitLogSQL);
    if (responseSubmitSQL === undefined){
        console.log("NOT SUCCESS")
        return 500;
    }
    return score


    async function examLog(data){
        for (let num in data){
            let quiz_UUID = uuidv1();
            let examID = data[num].exam_id;
            let quizID = data[num].quiz_id;
            let quiz_answer = data[num].quiz_answer;
            if (quiz_answer === undefined){
                quiz_answer = "NULL";
            }
            let logSQL = "INSERT INTO exam_log(log_id, exam_submit_id, exam_id, quiz_id, quiz_answer, log_time) " +
                `VALUES ('${quiz_UUID}','${submit_UUID}','${examID}','${quizID}','${quiz_answer}','${addTime}')`;
            let response = await ConnectMysql(logSQL);
            if (response === undefined){
                console.log("NOT SUCCESS")
                return 500;
            }
        }
        return 200;
    }
}

exports.examCheck = examCheck;