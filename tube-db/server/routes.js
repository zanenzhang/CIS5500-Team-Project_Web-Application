// Routes are Complete; however
// TODO: Check all routes implimentation adhears to all cases described in instructions doc

const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
//const { connect } = require('./server');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the tubeDB server!`)
    } else {
        res.send(`Hello! Welcome to the tubeDB server!`)
    }
}

// ********************************************
//             CHANNEL-SPECIFIC ROUTES
// ********************************************

// Route 1 (handler)
async function channel(req, res) {

    if (req.query.name){
        connection.query(
            `
            SELECT channel_title, country, subscribers
            FROM TOP_YOUTUBE_CHANNELS
            Where channel_name = "${req.query.name}" 
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }
}

async function home_videos(req, res) {

    country = req.query.country
    pageCount = req.query.pageCount
    limit = pageCount * 20

    finalQuery = `SELECT video_id, title, trending_date, likes, thumbnail_link   
    FROM TOP_TRENDING_VIDEOS WHERE country='${country}' LIMIT ${limit}'
    `
    
    connection.query(finalQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    hello,
    channel
}