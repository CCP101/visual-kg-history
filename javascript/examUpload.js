import getData, {postData} from "../javascript/function.js";
// todo 前端页面修改后完善 Form提交服务器处理

async function uploadFile(){
    let file = $("#exampaper").prop("files")[0];
    let type = $("#validationDefault04").val();
    console.log(type)
    let formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    console.log(formData)
    let getData = await postData("uploadQuiz", formData);
    if (getData === 200){
        alert("上传成功");
    }
    if (getData === 500){
        alert("上传失败");
    }
    console.log(getData);
}

export {uploadFile};