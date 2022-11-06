const {ConnectMysql} = require("./util");

async function examGenerateFormMysql(examID){
    console.log(examID)
    let examGetSQL = `SELECT quiz_id,quiz_question,quiz_c1,quiz_c2,quiz_c3,quiz_c4 FROM quiz_save WHERE exam_uuid = '${examID}' ORDER BY rand() LIMIT 10;`;
    let result = await ConnectMysql(examGetSQL);
    for (let i=0; i < result.length ;i++) {
        let data = result[i];
        // console.log(data["quiz_question"])
    }
    return result
}

exports.examGenerateFormMysql = examGenerateFormMysql;