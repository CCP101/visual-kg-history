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

async function getDatabaseFirst() {
    const person_history = {
        category: 'DPerson',
        search_type: 'name'
    };
    let HPerson_Teams = await getData(`MATCH (n:${person_history.category}) RETURN n`,`n`);
    let HPerson_Relation = await getData(`MATCH (P1:DPerson)-[r]-(P2:DPerson) RETURN r `,"r");
    console.log(HPerson_Relation)
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

let nodes = [];
let edges = [];

window.onload = async function() {
    await getDatabaseFirst();
    // console.log(nodes)
    console.log(edges)








    // for (let entity in entity_list) {
    //     $('#entity').append(`<button class="entity_btn" onclick="readNeo4j(this,0)" name='${entity_list[entity][0]}'><b>${entity_list[entity][0]}</b> (${entity_list[entity][1]})</button>`);
    //     $('#entity_rela').append(`<button class="entity_rela_btn" onclick="readNeo4j(this,1)" name='${entity_list[entity][0]}'><b>${entity_list[entity][0]}</b> (${entity_list[entity][1]})</button>`);
    // }
    // for (let relation in rela_list) {
    //     $('#relation').append(`<button class="rela_btn" onclick="readNeo4j(this,4)" name='${rela_list[relation][0]}'><b>${rela_list[relation][0]}</b> (${rela_list[relation][1]})</button>`);
    // }
};




