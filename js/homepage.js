let nodes = [];
let edges = [];

const config = {
    ip: 'http://' + window.location.hostname.toString(),
    port: 3000,
}


/**
 * 异步实现Neo4j查询
 * @param para 查询语句
 * @param key 查询关键字段
 * @return {Promise<any>} 以期约方式返回Neo4j查询结果
 */
async function getData(para, key) {
    return new Promise((resolve, reject) => {
        let novelist = []
        axios.get(`${config.ip}:${config.port}/node?query=${para}&key=${key}`)
            .then(function (response) {
                novelist = response.data
                // console.log(novelist);
                resolve(novelist);
            })
            .catch(function (err) {
                console.log(err);
                reject(new Error(err));
            });
    });
}

/**
 * 异步实现网页首次启动时的默认查询
 */
async function getDatabaseFirst() {
    const person_history = {
        category: 'DPerson',
        search_type: 'name'
    };
    let set = new Set();
    let HPerson_Teams = await getData(`MATCH (n:${person_history.category}) RETURN n LIMIT 100`, `n`);
    let HPerson_Relation = await getData(`MATCH (P1:${person_history.category})-[r]-(P2:${person_history.category}) RETURN r `, "r");
    //Neo4j查询结果转换为G6的数据格式
    for (let node of HPerson_Teams) {
        nodes.push({
            id: "node-" + node.identity.low,
            value: {
                type: node.labels[0],
                ...node.properties
            },
            label: node.properties.name.length > 4 ? node.properties.name.substring(0, 4) + "..." : node.properties.name,
            name: node.properties.name,
            type: node.labels[0],
            // ...nodeConfig[node.labels[0]]
        })
    }
    for (let relation of HPerson_Relation) {
        let edgeName = "edge-" + relation.start.low + "-" + relation.end.low;
        if (set.has(edgeName)) {
            continue;
        } else {
            set.add(edgeName);
        }
        edges.push({
            id: "edge-" + relation.start.low + "-" + relation.end.low,
            source: "node-" + relation.start.low,
            target: "node-" + relation.end.low,
            label: relation.type.length > 4 ? relation.type.substring(0, 4) + "..." : relation.type,
            name: relation.type,
            // ...edgeConfig[relation.type]
        });
    }
}

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
        size: 42,
        color: '#5B8FF9',
        //TODO: 后期实现边和点的美化
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