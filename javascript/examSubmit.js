import {postData} from "./function.js";

async function uploadAnswer(){
    let c1 = $('input[name="optradio0"]:checked').val();
    console.log(c1)
    let type = $("#validationDefault04").val();
    let examID = $("#validationDefault03").val();
    // console.log(type)
    // let formData = new FormData();
    // formData.append("file", file);
    // formData.append("type", type);
    // formData.append("id", examID);
    // console.log(formData)
    // let getData = await postData("uploadQuiz", formData);
    // if (getData === 200){
    //     alert("上传成功");
    // }
    // if (getData === 500){
    //     alert("上传失败");
    // }
    // console.log(getData);
}

export {uploadAnswer};