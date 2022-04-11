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

window.onload = async function() {
    const person_info = {
        category: 'Person',
        search_type: 'name'
    };
    const movie_info = {
        category: 'Movie',
        search_type: 'title'
    };

    var Person_Teams = await getData(`MATCH (n:${person_info.category}) RETURN n.${person_info.search_type}`);
    var Movie_Teams = await getData(`MATCH (n:${movie_info.category}) RETURN n.${movie_info.search_type}`);
    var p = $.map(Person_Teams, function(team) {
        return {
            value: team,
            data: person_info
        };
    });
    for (var key in Movie_Teams) {
        console.log(key);
    }

    var m = $.map(Movie_Teams, function(team) {
        return {
            value: team,
            data: movie_info
        };
    });
    var teams = p.concat(m);
    console.log(teams)
    // Initialize autocomplete with local lookup:
    // sss
    $('#autocomplete').devbridgeAutocomplete({
        lookup: teams,

        minChars: 1,
        onSelect: function(suggestion) {
            console.log(suggestion.data);
            readNeo4j(suggestion, 3);

        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry.. Try other keywords...',
        groupBy: 'category'
    });

    var entity_list = await getData(`MATCH(n) RETURN distinct labels(n), count(n)`);
    var rela_list = await getData(`MATCH p=()-[r]->() RETURN distinct type(r), count(r)`);

    for (let entity in entity_list) {
        $('#entity').append(`<button class="entity_btn" onclick="readNeo4j(this,0)" name='${entity_list[entity][0]}'><b>${entity_list[entity][0]}</b> (${entity_list[entity][1]})</button>`);
        $('#entity_rela').append(`<button class="entity_rela_btn" onclick="readNeo4j(this,1)" name='${entity_list[entity][0]}'><b>${entity_list[entity][0]}</b> (${entity_list[entity][1]})</button>`);
    }
    for (let relation in rela_list) {
        $('#relation').append(`<button class="rela_btn" onclick="readNeo4j(this,4)" name='${rela_list[relation][0]}'><b>${rela_list[relation][0]}</b> (${rela_list[relation][1]})</button>`);
    }
};

async function getFromNeo4j(para) {
    return await axios.get(`${config.ip}:${config.port}/query?query=${para}`)
}

async function getData(para) {
    let neo4jData = await getFromNeo4j(para);
    return neo4jData.data.data
}