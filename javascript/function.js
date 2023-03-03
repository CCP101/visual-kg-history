const config = {
  ip: 'http://' + window.location.hostname.toString(),
  port: 3000,
};


/**
 * 异步实现后端GET请求
 * @param {string} link 后台访问地址
 * @param {string} query 查询语句转写(Neo4j/SQL)
 * @param {string} key Neo4j查询关键字
 * @return {Promise<any>} 以期约方式返回查询结果
 */
async function getData(link, query, key) {
  return new Promise((resolve, reject) => {
    let novelist = [];
    axios.defaults.withCredentials = true;
    axios.get(`${config.ip}:${config.port}/${link}?query=${query}&key=${key}`, {
      headers: {
        'withCredentials': true,
      }})
        .then(function(response) {
          novelist = response.data;
          resolve(novelist);
        })
        .catch(function(err) {
          console.log(err);
          reject(new Error(err));
        });
  });
}

/**
 * 异步实现后端访问
 * @param {string} link 后台访问地址
 * @param {object} postData post请求数据
 * @return {Promise<any>} 以期约方式返回查询结果
 */
function postData(link, postData) {
  return new Promise((resolve, reject) => {
    // 控制axios可传递cookie
    axios.defaults.withCredentials = true;
    axios.post(`${config.ip}:${config.port}/${link}`, postData, {
      headers: {
        'withCredentials': true,
      }})
        .then(function(res) {
          const data = res.data;
          console.log(res);
          resolve(data);
        })
        .catch(function(err) {
          console.log(err);
          reject(new Error(err));
        });
  });
}

/**
 * 计算倒计时
 * @param {Date} time 考试时间
 * @return {string} 倒计时字符串
 */
function countdown(time) {
  if (time.getTime() === 0) {
    return '0';
  }
  const timeNow = new Date();
  if (timeNow.getTime() > time.getTime()) {
    return '已开始';
  }
  const leftTime = time.getTime() - timeNow.getTime(); // 距离结束时间的毫秒数
  const leftD = Math.floor(leftTime/(1000*60*60*24)); // 计算天数
  const leftH = Math.floor(leftTime/(1000*60*60)%24); // 计算小时数
  const leftM = Math.floor(leftTime/(1000*60)%60); // 计算分钟数
  const leftS = Math.floor(leftTime/1000%60); // 计算秒数
  return leftD + '天' + leftH + ':' + leftM + ':' + leftS; // 返回倒计时的字符串
}

/**
 * 获取请求参数
 * @param {string} variable GET请求参数
 * @return {string|boolean} 参数值
 */
function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i=0; i<vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 * 退出系统并销毁session与cookies
 */
async function exitSystem() {
  const userStatus = getCookie('userLogin');
  if (userStatus === '') {
    alert('当前未登录');
  } else {
    const response = await getData('exit');
    if (response === 200) {
      alert('退出成功');
      window.location.href = 'index.html';
    } else {
      alert('退出失败');
    }
  }
}

/**
 * 获取cookies
 * @param {string} cookieName cookies名
 * @return {string} cookies值
 */
function getCookie(cookieName) {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (cookieName === arr[0]) {
      return arr[1];
    }
  }
  return '';
}

/**
 * 检查用户是否登录 若无登录信息跳回登录页
 */
function cookiesCheck() {
  const userStatus = getCookie('userLogin');
  if (userStatus === '') {
    alert('请先登录');
    window.location.href = 'index.html';
  }
}

/**
 * 使用原生sort存在问题，因此使用Fisher–Yates shuffle洗牌算法
 * 参考知乎链接 https://www.zhihu.com/question/68330851
 * @return {Array} 打乱数组
 */
// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function() {
  const array = this;
  let m = array.length;
  let t; let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};


export default getData;
export {countdown, postData, getQueryVariable,
  exitSystem, cookiesCheck, getCookie};
