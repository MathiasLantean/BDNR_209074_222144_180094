const cassandra = require('cassandra-driver');
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

    

    async AddPhoto(data) {
        let userid = data.userid.toString();
        let activityid = Uuid.random().toString();
        let ts = Date.now();
        let date = new Date(ts);
        const query = 'INSERT INTO activity (activityid, title, date, userid, url, comment) VALUES (?,?,?,?, ?, ?)';
        const params = [activityid, data.title, date, userid, data.url, data.comment];

        return await client.execute(query, params, { prepare: true });
    }

    async AddPublication(data) {
        let userid = data.userid.toString();
        let activityid = Uuid.random().toString();
        let ts = Date.now();
        let date = new Date(ts);
        const query = 'INSERT INTO activity (activityid, title, date, userid, text) VALUES (?, ?, ?, ?, ?)';
        const params = [activityid, data.title, date, userid, data.text];

        return await client.execute(query, params, { prepare: true });
    }

    async AddAutomatic(data) {
        let userid = data.userid.toString();
        let activityid = Uuid.random().toString();
        let ts = Date.now();
        let date = new Date(ts);
        let query = 'INSERT INTO activity (activityid, title, date, userid, distance, duration, location, description, averageSpeed) VALUES (?, ?, ?, ?,  ?, ?, ?, ?, ?)';
        let params = [activityid, data.title, date, userid, data.distance, data. duration, 
            data.location, data.description, data.averagespeed];

        if(data.sensor != undefined || data.sensor != null){
            let query = 
            'INSERT INTO activity (activityid, title, date, userid, distance, duration, location, description, averageSpeed, cadence, calories) VALUES (?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?)';
            let params = [activityid, data.title, date, userid, data.distance, data. duration, 
                data.location, data.description, data.averagespeed,
                data.sensor.cadence, data.sensor.calories];
        }
        return await client.execute(query, params, { prepare: true });
    }

    async AddManual(data) {
        let userid = data.userid.toString();
        let activityid = Uuid.random().toString();
        let ts = Date.now();
        let date = new Date(ts);
        const query = 'INSERT INTO activity (activityid, title, date, userid, distance, duration, difficulty, photo, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [activityid, data.title, date, userid, data.distance, data.duration,
            data.difficulty, data.photo, data.description];

        return await client.execute(query, params, { prepare: true });
    }

    

    async Get(data) {
        let activity = await getActivity(data);
        return activity;
    };

    async GetAll(){
        const queryActivity = 'Select * from activity';
        let queryList = await client.execute(queryActivity, [], { prepare: true });
        var rows = queryList.rows;
        let values =  Object.values(rows);
        for (var i=0; i<values.length; i++){
            let value = values[i];
            Object.keys(value).forEach(index => (!value[index] && value[index] !== undefined) && delete value[index]);
        }
        return rows
    }
}

async function getActivity(data) {
    const query = `SELECT * FROM activity WHERE activityid=? ALLOW FILTERING;`;
    const params = [data.activityid];
    const result = await client.execute(query, params, { prepare: true });
    Object.keys(result).forEach(index => (!result[index] && result[index] !== undefined) && delete result[index]);
    return result;
}