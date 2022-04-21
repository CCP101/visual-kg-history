window.onload = async function() {
    const person_info = {
        category: 'Person',
        search_type: 'name'
    };
    const movie_info = {
        category: 'Movie',
        search_type: 'title'
    };
    // 电影数据
    let Person_Teams = await getData(`MATCH (n:${person_info.category}) RETURN n.${person_info.search_type}`,person_info.search_type);
    let Movie_Teams = await getData(`MATCH (n:${movie_info.category}) RETURN n.${movie_info.search_type}`,movie_info.search_type);
    let p = $.map(Person_Teams, function(team) {
        return {
            value: team,
            data: person_info
        };
    });
    let m = $.map(Movie_Teams, function(team) {
        return {
            value: team,
            data: movie_info
        };
    });
    let teams = p.concat(m);
    console.log(teams)

    // 测试打印代码
    // for (let person in HPerson_Teams){
    //     console.log(HPerson_Teams[person])
    //     $('#entity').append(`<button class="entity_btn" name='${HPerson_Teams[person]}'>'${HPerson_Teams[person]}'<b>`);
    // }
}