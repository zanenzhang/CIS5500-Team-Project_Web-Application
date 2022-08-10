const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Routes //

app.get('/trendingvideos', routes.trending_videos);
app.get('/hello', routes.hello);
app.get('/video', routes.singleVideo)
// Channel Specific Routes //
// Route 1 - register as GET 
app.get('/channel', routes.channel);
app.get('/find_channels', routes.find_channels);
app.get('/selected_channel_recent_trending',routes.selected_channel_recent_trending);
app.get('/recommendation',routes.recommendedVideos);


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;