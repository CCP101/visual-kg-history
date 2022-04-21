let nodes = [];
let edges = [];

const config = {
    ip: 'http://' + window.location.hostname.toString(),
    port: 3000,
}

const color_set = ["#dd6b66",
    "#759aa0",
    "#e69d87",
    "#8dc1a9",
    "#ea7e53",
    "#eedd78",
    "#73a373",
    "#73b9bc",
    "#7289ab",
    "#91ca8c",
    "#f49f42"
]

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
            .then(function(response){
                novelist = response.data
                // console.log(novelist);
                resolve(novelist);
            })
            .catch(function(err){
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
    let HPerson_Teams = await getData(`MATCH (n:${person_history.category}) RETURN n LIMIT 200`,`n`);
    let HPerson_Relation = await getData(`MATCH (P1:DPerson)-[r]-(P2:DPerson) RETURN r LIMIT 200`,"r");
    //Neo4j查询结果转换为G6的数据格式
    for (let node of HPerson_Teams){
        nodes.push({
            id: "node-" + node.identity.low,
            value: {
                type:node.labels[0],
                ...node.properties
            },
            label: node.properties.name.length > 4 ? node.properties.name.substring(0, 4) + "..." : node.properties.name,
            name: node.properties.name,
            type: node.labels[0],
            // ...nodeConfig[node.labels[0]]
        })
    }
    for (let relation of HPerson_Relation) {
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

G6.registerBehavior('node-activate', {
    getDefaultCfg() {
        return {
            multiple: true
        };
    },
    getEvents() {
        return {
            'node:mouseenter': 'onMouseenter',
            'node:dblclick': 'onDblclick'
        };
    },
    onMouseenter(e) {
        $('#proul').children().remove();
        let pros = $.extend({}, e.item.getModel().properties);

        for (let p in pros) {
            $('#proul').append(
                '<ul class="pro_slider"><li><b>' + p + ' : </b> ' + pros[p] + '</li>')
        }
    },
    //
    // onDblclick(e) {
    //     readNeo4j(e.item.getModel(), 2)
    //     // console.log(e.item.getModel());
    // }
});

const graph = new G6.Graph({
    container: 'mountNode',
    width: window.screen.availWidth,
    height: 800,
    modes: {
        default: ['drag-node', 'node-activate'],
    },
    layout: {
        type: 'force',
        center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
        preventOverlap: true,
        linkDistance: 180,
    },

    defaultNode: {
        size: 28,
        color: '#5B8FF9',
        style: {
            lineWidth: 2,
            fill: '',
            stroke: '',
        },
        label: 'node-label',
        labelCfg: {
            position: 'top',
            style: {
                fill: '#ddd',
            },
        }

    },
    defaultEdge: {
        size: 1,
        color: '#aaa',
        label: 'node-label',
        labelCfg: {
            style: {
                fill: '#ddd',
                stroke: '',
            },
        },
    }
});

/**
 * 查询实现顶部入口
 */
window.onload = async function() {
    await getDatabaseFirst();
    console.log(edges);
    graph.data({
        "nodes": nodes,
        "edges": edges
    });
    graph.render();
};
