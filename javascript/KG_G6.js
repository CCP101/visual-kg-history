let nodes = [];
let edges = [];
import getData from './function.js';


/**
 * 异步实现网页首次启动时的默认查询
 */
async function getDatabaseFirst() {
    const person_history = {
        category: 'DPerson',
        search_type: 'name'
    };
    let set = new Set();
    let getWeight = await getData("sql",`SELECT * FROM \`people\``, 'weight');
    let HPerson_weight = {};
    for (let person of getWeight) {
        HPerson_weight[person.name] = person.weight;
    }
    //todo:前端不要直接发送请求，会暴露数据库，使用后端解决
    let HPerson_Teams = await getData("node",`MATCH (n:${person_history.category}) RETURN n LIMIT 100`, `n`);
    let HPerson_Relation = await getData("node",`MATCH (P1:${person_history.category})-[r]-(P2:${person_history.category}) RETURN r `, "r");
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

/**
 * 配置图属性
 */
const graph = new G6.Graph({
    container: 'mountNode',
    width: window.screen.availWidth,
    height: 800,
    modes: {
        default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas'],
    },
    layout: {
        type: 'force',
        center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
        preventOverlap: true,
        linkDistance: 180,
    },
    defaultNode: {
        size: 60,
        color: '#5B8FF9',
        //TODO: 后期实现边和点的美化 需要实现持久的动画效果
        //
        // style: {
        //     lineWidth: 2,
        //     fill: '',
        //     stroke: '',
        // },
        // label: 'node-label',
        // labelCfg: {
        //     position: 'top',
        //     style: {
        //         fill: '#ddd',
        //     },
        // }
    },
    defaultEdge: {
        size: 10,
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

/**
 * 官方文档中存在，但实际不可用，原因未知，使用单独绑定方法替代
 */
// G6.registerBehavior('node-activate', {
//     getDefaultCfg() {
//         return {
//             multiple: true
//         };
//     },
//     getEvents() {
//         return {
//             'node:mouseenter': 'onMouseenter',
//             'node:dblclick': 'onDblclick',
//             'node:click': 'onNodeClick'
//         };
//     },
//     onNodeClick(e) {
//         const graph = this.graph;
//         const item = e.item;
//         console.log(item);
//         if (item.hasState('active')) {
//             graph.setItemState(item, 'active', false);
//             return;
//         }
//         // this 上即可取到配置，如果不允许多个 'active'，先取消其他节点的 'active' 状态
//         if (!this.multiple) {
//             this.removeNodesState();
//         }
//         // 置点击的节点状态 'active' 为 true
//         graph.setItemState(item, 'active', true);
//     },
//     removeNodesState() {
//         graph.findAllByState('node', 'active').forEach(node => {
//             graph.setItemState(node, 'active', false);
//         });
//     }
// });


/**
 * 在图上绑定事件点击事件
 */
graph.on('node:click', (e) => {
    const item = e.item;
    console.log(item._cfg.id);
})

/**
 * 首次加载载入
 */
window.onload = async function () {
    await getDatabaseFirst();
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