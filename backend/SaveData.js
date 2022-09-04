const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const {v1: uuidv1} = require("uuid");
const {ConnectMysql, sleep} = require("./util");
const moment = require("moment/moment");

async function saveQuiz(file,type,id){
    let examID_uuid = uuidv1();
    let examID = id;
    let filename = file.name.split(".")[0];
    let newFileName = examID_uuid + "_" + filename + "." + file.name.split(".")[1];
    let addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let save_sql = "INSERT INTO exam_upload(exam_save_name, exam_name, exam_uuid, exam_id_user, upload_time) " +
        `VALUES ('${newFileName}','${type}','${examID_uuid}','${examID}','${addTime}')`;
    let response = await ConnectMysql(save_sql);
    if (response === undefined){
        console.log("NOT SUCCESS")
        return "500";
    }
    let filePath = path.join(__dirname, "../server/upload/xlsx/" + newFileName);
    const reader = fs.createReadStream(file.path);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    // 考虑到这里是异步操作，需要服务器等待写入完成，否则无法正常读取表格文件，报错!ref'
    await sleep(1000);
    /* TODO 未处理多次上传文件的情况 后期前端适配是否覆盖文件选项
    *   单个考试有多次考试 需要处理的是如何覆盖掉单次考试的试题 或直接将这个BUG处理为系统FEATURE
    * */
    function QuizSavetoSQL(Path) {
        console.log(Path);
        const workbook = xlsx.readFile(Path);
        const sheet_name_list = workbook.SheetNames;
        const xlData = workbook.Sheets[sheet_name_list[0]];
        let data = [];
        console.log(xlData)
        // for (let i = 0; i < xlData.length; i++) {
        //     let temp = {};
        //     temp.quiz = xlData[i].
        // }

    }
    QuizSavetoSQL(filePath);
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