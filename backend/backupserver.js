const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const os = require('os');
const neo4j = require("neo4j-driver");
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
const app = new Koa();
let myHost = '';

function getIPAdd() {
    let ifaces = os.networkInterfaces()
    for (var dev in ifaces) {
        if (dev.includes('WLAN')) {
            break
        }
    }
    ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4') {
            let adr = details.address;
            myHost = adr;
            return adr;
        }
    })
}

getIPAdd()

function NodesPromise(query,key) {
    return new Promise((resolve, reject) => {
        let session = driver.session({defaultAccessMode: neo4j.session.READ});
        let res = [];
        key = "n.".concat(key)
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    console.log(keys)
                },
                // 打印查询结果 需要根据内容更改筛选器
                onNext: record => {
                    res.push(record.get(key))
                    // console.log(key + "  " + record.get(key))
                },
                onCompleted: (result) => {
                    resolve(res);
                    session.close(); // returns a Promise
                    // console.log(res)
                },
                onError: error => {
                    console.log(error)
                }
            })
    });
}

router.get('/node', (ctx) => {
    // console.log(myHost);
    let client_list = new Set();
    let clientHost = ctx.req.connection.remoteAddress.slice(7, );
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
    // 本机访问3000
    else if (clientHost.includes(myHost) || clientHost === '::1') {
        console.log(clientHost + '正在访问3000端口并请求');
        query = ctx.query.query;
        key = ctx.query.key;
    } else {
        console.log(clientHost + '正在访问3000端口并请求，已返回空');
        query = {query: 'MATCH (n:Error) RETURN n'};
    }
    // 打印当前查询
    console.log(query);
    return NodesPromise(query, key)
        .then(res => {
        console.log(res)
        ctx.body = res
    })
});


app.use(async(ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e)
    }
});


app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);