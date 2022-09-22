let nodes = [];
let edges = [];
import getData, {getQueryVariable} from './function.js';

let HPerson_weight = {};
let getWeight = await getData("sql", "getAllUsers","user");
for (let person of getWeight) {
    HPerson_weight[person.name] = person.weight;
}


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
            label: node.properties.name + ":" + HPerson_weight[node.properties.name],
            name: node.properties.name,
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


const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    fixToNode: [1, 0.5],
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e) => {
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        outDiv.style.height = 'fit-content';
        const model = e.item.getModel();
        if (e.item.getType() === 'node') {
            outDiv.innerHTML = `${model.name}`;
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
 */
const graph = new G6.Graph({
    container: 'mountNode',
    width: window.screen.availWidth,
    height: 800,
    modes: {
        default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas','activate-relations'],
    },
    layout: {
        type: 'force',
        center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
        preventOverlap: true,
        linkDistance: 180,
    },
    plugins: [tooltip],
    defaultNode: {
        size: 60,
        color: '#5B8FF9',
        //TODO: 后期实现边和点的美化 需要实现持久的动画效果
    },
    defaultEdge: {
        size: 3,
        color: '#4561d3',
        // label: 'node-label',
        labelCfg: {
            style: {
                fill: '#ddd',
                stroke: '',
            },
        },
    }
});

graph.on('node:click', (e)=>{
    const item = e.item;
    graph.focusItem(item, true, {
        easing: 'easeCubic',
        duration: 500,
    });
});


/**
 * 在图上绑定事件点击事件
 */
graph.on('node:click', (e) => {
    const item = e.item;
    console.log(item._cfg.id);
})

graph.on('click', async (e) => {
    const examID = getQueryVariable("examID");
    const ImportantNode = await getData("WAnode", examID, "ni");
    for (let node of ImportantNode) {
        let nodeID = "node-" + node.identity;
        const item = graph.findById(nodeID);
        graph.updateItem(item, {
            style: {
                stroke: 'red',
                size: 80,
            },
        });
    }
})

/**
 * 首次加载载入
 */
window.onload = async function () {
    const examID = getQueryVariable("examID");
    if (examID === false){
        await getDatabaseFirst("200");
    }else{
        await getDatabaseFirst(examID);
    }
    //过滤无用边
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