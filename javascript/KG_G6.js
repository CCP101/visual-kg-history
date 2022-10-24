let nodes = [];
let edges = [];
import getData, {getQueryVariable} from './function.js';

let HPerson_weight = {};
//提前拉取两个非敏感数据文件
let getWeight = await getData("sql", "getAllUsers","user");
let getNodeJson = await getData("nodeJSON","node_information","n");

for (let person of getWeight) {
    HPerson_weight[person.name] = person.weight;
}

const examID = getQueryVariable("examID");

/**
 * 异步实现网页首次启动时的默认查询
 */
async function getDatabaseFirst(examID) {
    let set = new Set();
    let HPerson_Teams;
    let HPerson_Relation;
    if(examID === "200"){
        HPerson_Teams = await getData("node","selectPeople","n");
        HPerson_Relation = await getData("node","selectRelation","r");
    }else{
        HPerson_Teams = await getData("WAnode",examID,"n");
        HPerson_Relation = await getData("WAnode",examID,"r");
    }

    //Neo4j查询结果转换为G6的数据格式
    for (let node of HPerson_Teams) {
        nodes.push({
            id: "node-" + node.identity,
            value: {
                type: node.labels[0],
                ...node.properties
            },
            // label: node.properties.name.length > 4 ? node.properties.name.substring(0, 4) + "..." : node.properties.name,
            label: node.properties.name,
            name: node.properties.name,
            mysqlId:node.properties.id,
            type: node.labels[0],
            // ...nodeConfig[node.labels[0]]
        })
    }
    for (let relation of HPerson_Relation) {
        // 边去重
        let edgeName = "edge-" + relation.start + "-" + relation.end;
        if (set.has(edgeName)) {
            continue;
        } else {
            set.add(edgeName);
        }
        edges.push({
            id: "edge-" + relation.start + "-" + relation.end,
            source: "node-" + relation.start,
            target: "node-" + relation.end,
            label: relation.type.length > 4 ? relation.type.substring(0, 4) + "..." : relation.type,
            name: relation.type,
            // ...edgeConfig[relation.type]
        });
    }
}

/*
* G6 Tooltip工具 用于显示节点信息与边信息
* ISSUE#3850 G6无法在Tooltip内部实现同步异步操作 推测应为是资源限制
* 使用JSON文件解决 继续走Axios拿数据 但不是同步异步过程
*/
const showProperty = new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    //鼠标移动到实体上就调用
    trigger: 'mousemove',
    fixToNode: [1, 0.5],
    itemTypes: ['node', 'edge'],
    getContent: (e) => {
        //创新新的内容框 向内部填入HTML内容
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        outDiv.style.height = 'fit-content';
        const model = e.item.getModel();
        if (e.item.getType() === 'node') {
            outDiv.innerHTML = `${model.name} : ${HPerson_weight[model.name]}`;
            let node_id = model.mysqlId;
            //配合传入的JSON文件获得相关信息 不从数据库内拉取数据
            //解决G6 tooltip不支持异步的问题
            let node_obj = getNodeJson.find(function (obj) {
                return obj.id === node_id;
            });
            let node_txt = node_obj.id;
            let node_img = "https://github-ccp101.oss-us-west-1.aliyuncs.com/history.jpg"
            console.log(node_obj);
            outDiv.innerHTML += "<br>"
            outDiv.innerHTML += node_txt;
            outDiv.innerHTML += "<br>"
            outDiv.innerHTML += "<img src='https://github-ccp101.oss-us-west-1.aliyuncs.com/history.jpg'>"
        } else {
            const source = e.item.getSource();
            const target = e.item.getTarget();
            outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
        }
        return outDiv;
    },
});

/**
 * 配置图属性
 * 图基本配置、模式、样式、插件、默认点边样式
 */
const grid = new G6.Grid();
const minimap = new G6.Minimap();
const graph = new G6.Graph({
    container: 'mountNode',
    width: window.screen.availWidth,
    height: 800,
    animate: true,
    modes: {
        default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas', 'activate-relations'],
    },
    layout: {
        type: 'force',
        center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
        preventOverlap: true,
        linkDistance: 180,
    },
    plugins: [showProperty, grid, minimap],
    defaultNode: {
        size: 60,
        color: '#5B8FF9',
    },
    defaultEdge: {
        size: 3,
        color: '#4561d3',
        type: 'quadratic',
        labelCfg: {
            style: {
                fill: '#ddd',
                stroke: '',
            },
        },
        style: {
            endArrow: true,
            // startArrow: true
        }
    }
});


// 在图上绑定事件点击事件
// graph.on('node:click', async (e) => {
//     const item = e.item;
//     console.log(item._cfg.id);
// })
graph.on('node:dblclick', async (e) => {
    const item = e.item;
    console.log(item._cfg.id);
    window.location.href = "../index.html?examID=" + item._cfg.id;
})
// 在第一次渲染图之前渲染需要强调的节点与边
graph.on('beforerender', async (e) => {
    if (examID !== false){
        const examID = getQueryVariable("examID");
        const ImportantNode = await getData("WAnode", examID, "ni");
        const ImportantRelation = await getData("WARelation", examID, "r");
        for (let node of ImportantNode) {
            let nodeID = "node-" + node.identity;
            const item = graph.findById(nodeID);
            graph.updateItem(item, {
                style: {
                    stroke: 'red',
                    fill: 'orange',
                    size: 80,
                },
            });
        }
        for (let rel of ImportantRelation) {
            let relID = "edge-" + rel.start + "-" + rel.end;
            const item = graph.findById(relID);
            graph.updateItem(item, {
                style: {
                    stroke: 'red',
                    size: 80,
                },
            });
        }
    }
})

// 程序主入口
window.onload = async function () {
    if (examID === false){
        await getDatabaseFirst("200");
    }else{
        await getDatabaseFirst(examID);
    }
    //过滤无用边
    //todo 实际上F12内出现多个多边报错 需要进行处理
    let nodeList = [];
    for (let node of nodes) {
        nodeList.push(node.id.toString().replace('node-', ''));
    }
    let edgesReal = [];
    for (let edge of edges) {
        let leftNode = edge.source.toString().replace('node-', '');
        let rightNode = edge.target.toString().replace('node-', '');
        if (nodeList.includes(leftNode) && nodeList.includes(rightNode)) {
            edgesReal.push(edge);
        }
    }
    graph.data({
        "nodes": nodes,
        "edges": edgesReal
    });
    graph.render();
}