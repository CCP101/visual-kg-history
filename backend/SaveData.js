const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

async function saveQuiz(file,type){
    let filePath = path.join(__dirname, '../server/upload/xlsx/') + `${file.name}`;
    const reader = fs.createReadStream(file.path);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    QuizSavetoSQL(filePath,type);
    return "200";
}

//FIXME 函数待测试
function QuizSavetoSQL(filePath, type) {
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let data = [];
    for (let i = 0; i < xlData.length; i++) {
        let temp = {};
        temp.quizID = uuidv1();
        temp.quizType = type;
        temp.quizTitle = xlData[i].quizTitle;
        temp.quizContent = xlData[i].quizContent;
        temp.quizAnswer = xlData[i].quizAnswer;
        temp.quizScore = xlData[i].quizScore;
        temp.quizDifficulty = xlData[i].quizDifficulty;
        temp.quizAnalysis = xlData[i].quizAnalysis;
        data.push(temp);
    }
    console.log(data);
    let sql = "INSERT INTO quiz(quiz_id,quiz_name,quiz_type,quiz_content,quiz_answer,quiz_score,quiz_difficulty,quiz_analysis,quiz_source,quiz_time,quiz_author,quiz_status,quiz_remark) VALUES ?";
    let sql_data = [data];
    connection.query(sql, sql_data, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    }, function (err) {
        if (err) throw err;
    });
}


exports.saveQuiz = saveQuiz;