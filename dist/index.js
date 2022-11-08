"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.regexp.to-string.js");
var _function = _interopRequireWildcard(require("./function.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
let nodes = [];
let edges = [];
let HPerson_weight = {};
//提前拉取两个非敏感数据文件
let getWeight = await (0, _function.default)("sql", "getAllUsers", "user");
let getNodeJson = await (0, _function.default)("nodeJSON", "node_information", "n");
for (let person of getWeight) {
  HPerson_weight[person.name] = person.weight;
}
const examID = (0, _function.getQueryVariable)("examID");

/**
 * 异步实现网页首次启动时的默认查询
 */
async function getDatabaseFirst(examID) {
  let setNodes = new _set.default();
  let setEdges = new _set.default();
  let HPerson_Teams;
  let HPerson_Relation;
  if (examID === "200") {
    HPerson_Teams = await (0, _function.default)("node", "selectPeople", "n");
    HPerson_Relation = await (0, _function.default)("node", "selectRelation", "r");
  } else {
    HPerson_Teams = await (0, _function.default)("WAnode", examID, "n");
    HPerson_Relation = await (0, _function.default)("WAnode", examID, "r");
  }

  //Neo4j查询结果转换为G6的数据格式
  for (let node of HPerson_Teams) {
    let nodeID = "node-" + node.identity;
    if (setNodes.has(nodeID)) {
      continue;
    } else {
      setNodes.add(nodeID);
    }
    nodes.push({
      id: "node-" + node.identity,
      value: _objectSpread({
        type: node.labels[0]
      }, node.properties),
      // label: node.properties.name.length > 4 ? node.properties.name.substring(0, 4) + "..." : node.properties.name,
      label: node.properties.name,
      name: node.properties.name,
      mysqlId: node.properties.id,
      type: node.labels[0]
      // ...nodeConfig[node.labels[0]]
    });
  }

  for (let relation of HPerson_Relation) {
    // 边去重
    let edgeName = "edge-" + relation.start + "-" + relation.end;
    if (setEdges.has(edgeName)) {
      continue;
    } else {
      setEdges.add(edgeName);
    }
    edges.push({
      id: "edge-" + relation.start + "-" + relation.end,
      source: "node-" + relation.start,
      target: "node-" + relation.end,
      label: relation.type.length > 4 ? relation.type.substring(0, 4) + "..." : relation.type,
      name: relation.type
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
  //鼠标点击实体上后调用
  trigger: 'click',
  fixToNode: [1, 0.5],
  itemTypes: ['node'],
  getContent: e => {
    var _context;
    //创新新的内容框 向内部填入HTML内容
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const model = e.item.getModel();
    //if (e.item.getType() === 'node') {}
    outDiv.innerHTML = (0, _concat.default)(_context = "".concat(model.name, " : ")).call(_context, HPerson_weight[model.name]);
    let node_id = model.mysqlId;
    //配合传入的JSON文件获得相关信息 不从数据库内拉取数据
    //解决G6 tooltip不支持异步的问题
    let node_obj = (0, _find.default)(getNodeJson).call(getNodeJson, function (obj) {
      return obj.id === node_id;
    });
    let node_txt = node_obj.id;
    let node_img = "https://github-ccp101.oss-us-west-1.aliyuncs.com/history.jpg";
    console.log(node_obj);
    outDiv.innerHTML += "<br>";
    outDiv.innerHTML += node_txt;
    outDiv.innerHTML += "<br>";
    outDiv.innerHTML += "<img src='" + node_img + "'>";
    return outDiv;
  }
});
const showPropertyEdge = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  //鼠标浮动到实体上就调用
  trigger: 'mousemove',
  fixToNode: [1, 0.5],
  itemTypes: ['edge'],
  getContent: e => {
    var _context2;
    //创新新的内容框 向内部填入HTML内容
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const source = e.item.getSource();
    const target = e.item.getTarget();
    outDiv.innerHTML = (0, _concat.default)(_context2 = "\u6765\u6E90\uFF1A".concat(source.getModel().name, "<br/>\u53BB\u5411\uFF1A")).call(_context2, target.getModel().name);
    return outDiv;
  }
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
    default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas', 'activate-relations']
  },
  layout: {
    type: 'force',
    center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
    preventOverlap: true,
    linkDistance: 180
  },
  plugins: [showPropertyNode, showPropertyEdge, grid, minimap],
  defaultNode: {
    size: 60,
    color: '#5B8FF9'
  },
  defaultEdge: {
    size: 3,
    color: '#4561d3',
    type: 'quadratic',
    labelCfg: {
      style: {
        fill: '#ddd',
        stroke: ''
      }
    },
    style: {
      endArrow: true
      // startArrow: true
    }
  }
});

// 在图上绑定事件点击事件
// graph.on('node:click', async (e) => {
//     const item = e.item;
//     console.log(item._cfg.id);
// })
graph.on('node:dblclick', async e => {
  const item = e.item;
  console.log(item._cfg.id);
  window.location.href = "../index.html?examID=" + item._cfg.id;
});
// 在第一次渲染图之前渲染需要强调的节点与边
graph.on('beforerender', async e => {
  if (examID !== false) {
    const examID = (0, _function.getQueryVariable)("examID");
    const ImportantNode = await (0, _function.default)("WAnode", examID, "ni");
    const ImportantRelation = await (0, _function.default)("WARelation", examID, "r");
    for (let node of ImportantNode) {
      let nodeID = "node-" + node.identity;
      const item = graph.findById(nodeID);
      graph.updateItem(item, {
        style: {
          stroke: 'red',
          fill: 'orange',
          size: 80
        }
      });
    }
    for (let rel of ImportantRelation) {
      let relID = "edge-" + rel.start + "-" + rel.end;
      const item = graph.findById(relID);
      graph.updateItem(item, {
        style: {
          stroke: 'red',
          size: 80
        }
      });
    }
  }
});

/*
* 程序主入口 第一次运行页面时调用该初始化函数
* 首先判断是主页直接访问或错题的图谱访问，获得不同数据
* 注意：windows.onload存在BUG，于部分浏览器上若无法正常发送请求(请求预检失败)
* 则本函数不会被调用 并且直接不执行相关的功能
* */
window.onload = async function () {
  if (examID === false) {
    await getDatabaseFirst("200");
  } else {
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
    if ((0, _includes.default)(nodeList).call(nodeList, leftNode) && (0, _includes.default)(nodeList).call(nodeList, rightNode)) {
      edgesReal.push(edge);
    }
  }
  graph.data({
    "nodes": nodes,
    "edges": edgesReal
  });
  graph.render();
};