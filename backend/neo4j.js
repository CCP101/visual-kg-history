function neo4jConnect(query) {
    return new Promise((resolve) => {
        console.log(resolve);
        let neo4j = require('neo4j-driver');
        let driver = neo4j.driver(
            'neo4j://localhost',
            neo4j.auth.basic('neo4j', 'neo4j'));
        let session = driver.session({defaultAccessMode: neo4j.session.READ});
        session
            .run(query)
            .subscribe({
                onKeys: keys => {
                    console.log(keys)
                },
                onNext: record => {
                    console.log(record.get('n.name'))
                },
                onCompleted: (result) => {
                    resolve(result);
                    session.close() // returns a Promise
                },
                onError: error => {
                    console.log(error)
                }
            })
    });
}
module.exports.neo4jConnect = neo4jConnect

