const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Routes //

app.get('/home', routes.home_videos);
app.get('/hello', routes.hello);
// Channel Specific Routes //
// Route 1 - register as GET 
app.get('/channel', routes.channel);
app.get('/find_channels', routes.find_channels);


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;