const config = {
    ip: 'http://' + window.location.hostname.toString(),
    port: 3000,
}


/**
 * 异步实现后端GET请求
 * @param link 后台访问地址
 * @param para 查询语句转写(Neo4j/SQL)
 * @param key Neo4j查询关键字
 * @return {Promise<any>} 以期约方式返回查询结果
 */
async function getData(link,para,key) {
    return new Promise((resolve, reject) => {
        let novelist = [];
        axios.defaults.withCredentials = true;
        axios.get(`${config.ip}:${config.port}/${link}?query=${para}&key=${key}`,{
            headers: {
                "withCredentials":true
            }})
            .then(function (response) {
                novelist = response.data
                resolve(novelist);
            })
            .catch(function (err) {
                console.log(err);
                reject(new Error(err));
            });
    });
}

/**
 * 异步实现后端访问
 * @param link 后台访问地址
 * @param postData post请求数据
 */
function postData(link, postData) {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post(`${config.ip}:${config.port}/${link}`, postData,{
            headers: {
                "withCredentials":true
            }})
            .then(function (res) {
                let data = res.data;
                console.log(res);
                resolve(data);
            })
            .catch(function (err) {
                console.log(err);
                reject(new Error(err));
            });
    });
}


function countdown(time) {
    if (time.getTime() === 0) {
        return 0;
    }
    let time_now = new Date();
    let left_time = time.getTime() - time_now.getTime(),  //距离结束时间的毫秒数
        left_d = Math.floor(left_time/(1000*60*60*24)),  //计算天数
        left_h = Math.floor(left_time/(1000*60*60)%24),  //计算小时数
        left_m = Math.floor(left_time/(1000*60)%60),  //计算分钟数
        left_s = Math.floor(left_time/1000%60);  //计算秒数
    return left_d + "天" + left_h + ":" + left_m + ":" + left_s;  //返回倒计时的字符串
}


export default getData;
export { countdown, postData };