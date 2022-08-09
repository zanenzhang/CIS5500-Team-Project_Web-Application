// Routes are Complete; however
// TODO: Check all routes implimentation adhears to all cases described in instructions doc

const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const { query } = require('express');
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

// CS Route 1 (handler)
async function channel(req, res) {

    if (req.query.ranking){
        connection.query(
            `
            SELECT *
            FROM TOP_YOUTUBE_CHANNELS
            Where channel_rank = "${req.query.ranking}" 
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }
};

//  Selected Channel 5 most recent trending videos (with aggregation) (handler)
// this runs in DG in about 100 seconds without optimization.
async function selected_channel_recent_trending(req, res) {

    if (req.query.ranking){
        connection.query(
            `
            WITH Selected_Channel AS (
                SELECT channel_title
                FROM TOP_YOUTUBE_CHANNELS
                WHERE channel_rank = ${req.query.ranking}
            )SELECT V.title AS title, V.published_at AS published, V.video_id AS video_id,
                    MAX(V.view_count) AS views, MAX(V.trending_date) AS trend_stop,
                    MIN(V.trending_date) AS trend_start, GROUP_CONCAT(DISTINCT V.country) AS countries
            FROM TOP_TRENDING_VIDEOS AS V JOIN Selected_Channel AS C
            WHERE V.channel_title = C.channel_title
            GROUP BY title
            ORDER BY V.published_at DESC
            LIMIT 5;
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }
};

// CS Route 2 (handler) - get the top 100 channels by rank no filters
async function find_channels(req, res) {

    //switch depending on recieved params
    let countryLangProdClause = ""

    if(req.query.country !== 'Select' && req.query.country !== 'undefined'){
        countryLangProdClause += ` AND country = '${req.query.country}'`
    }

    if(req.query.language !== 'Select' && req.query.language !== 'undefined'){
        countryLangProdClause += ` AND channel_language = '${req.query.language}'`
    }

    if(req.query.producer !== 'Select' && req.query.producer !== 'undefined'){
        countryLangProdClause += ` AND producer_type = '${req.query.producer}'`
    }

    //  SELECT ROW_NUMBER() OVER (ORDER BY subscribers DESC) Ranking this is a good idea, but breaks other items

    if (req.query.searchString === 'undefined'){
        console.log("Why?")
        connection.query(
            `
            SELECT channel_rank AS Ranking, 
                channel_title AS Title, country, channel_language AS language, subscribers, views
            FROM TOP_YOUTUBE_CHANNELS
            ORDER BY subscribers DESC
            LIMIT 0, 100;
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    
    } else if (req.query.searchString === "null"){
        connection.query(
            `
            SELECT channel_rank AS Ranking, channel_title AS Title, country, channel_language AS language, subscribers, views
            FROM TOP_YOUTUBE_CHANNELS
            WHERE channel_rank >= ${req.query.rankingLow} AND channel_rank <= ${req.query.rankingHigh}
                AND subscribers >= ${req.query.subsLow} AND subscribers <= ${req.query.subsHigh} AND 
                library_size >= ${req.query.libSizeLow} AND library_size <= ${req.query.libSizeHigh} AND
                views_per_video >= ${req.query.viewsPerLow} AND views_per_video <= ${req.query.viewsPerHigh} AND
                view_growth_rate_l3m >= ${req.query.viewsGrowthLow} AND view_growth_rate_l3m <= ${req.query.viewsGrowthHigh} AND
                subscriber_growth_rate_l3m >= ${req.query.subsGrowthLow} AND subscriber_growth_rate_l3m<= ${req.query.subsGrowthHigh} ${countryLangProdClause}
            ORDER BY subscribers DESC
            LIMIT 0, 100;
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    
    } else {     
        connection.query(
            `
            SELECT channel_rank AS Ranking, channel_title AS Title, country, channel_language AS language, subscribers, views
            FROM TOP_YOUTUBE_CHANNELS
            WHERE channel_title LIKE '%${req.query.searchString}%' AND channel_rank >= ${req.query.rankingLow} AND 
                channel_rank <= ${req.query.rankingHigh} AND views >= ${req.query.viewsLow} AND views <= ${req.query.viewsHigh} AND
                subscribers >= ${req.query.subsLow} AND subscribers <= ${req.query.subsHigh} AND 
                library_size >= ${req.query.libSizeLow} AND library_size <= ${req.query.libSizeHigh} AND
                views_per_video >= ${req.query.viewsPerLow} AND views_per_video <= ${req.query.viewsPerHigh} AND
                view_growth_rate_l3m >= ${req.query.viewsGrowthLow} AND view_growth_rate_l3m <= ${req.query.viewsGrowthHigh} AND
                subscriber_growth_rate_l3m >= ${req.query.subsGrowthLow} AND subscriber_growth_rate_l3m<= ${req.query.subsGrowthHigh} ${countryLangProdClause}
            ORDER BY subscribers DESC
            LIMIT 0, 100;
            `, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }

    
    
};

// ********************************************
//             VIDEO-SPECIFIC ROUTES
// ********************************************


async function trending_videos(req, res) {

    let country = req.query.country
    let pageCount = req.query.page
    let limit = pageCount * 20
    let pagePull = limit * 10
    let offset = req.query.offset

    let trendStart = req.query.trendstart
    let trendStop = req.query.trendstop
    let publishStart = req.query.publishstart
    let publishStop = req.query.publishstop

    let videoTitle = req.query.video
    let channelTitle = req.query.channel
    let tag = req.query.tag

    let viewsLow = req.query.viewslow
    let viewsHigh = req.query.viewshigh
    let likesLow = req.query.likeslow
    let likesHigh = req.query.likeshigh
    let dislikesLow = req.query.dislikeslow
    let dislikesHigh = req.query.dislikeshigh
    let commentsLow = req.query.commentslow
    let commentsHigh = req.query.commentshigh

    searchClauses = "";

    if (publishStart !='' && publishStop != '' && publishStart !='undefined' && publishStop !='undefined')  {
        searchClauses += `AND published_at BETWEEN '${publishStart}' AND '${publishStop}' `} 
    if (trendStart != '' && trendStop != '' && trendStart != 'undefined' && trendStop != 'undefined')  {
        searchClauses += `AND trending_date BETWEEN '${trendStart}' AND '${trendStop}' `} 
    if (videoTitle != '' && videoTitle != 'undefined')  {
        searchClauses += `AND title LIKE '${videoTitle}%' `} 
    if (channelTitle != '' && channelTitle != 'undefined')  {
        searchClauses += `AND channel_title LIKE '${channelTitle}%' `} 
    if (tag != '' && tag != 'undefined')  {
        searchClauses += `AND tags LIKE '%${tag}%' `} 
    if (viewsHigh != 0){
        searchClauses += `AND view_count BETWEEN ${viewsLow} AND ${viewsHigh} `} 
    if (likesHigh != 0){
        searchClauses += `AND likes BETWEEN ${likesLow} AND ${likesHigh} `} 
    if (dislikesHigh != 0){
        searchClauses += `AND dislikes BETWEEN ${dislikesLow} AND ${dislikesHigh} `} 
    if (commentsHigh != 0){
        searchClauses += `AND comment_count BETWEEN ${commentsLow} AND ${commentsHigh} `} 
     

    let firstLeg = `WITH Videos AS (
        SELECT video_id, title, thumbnail_link
        FROM TOP_TRENDING_VIDEOS
        WHERE country = '${country}' `

        
    let secondLeg = `LIMIT ${pagePull}
        OFFSET ${offset}
    ) SELECT video_id, title as video_title, thumbnail_link
        FROM Videos
        GROUP BY video_id
        Limit ${limit};
    `

    finalQuery = firstLeg + searchClauses + secondLeg

    console.log("Final query: ")
    console.log(finalQuery)

    connection.query(finalQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function singleVideo(req, res){
    videoid = req.query.videoid

    finalQuery = `
    SELECT title as video_title, published_at AS published, video_id,
            MAX(view_count) AS views, MAX(trending_date) AS trend_stop,
            MIN(trending_date) AS trend_start, thumbnail_link, likes,
            GROUP_CONCAT(DISTINCT country) AS countries, channel_title,
            description, tags
    FROM TOP_TRENDING_VIDEOS
    WHERE video_id = '${videoid}'
    GROUP BY video_id
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
    channel,
    find_channels,
    trending_videos,
    selected_channel_recent_trending,
    singleVideo,
}