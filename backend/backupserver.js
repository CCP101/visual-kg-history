const Koa = require('koa')
const router = require('koa-router')
const cors = require('koa2-cors')
const neo4j = require('neo4j-driver')
const os = require('os')
const app = new Koa()
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
            let adr = details.address
            myHost = adr
            return adr
        }
    })
}

getIPAdd()

router.get('/all', (ctx, next) => {
    console.log(myHost);
    let client_list = new Set()
    let clientHost = ctx.req.connection.remoteAddress.slice(7, )
    let query
    // 从主页访问的情况

    if (ctx.req.headers.origin) {
        if (client_list.has(clientHost) === false) {
            client_list.add(clientHost);
        }
        query = ctx.query;
    }
    // 本机访问3000
    else if (clientHost.includes(myHost) || clientHost === '::1') {
        console.log(clientHost + '正在访问3000端口并请求');
        query = ctx.query;

    } else {
        console.log(clientHost + '正在访问3000端口并请求，已返回空');
        query = {query: 'MATCH (n:Error) RETURN n'};
    }

    console.log(query);
    return neo4j.neo4jConnect(query.query).then(nodes => {
        ctx.body = nodes
    })
});


app.use(async(ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e)
    }
});


app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)