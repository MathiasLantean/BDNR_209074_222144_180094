const cassandra = require('cassandra-driver');
const uid = require('uuid');
const Uuid = require('cassandra-driver').types.Uuid;
const authProvider = new cassandra.auth.PlainTextAuthProvider(
    process.env.CASSANDRA_USER,
    process.env.CASSANDRA_PASS,
);
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    authProvider,
    keyspace: 'bdnr',
});

module.exports = class Repository {

    async AddActivity(data) {
        const query = 'INSERT INTO activity (activityid, title, date, userid) VALUES (?, ?, ?, ?)';
        let title = data.title;
        let userid = data.userid.toString();
        let activityid = Uuid.random().toString();
        let ts = Date.now();
        let date = new Date(ts);

        const params = [activityid, title, date, userid];
        await client.execute(query, params, { prepare: true });

        return activityid;
    }

    async AddPhoto(data) {
        let activityid = await this.AddActivity(data);
        const query = 'INSERT INTO photo (activityid, url, comment) VALUES (?, ?, ?)';
        const params = [activityid, data.url, data.comment];

        return await client.execute(query, params, { prepare: true });
    }

    async AddPublication(data) {

    }

    async Get(data) {
        let activity = await getActivity(data.activityid);
        let result = [];
        if (activity != []) {
            result.push(activity);
            const query1 = 'SELECT * FROM photos WHERE activityid   = ?;';
            const query2 = 'SELECT * FROM publications WHERE activityid   = ?;';
            const query3 = 'SELECT * FROM manuals WHERE activityid   = ?;';
            const query4 = 'SELECT * FROM automatics WHERE activityid   = ?;';
            const queries = [
                { query: query1, params: [data.activityid] },
                { query: query2, params: [data.activityid] },
                { query: query3, params: [data.activityid] },
                { query: query4, params: [data.activityid] }
            ];
            client.batch(queries, { prepare: true })
            result.push()
        }
        return result;
    };
}

async function getActivity(data) {
    const query = 'SELECT * FROM activities WHERE activityId   = ?;';
    const result = await client.execute(query, data, { prepare: true });
    return result;
}
