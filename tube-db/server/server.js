const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const bodyParser = require('body-parser');


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


// Routes //

app.get('/trendingvideos', routes.trendingVideos);
app.get('/video', routes.singleVideo);
app.get('/gantt', routes.countryGantt);
// Channel Specific Routes //
// Route 1 - register as GET 
app.get('/channel', routes.channel);
app.get('/find_channels', routes.find_channels);
app.get('/selected_channel_recent_trending',routes.selected_channel_recent_trending);
app.get('/favorited',routes.favoritedVideos);
app.get('/recommendation',routes.recommendedVideos);
app.post('/', routes.insert);




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;