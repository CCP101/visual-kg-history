const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const {v1: uuidv1} = require('uuid');
const {connectMysql, sleep} = require('./util');
const moment = require('moment/moment');

/**
 * @param {object} file 上传所获得的文件实体
 * @param {string} type 考试类型
 * @param {number} id 用户对应的考试ID
 * 本地上传XLSX文件，服务器存取文件，记录上传操作，将考试号与本地文件绑定
 * 完成后将文件读取并将题目存取到MySQL数据库中
 * 最后成功返回200，否则返回500
 * 请注意：本函数未测试2010前的XLS版本文件，不确定适配情况，但本系统生成的均为XLSX格式
 */
async function saveQuiz(file, type, id) {
  const examIdUuid = uuidv1();
  const examID = id;
  const filename = file.name.split('.')[0];
  const newFileName = examIdUuid + '_' + filename + '.' +
      file.name.split('.')[1];
  const addTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const saveSql = 'INSERT INTO exam_upload' +
      '(exam_save_name, exam_name, ' +
      'exam_uuid, exam_id_user, upload_time) ' +
      `VALUES ('${newFileName}','${type}',
      '${examIdUuid}','${examID}','${addTime}')`;
  const response = await connectMysql(saveSql);
  if (response === undefined) {
    console.log('NOT SUCCESS');
    return '500';
  }
  // FIXME: 试卷可能处理失败，但仍然会向表内增添记录
  // TODO: 数据库外键关系优化
  const isDirectoryExists = fs.existsSync('../server/upload/xlsx/');
  if (!isDirectoryExists) {
    fs.mkdirSync('../server/upload/xlsx/', {recursive: true});
  }
  const filePath = path.join(__dirname, '../server/upload/xlsx/' + newFileName);
  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  //  考虑到这里是异步操作，需要服务器等待写入完成，否则无法正常读取表格文件，报错!ref'
  await sleep(100);
  // FIXME: 未处理多次上传文件的情况 后期前端适配是否覆盖文件选项
  //  单个考试有多次考试 需要处理的是如何覆盖掉单次考试的试题 或直接将这个BUG处理为系统FEATURE


  /**
     * @param {string} Path 文件路径
     * 读取文件并将其存入数据库中
     * 本函数不被其他函数调用，且需要读取主函数的变量，并且有报错退出的情况，故写成内部函数
     */
  async function quizSavetoSQL(Path) {
    console.log(Path);
    const workbook = xlsx.readFile(Path);
    const sheetNameList = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    const data = [];
    /* 因为JS-EXCEL默认第一行为表头 导入的题目库需要注意这个问题
            统一为 A B C D E F
         */
    for (let i = 0; i < xlData.length; i++) {
      const temp = {};
      temp.quizid = examIdUuid + '-' + i;
      temp.id = i;
      temp.uuid = examIdUuid;
      temp.quiz = xlData[i].A;
      temp.quizC1 = xlData[i].B;
      temp.quizC2 = xlData[i].C;
      temp.quizC3 = xlData[i].D;
      temp.quizC4 = xlData[i].E;
      temp.quizC = xlData[i].F;
      data.push(temp);
    }
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const quizSaveSql = 'INSERT INTO quiz_save' +
          '(quiz_id,id,exam_uuid,quiz_question,' +
          'quiz_c1,quiz_c2,quiz_c3,quiz_c4,quiz_A) ' +
          `VALUES ('${row.quizid}','${row.id}',
          '${row.uuid}','${row.quiz}','${row.quizC1}',
          '${row.quizC2}','${row.quizC3}','${row.quizC4}','${row.quizC}')`;
      const response = await connectMysql(quizSaveSql);
      if (response === undefined) {
        console.log('NOT SUCCESS');
        return '500';
      }
    }
  }
  await quizSavetoSQL(filePath);
  return '200';
}

exports.saveQuiz = saveQuiz;
