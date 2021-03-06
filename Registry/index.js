const express = require('express');

// create express app
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome!"});
});

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});