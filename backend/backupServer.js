const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const os = require('os');
const { NodesRead,ConnectMysql,ReturnServerKey } = require('./util');
const app = new Koa();
let myHost = '';

/**
 * 对本地IP进行过滤及修改
 */
function getIPAdd() {
    let ifAces = os.networkInterfaces();
    for (var dev in ifAces) {
        if (dev.includes('WLAN')) {
            break
        }
    }
    ifAces[dev].forEach(function (details) {
        if (details.family === 'IPv4') {
            let adr = details.address;
            myHost = adr;
            return adr;
        }
    })
}

getIPAdd();

//请注意 app配置工具的顺序不能错，否则bodyParser无法正常工作
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e);
    }
});

/**
 * 对/node请求进行监听
 * @return NodesPromise 调用函数
 */
router.get('/node', (ctx) => {
    // console.log(myHost);
    let client_list = new Set();
    let clientHost = ctx.req.connection.remoteAddress.slice(7,);
    let query;
    let key;
    // 从主页访问的情况

    if (ctx.req.headers.origin) {
        if (client_list.has(clientHost) === false) {
            client_list.add(clientHost);
        }
        query = ctx.query.query;
        key = ctx.query.key;
    }
    // 限制访问范围，如只允许本地访问需修正else内的代码
    else if (clientHost.includes(myHost) || clientHost === '::1') {
        console.log(clientHost + '正在访问3000端口并请求');
        query = ctx.query.query;
        key = ctx.query.key;
    } else {
        console.log(clientHost + '正在从外部访问3000端口并请求');
        query = ctx.query.query;
        key = ctx.query.key;
    }
    // 打印当前查询
    console.log(query);
    return NodesRead(query, key)
        .then(res => {
            ctx.body = res
        })
});

router.get('/sql', (ctx) => {
    let sql = ctx.query.query;
    console.log(sql);
    return ConnectMysql(sql)
        .then(res => {
            ctx.body = res
        })
});

router.get('/key', (ctx) => {
    return ReturnServerKey()
        .then(res => {
            ctx.body = res
        })
});

router.post('/router', (ctx) => {
    let data = ctx.request.body;
    console.log(data);
    //todo: 发送数据到服务器
    ctx.body = "200000";
});




process.on("unhandledrejection", (reason, promise) => {
    console.log(reason, promise);
})
