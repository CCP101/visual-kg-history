const nodes = [];
const edges = [];
import getData, {getQueryVariable} from './function.js';

const HPersonWeight = {};
// 提前拉取两个非敏感数据文件
const getWeight = await getData('sql', 'getAllUsers', 'user');
const getNodeJson = await getData('nodeJSON', 'node_information', 'n');

for (const person of getWeight) {
  HPersonWeight[person.name] = person.weight;
}

const examID = getQueryVariable('examID');

/**
 * 异步实现网页首次启动时的默认查询
 * @param {string} examID 考试ID
 */
async function getDatabaseFirst(examID) {
  const setNodes = new Set();
  const setEdges = new Set();
  let HPersonTeams;
  let HPersonRelation;
  if (examID === '200') {
    HPersonTeams = await getData('node', 'selectPeople', 'n');
    HPersonRelation = await getData('node', 'selectRelation', 'r');
  } else {
    HPersonTeams = await getData('WAnode', examID, 'n');
    HPersonRelation = await getData('WAnode', examID, 'r');
  }

  // Neo4j查询结果转换为G6的数据格式
  for (const node of HPersonTeams) {
    const nodeID = 'node-' + node.identity;
    if (setNodes.has(nodeID)) {
      continue;
    } else {
      setNodes.add(nodeID);
    }
    nodes.push({
      id: 'node-' + node.identity,
      value: {
        type: node.labels[0],
        ...node.properties,
      },
      // label: node.properties.name.length > 4 ?
      // node.properties.name.substring(0, 4) + "..." : node.properties.name,
      label: node.properties.name,
      name: node.properties.name,
      mysqlId: node.properties.id,
      type: node.labels[0],
      // ...nodeConfig[node.labels[0]]
    });
  }
  for (const relation of HPersonRelation) {
    // 边去重
    const edgeName = 'edge-' + relation.start + '-' + relation.end;
    if (setEdges.has(edgeName)) {
      continue;
    } else {
      setEdges.add(edgeName);
    }
    edges.push({
      id: 'edge-' + relation.start + '-' + relation.end,
      source: 'node-' + relation.start,
      target: 'node-' + relation.end,
      label: relation.type.length > 4 ?
        relation.type.substring(0, 4) + '...' : relation.type,
      name: relation.type,
      // ...edgeConfig[relation.type]
    });
  }
}

/*
* G6 Tooltip工具 用于显示节点信息
* ISSUE#3850 G6无法在Tooltip内部实现同步异步操作 推测应为是资源限制
* 使用JSON文件解决 继续走Axios拿数据 但不是同步异步过程
*/
const showPropertyNode = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  // 鼠标点击实体上后调用
  trigger: 'click',
  fixToNode: [1, 0.5],
  itemTypes: ['node'],
  getContent: (e) => {
    // 创新新的内容框 向内部填入HTML内容
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const model = e.item.getModel();
    // if (e.item.getType() === 'node') {}
    outDiv.innerHTML = `${model.name} : ${HPersonWeight[model.name]}`;
    const nodeId = model.mysqlId;
    // 配合传入的JSON文件获得相关信息 不从数据库内拉取数据
    // 解决G6 tooltip不支持异步的问题
    const nodeObj = getNodeJson.find(function (obj) {
      return obj.id === nodeId;
    });
    const nodeTxt = nodeObj.id;
    const nodeImg = 'https://github-ccp101.oss-us-west-1.aliyuncs.com/history.jpg';
    console.log(nodeObj);
    outDiv.innerHTML += '<br>';
    outDiv.innerHTML += nodeTxt;
    outDiv.innerHTML += '<br>';
    outDiv.innerHTML += '<img src=\'' + nodeImg + '\'>';
    return outDiv;
  },
});


const showPropertyEdge = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  // 鼠标浮动到实体上就调用
  trigger: 'mousemove',
  fixToNode: [1, 0.5],
  itemTypes: ['edge'],
  getContent: (e) => {
    // 创新新的内容框 向内部填入HTML内容
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const source = e.item.getSource();
    const target = e.item.getTarget();
    outDiv.innerHTML = `来源：${source.getModel().name}
        <br/>去向：${target.getModel().name}`;
    return outDiv;
  },
});

/**
 * 配置图属性
 * 图基本配置、模式、样式、插件、默认点边样式
 */
const minimap = new G6.Minimap();
// const grid = new G6.Grid();
const graph = new G6.Graph({
  container: 'mountNode',
  width: window.innerWidth,
  height: window.innerHeight * 0.75,
  animate: true,
  // animateCfg: {
  //   duration: 5000, // Number，一次动画的时长
  //   easing: 'linearEasing', // String，动画函数
  // },
  modes: {
    default: ['click-select', 'drag-canvas',
      'drag-node', 'zoom-canvas', 'activate-relations'],
  },
  layout: {
    type: 'force',
    center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
    preventOverlap: true,
    linkDistance: 180,
  },
  plugins: [showPropertyNode, showPropertyEdge, minimap],
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
        fill: '#4561d3',
        stroke: '',
      },
    },
    style: {
      endArrow: true,
      // startArrow: true
    },
  },
});


// 在图上绑定事件点击事件
// graph.on('node:click', async (e) => {
//     const item = e.item;
//     console.log(item._cfg.id);
// })
graph.on('node:dblclick', async (e) => {
  const item = e.item;
  console.log(item._cfg.id);
  window.location.href = '../index.html?examID=' + item._cfg.id;
});
// 在第一次渲染图之前渲染需要强调的节点与边
// 考虑到错误答案可能是随机选用，因此不强调错误边，除强调的正确边其余全部为普通颜色
graph.on('beforerender', async (e) => {
  if (examID !== false) {
    const examID = getQueryVariable('examID');
    const ImportantNode = await getData('WAnode', examID, 'ni');
    const ImportantRelation = await getData('WARelation', examID, 'r');
    for (const node of ImportantNode) {
      const nodeID = 'node-' + node.identity;
      const item = graph.findById(nodeID);
      graph.updateItem(item, {
        style: {
          stroke: 'red',
          fill: 'orange',
          size: 80,
        },
      });
    }
    for (const rel of ImportantRelation) {
      const relID = 'edge-' + rel.start + '-' + rel.end;
      const item = graph.findById(relID);
      graph.updateItem(item, {
        style: {
          stroke: 'green',
          size: 80,
        },
      });
    }
  }
});

/**
 * 程序主入口 第一次运行页面时调用该初始化函数
 * 首先判断是主页直接访问或错题的图谱访问，获得不同数据
 * 注意：windows.onload存在BUG，于部分浏览器上若无法正常发送请求(请求预检失败)
 * 则本函数不会被调用 并且直接不执行相关的功能
 * */
async function initNeo4j() {
  if (examID === false) {
    await getDatabaseFirst('200');
  } else {
    await getDatabaseFirst(examID);
  }
  // 过滤无用边
  const nodeList = [];
  for (const node of nodes) {
    nodeList.push(node.id.toString().replace('node-', ''));
  }
  const edgesReal = [];
  for (const edge of edges) {
    const leftNode = edge.source.toString().replace('node-', '');
    const rightNode = edge.target.toString().replace('node-', '');
    if (nodeList.includes(leftNode) && nodeList.includes(rightNode)) {
      edgesReal.push(edge);
    }
  }
  graph.data({
    'nodes': nodes,
    'edges': edgesReal,
  });
  graph.render();
}

initNeo4j().then((r) => {
});
