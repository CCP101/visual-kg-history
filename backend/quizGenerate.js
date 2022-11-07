const { ConnectMysql, csvRead } = require('./util');
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();


/**
 * 生成试题并输出
 * @return [] 返回生成的试题
 */
async function generateText() {
    let file_path = "../data/PeopleRelation2.csv";
    let quizList = [];
    let result = await csvRead(file_path);
    let set = new Set();
    for (let row in result) {
        set.add(result[row][2]);
    }
    // FIXME: 逻辑更正 A-B关系现有逻辑会生成两次题目 后期针对该问题进行解决 非项目BUG 非紧急
    for (let row in result) {
        let p1 = result[row][0];
        let p2 = result[row][1];
        let rel = result[row][2];
        let query1 = `SELECT people.weight FROM people WHERE name = "${p1}"`;
        let query2 = `SELECT people.weight FROM people WHERE name = "${p2}"`;
        let weight1 = await ConnectMysql(query1);
        let weight2 = await ConnectMysql(query2);
        //MATCH (n:DPerson{name:'赵孝成王'})-[r]-(n1:DPerson) return r
        // let results = JSON.parse(JSON.stringify(weight1))
        let p1v = weight1[0].weight;
        let p2v = weight2[0].weight;
        const array = Array.from(set);
        let index = array.indexOf(rel);
        if (index !== -1) {
            array.splice(index, 1);
        }
        let tempArray = [];
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * array.length);
            tempArray.push(array[random]);
        }
        let wa1 = tempArray[0];
        let wa2 = tempArray[1];
        let wa3 = tempArray[2];
        let quiz = `${p1}与${p2}的关系是(?)，${rel}，${p1}，${p1v}，${p2}，${p2v}，${wa1}，${wa2}，${wa3}`;
        console.log(quiz);
        quizList.push(quiz);
    }
    return quizList;
}

/**
 * 对生成的试题进行处理并将结果存入Excel文件
 */
async function ExcelOutput() {
    let quizResult = await generateText();
    workbook.creator = 'Me';
    workbook.created = new Date(2022, 5, 17);
    workbook.modified = new Date();
    const sheet = workbook.addWorksheet('Quiz');
    sheet.columns = [
        { header: 'qui', key: 'qui', width: 25 },
        { header: 'ans', key: 'ans', width: 25 },
        { header: 'p1', key: 'p1', width: 25 },
        { header: 'wei1', key: 'wei1', width: 25 },
        { header: 'p2', key: 'p2', width: 25 },
        { header: 'wei2', key: 'wei2', width: 25 },
        { header: 'wa1', key: 'wa1', width: 25 },
        { header: 'wa2', key: 'wa2', width: 25 },
        { header: 'wa3', key: 'wa3', width: 25 },
    ];
    for (let quiz in quizResult) {
        let quizSplit = quizResult[quiz].split("，");
        let qui = quizSplit[0];
        let ans = quizSplit[1];
        let p1 = quizSplit[2];
        let wei1 = quizSplit[3];
        let p2 = quizSplit[4];
        let wei2 = quizSplit[5];
        let wa1 = quizSplit[6];
        let wa2 = quizSplit[7];
        let wa3 = quizSplit[8];
        sheet.addRow({ qui: qui, ans: ans, p1:p1, wei1: wei1, p2:p2, wei2: wei2, wa1: wa1, wa2: wa2, wa3: wa3 });
    }
    workbook.xlsx.writeFile('../data/Quiz.xlsx').then(function () {
        console.log("done");
    });
    return "done";
}

/**
 * main函数入口，dataInit为初始化权重计算，ExcelOutput为生成试题并输出
 * 两条指令同时执行需指定时序，否则会出现异常
 */
// dataInit().then(r => {
//     console.log(r);
// })
// ExcelOutput().then(r => {
//     console.log(r);
// });