const Koa = require('koa');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
const cors = require('koa2-cors');
const session = require('koa-session');
const router = require('koa-router')();
const {v1: uuidv1} = require('uuid');
const os = require('os');
const log4js = require('log4js');
const logger = log4js.getLogger('SKLP');


const fs = require('fs');
const {nodesRead, connectMysql} = require('./util');
const {returnServerKey, userNameCheck} = require('./util');
const {registerUser, loginCheck} = require('./userSetting');
const {saveQuiz} = require('./SaveData');
const {examGenerateFormMysql} = require('./examCreate');
const {examCheck} = require('./examCheck');
const {getExamResultForKG} = require('./quizReview');

logger.level = 'debug';
const app = new Koa();
let myHost = '';

/**
 * 对本地IP进行过滤及修改
 */
function getIPAdd() {
  const ifAces = os.networkInterfaces();
  let dev = '';
  for (dev in ifAces) {
    if (dev.includes('WLAN')) {
      break;
    }
  }
  ifAces[dev].forEach((details) => {
    if (details.family === 'IPv4') {
      const adr = details.address;
      myHost = adr;
      return adr;
    }
  });
}
getIPAdd();

/**
 * 本项目技术栈大坑-前端Axios默认不处理服务器端修改cookies的请求
 * 此处要对应设置KOA的CORS配置，允许本地调试时跨域
 * 正式服务器上线时理论上不需要考虑本问题，但仍需测试
 */
app.use(cors({
  credentials: true,
  // web前端服务器地址，本地调试使用
  origin: 'http://localhost',
  // 防止浏览器端进行恶意篡改
  methods: ['GET', 'POST'],
}));

/**
 * KOA框架配置session
 * 参考链接：https://segmentfault.com/a/1190000016707043
 */
app.use(session({
  key: 'TUST',
  maxAge: 1000 * 60 * 60 * 2,
}, app));
// 请注意 app配置工具的顺序不能错，否则bodyParser无法正常工作
app.use(formidable());
app.use(bodyParser());
app.keys = ['TUST'];
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.error(e);
  }
});

app.use(koaBody({
  // 支持上传文件格式
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    keepExtensions: true,
  },
}));

/**
 * 对/node GET请求进行监听，实现对Neo4j数据库的包装访问
 * 非模板函数，仅限严格的限制请求来源的方法
 * 通过ctx.query解析GET请求
 * @return res Neo4j查询结果
 */
router.get('/node', (ctx) => {
  // console.log(myHost);
  const clientList = new Set();
  const clientHost = ctx.req.connection.remoteAddress.slice(7);
  let cypherQuery;
  let key;
  const cypherList = {
    selectPeople: 'MATCH (n:DPerson) RETURN n LIMIT 100',
    selectRelation: 'MATCH (P1:DPerson)-[r]-(P2:DPerson) RETURN r ',
    selectRelationByName:
        'MATCH (P1:DPerson)-[r]-(P2:DPerson) WHERE P1.name = {name} RETURN r ',
  };
  // 从主页访问的情况
  if (ctx.req.headers.origin) {
    if (clientList.has(clientHost) === false) {
      clientList.add(clientHost);
    }
    cypherQuery = ctx.query.query;
    key = ctx.query.key;
    // 限制访问范围，生产环境可以用来拦截外部来的访问
    // 开发环境建议不修改方便调试，如只允许本机访问需修正else内的代码
  } else if (clientHost.includes(myHost) || clientHost === '::1') {
    logger.debug(`${clientHost}正在访问3000端口并请求`);
    cypherQuery = ctx.query.query;
    key = ctx.query.key;
  } else {
    logger.debug(`${clientHost}正在从外部访问3000端口并请求`);
    cypherQuery = ctx.query.query;
    key = ctx.query.key;
  }
  // 打印当前查询
  logger.debug(cypherList[cypherQuery]);
  return nodesRead(cypherList[cypherQuery], key)
      .then((res) => {
        ctx.body = res;
      });
});

/**
 * 对/sql GET请求进行监听，实现对MySQL数据库的包装访问
 * 模板函数，理解路由器拦截后的实际作用
 * 通过ctx.query解析GET请求
 * @return res MySQL查询结果
 */
router.get('/sql', (ctx) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${month}/${day}`;
  const sqlList = {
    getAllUsers: 'SELECT * FROM people',
    getExamUpload: 'SELECT * FROM exam_upload',
    // TODO: 未来工作：将考试安排与测试分离
    getAllExam: 'SELECT * FROM exam_arrangement',
    getAllHT: 'SELECT * FROM history_today WHERE DATE = \''+ today +'\'',
    getHotTopic: 'SELECT * FROM hot_topic',
    getArticle: 'SELECT * FROM article_storage LIMIT 15',
  };
  // 从前端访问连接中获得值
  const sqlSelect = ctx.query.query;
  // 包装一层，取出真正的SQL语句，防止直接将MySQL查询接口暴露给前端
  const sql = sqlList[sqlSelect];
  return connectMysql(sql)
      .then((res) => {
      // 获得返回结果后将结果返回给前端
        ctx.body = res;
      });
});

router.get('/userSql', (ctx) => {
  const userLogin = ctx.cookies.get('userLogin') || 'No userLogin';
  const username = ctx.session[userLogin].name;
  const sqlList = {
    getExamLog: 'SELECT * FROM exam_submit_log WHERE user_id = ?',
  };
  const sqlSelect = ctx.query.query;
  const sql = sqlList[sqlSelect];
  return connectMysql(sql, username)
      .then((res) => {
      // 获得返回结果后将结果返回给前端
        ctx.body = res;
      });
});

/**
 * 对/key GET请求进行监听，发送服务器生成的公匙
 * @return res RSA公匙
 */
router.get('/key', (ctx) => returnServerKey()
    .then((res) => {
      ctx.body = res;
    }));

/**
 * 对/userCheck GET请求进行监听，检查注册ID是否可用
 * @return res 检查结果
 */
router.get('/userCheck', (ctx) => {
  const username = ctx.query.query;
  const userLogin = ctx.cookies.get('userLogin') || 'No userLogin';
  let userSession = 'No userSession';
  if (userLogin !== 'No userLogin') {
    userSession = ctx.session[userLogin].name;
  }
  // 测试设置的cookies与session是否成功
  logger.debug(`cookies:  ${userLogin}`);
  logger.debug(`session:  ${userSession}`);
  return userNameCheck(username)
      .then((res) => {
        ctx.body = res;
      });
});

/**
 * 对/exit GET请求进行监听，用户退出
 * 清空cookies和session
 */
router.get('/exit', (ctx) => {
  const userLogin = ctx.cookies.get('userLogin');
  logger.debug(`user ${ctx.session[userLogin].name} exit`);
  ctx.cookies.set('name', '', {signed: false, maxAge: 0});
  ctx.cookies.set('userLogin', '', {signed: false, maxAge: 0});
  ctx.session = null;
  ctx.body = 200;
});

/**
 * 对/examGet GET请求进行监听，获取生成试卷
 * @return res 生成试卷结果
 */
router.get('/examGet', (ctx) => {
  const examID = ctx.query.query;
  return examGenerateFormMysql(examID)
      .then((res) => {
        ctx.body = res;
      });
});

router.get('/nodeJSON', (ctx) => {
  const jsonFileName = ctx.query.query;
  ctx.body = fs.readFileSync(`../data/json/${jsonFileName}.json`);
});

/**
 * 对/login POST请求进行监听，用户登录业务
 * 通过ctx.body解析POST内容
 * ctx.session 创建用户session
 * ctx.cookies 创建用户cookies
 * @return {number} res 检查结果
 */
router.post('/login', async (ctx) => {
  const data = ctx.request.body;
  const userID = uuidv1();
  // 登陆后设置登录用户的浏览器端cookies与服务器端session信息
  ctx.session[userID] = {name: data.username};
  const returnCode = await loginCheck(data);
  // cookies写入ctx传回前端设置
  if (returnCode === 200 && data.rememberCheck === false) {
    ctx.cookies.set(
        'userLogin',
        userID,
        {maxAge: 1000 * 60 * 60 * 2, signed: true, httpOnly: false},
    );
  } else if (returnCode === 200 && data.rememberCheck === true) {
    ctx.cookies.set(
        'userLogin',
        userID,
        {maxAge: 1000 * 60 * 60 * 24 * 7, signed: true, httpOnly: false},
    );
  }
  ctx.body = returnCode;
});

/**
 * 对/register POST请求进行监听，注册账户事务
 * 通过ctx.body解析POST内容
 * @return res 检查结果
 */
router.post('/register', async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await registerUser(data);
});

/**
 * 对/uploadQuiz POST请求进行监听，上传试卷文件
 */
router.post('/uploadQuiz', async (ctx) => {
  const {file} = ctx.request.files;
  const {type} = ctx.request.body;
  const {id} = ctx.request.body;
  ctx.body = await saveQuiz(file, type, id);
});

/**
 * 对/uploadSubmit POST请求进行监听，上传学生考试作答
 */
router.post('/examSubmit', async (ctx) => {
  const data = ctx.request.body;
  const userLogin = ctx.cookies.get('userLogin') || 'No userLogin';
  const username = ctx.session[userLogin].name;
  ctx.body = await examCheck(data, username);
});

/**
 * 对/examReview GET请求进行监听，获得学生考试作答情况
 */
router.get('/examReview', async (ctx) => {
  const key = ctx.query.query;
  // 多表查询
  const sql = 'SELECT \tquiz_save.quiz_A, quiz_save.quiz_id, ' +
      'exam_log.quiz_answer, quiz_save.quiz_question, ' +
      'quiz_save.quiz_c1, quiz_save.quiz_c2, quiz_save.quiz_c3, ' +
      'quiz_save.quiz_c4 FROM exam_log,quiz_save ' +
      'WHERE quiz_save.quiz_id = exam_log.quiz_id ' +
      'AND exam_log.exam_submit_id = ' +
        `'${key}'`;
  ctx.body = await connectMysql(sql);
});

/**
 * 对/WAnode GET请求进行监听，获得考试试卷错题所对应的知识图谱
 */
router.get('/WAnode', async (ctx) => {
  const examID = ctx.query.query;
  const {key} = ctx.query;
  const person = await getExamResultForKG(examID);
  let cypher = 'MATCH (n:DPerson)-[r]-(n2:DPerson) WHERE';
  for (let i = 0; i < person.length; i++) {
    cypher += ` n.name = '${person[i][0]}' OR n.name = '${person[i][1]}`;
    if (i !== person.length - 1) {
      cypher += '\' OR';
    }
  }
  let result;
  if (key === 'n') {
    cypher += '\' RETURN n2';
    result = await nodesRead(cypher, 'n2');
  } else if (key === 'ni') {
    cypher += '\' RETURN n';
    result = await nodesRead(cypher, 'n');
  } else {
    cypher += '\' RETURN r';
    result = await nodesRead(cypher, 'r');
  }
  ctx.body = result;
});

/**
 * 对/WARelation GET请求进行监听，获得考试试卷错题所对应的知识图谱中的边关系
 */
router.get('/WARelation', async (ctx) => {
  const examID = ctx.query.query;
  const person = await getExamResultForKG(examID);
  const relation = [];
  for (let i = 0; i < person.length; i++) {
    let cypher = 'MATCH (n:DPerson)-[r]-(n2:DPerson) WHERE';
    cypher += ` n.name = '${person[i][0]}' 
      AND n2.name = '${person[i][1]}' RETURN r`;
    const result = await nodesRead(cypher, 'r');
    for (let j = 0; j < result.length; j++) {
      relation.push(result[j]);
    }
  }
  ctx.body = relation;
});

process.on('unhandledrejection', (reason, promise) => {
  logger.error(reason, promise);
});

// 后期Babel打包预留
// 该项目使用Babel7打包 请使用@bable 安装 否则会报错
// 打包命令 babel src -d dist
// babel 文档链接 https://www.babeljs.cn/docs/
// require("babel-core").transform("code", {
//     plugins: ["transform-runtime"]
// });

logger.info('Server is running at http://localhost/visual-kg-history/');
logger.info(returnServerKey());

module.exports = app.listen(3050);
