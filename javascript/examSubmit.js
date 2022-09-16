import {getQueryVariable, postData} from "./function.js";

async function uploadAnswer(){
    let data = [];
    const examID = getQueryVariable("examID");
    for (let i=0; i < 10 ;i++) {
        let point = "q" + i
        let answer = $("input[name='optradio" + i + "']:checked").val();
        let parent = document.getElementById(point).name
        console.log(answer,parent)
        //不使用form提交，重新包装数据提交
        data.push({
            "exam_id": examID,
            "quiz_id": parent,
            "quiz_answer": answer
        })
    }
    let getResult = await postData("examSubmit", data);
    if (getResult === 500){
        alert("提交失败")
    }else{
        alert("提交成功，您的分数为：" + getResult);
        window.location.href="examLog.html";
    }
}

export {uploadAnswer};