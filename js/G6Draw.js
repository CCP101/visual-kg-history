// G6.registerBehavior('node-activate', {
//     getDefaultCfg() {
//         return {
//             multiple: true
//         };
//     },
//     getEvents() {
//         return {
//             'node:mouseenter': 'onMouseenter',
//             'node:dblclick': 'onDblclick'
//         };
//     },
//     onMouseenter(e) {
//
//         $('#proul').children().remove();
//         var pros = $.extend({}, e.item.getModel().properties);
//
//         for (var p in pros) {
//             $('#proul').append(
//                 '<ul class="pro_slider"><li><b>' + p + ' : </b> ' + pros[p] + '</li>')
//         };
//     },
//
//
//     onDblclick(e) {
//         readNeo4j(e.item.getModel(), 2)
//         // console.log(e.item.getModel());
//     }
// });
//
//
//
// const graph = new G6.Graph({
//     container: 'mountNode',
//     width: window.screen.availWidth,
//     height: document.body.clientHeight,
//     modes: {
//         default: ['drag-node', 'node-activate'],
//     },
//     layout: {
//         type: 'force',
//         center: [window.screen.availWidth * 0.45, document.body.clientHeight * 0.4],
//         preventOverlap: true,
//         linkDistance: 180,
//     },
//
//     defaultNode: {
//         size: 28,
//         color: '#5B8FF9',
//         style: {
//             lineWidth: 2,
//             fill: '',
//             stroke: '',
//         },
//         label: 'node-label',
//         labelCfg: {
//             position: 'top',
//             style: {
//                 fill: '#ddd',
//             },
//         }
//
//     },
//     defaultEdge: {
//         size: 1,
//         color: '#aaa',
//         label: 'node-label',
//         labelCfg: {
//             style: {
//                 fill: '#ddd',
//                 stroke: '',
//             },
//         },
//     }
// });
//
//
// function changeStyle(data) {
//     const nodes = data.nodes;
//
//     nodes.forEach((node) => {
//
//         if (!node.style) {
//             node.style = {};
//         }
//         node.style = {
//             fill: color_set[node.id % color_set.length],
//             stroke: '',
//         };
//
//         switch (
//             node.properties.type // Configure the graph based on the 'type' of nodes
//             ) {
//             case ('Person'):
//             {
//                 node.size = 32;
//                 break;
//             }
//         }
//     });
// }
//
// function refreshDragedNodePosition(e) {
//     const model = e.item.get('model');
//     model.fx = e.x;
//     model.fy = e.y;
// }
// graph.on('node:dragstart', (e) => {
//     graph.layout();
//     refreshDragedNodePosition(e);
// });
// graph.on('node:drag', (e) => {
//     refreshDragedNodePosition(e);
// });