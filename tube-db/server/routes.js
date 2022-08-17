// Routes are Complete; however
// TODO: Check all routes implimentation adhears to all cases described in instructions doc

const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const { query } = require('express');
const app = require('./server');
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

    var finalQuery = `
    WITH Selected_Channel AS (
        SELECT channel_title
        FROM TOP_YOUTUBE_CHANNELS
        WHERE channel_rank = ${req.query.ranking}
    )SELECT VI.title AS title, VI.published_at AS published, V.video_id AS video_id,
            MAX(V.view_count) AS views, MAX(V.trending_date) AS trend_stop,
            MIN(V.trending_date) AS trend_start, GROUP_CONCAT(DISTINCT V.country) AS countries
    FROM TOP_TRENDING_VIDEOS AS V JOIN VIDEOS AS VI ON V.video_id = VI.video_id JOIN Selected_Channel AS C
    ON VI.channel_title = C.channel_title
    GROUP BY title
    ORDER BY VI.published_at DESC
    LIMIT 5;
    `

    if (req.query.ranking){
        connection.query(
            finalQuery, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    console.log(finalQuery)
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
            WHERE channel_rank >= ${req.query.rankingLow} AND channel_rank <= ${req.query.rankingHigh} AND 
                views >= ${req.query.viewsLow} AND views <= ${req.query.viewsHigh} AND
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


async function trendingVideos(req, res) {

    let country = req.query.country
    let language = req.query.language
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
    let category = req.query.category

    let viewsLow = req.query.viewslow
    let viewsHigh = req.query.viewshigh
    let likesLow = req.query.likeslow
    let likesHigh = req.query.likeshigh
    let dislikesLow = req.query.dislikeslow
    let dislikesHigh = req.query.dislikeshigh
    let commentsLow = req.query.commentslow
    let commentsHigh = req.query.commentshigh

    let subscribersLow = req.query.subscriberslow
    let subscribersHigh = req.query.subscribershigh
    let libraryLow = req.query.librarylow
    let libraryHigh = req.query.libraryhigh

    searchClauses = "";

    let channelsCTE = `WITH Channels AS (
        SELECT channel_title FROM TOP_YOUTUBE_CHANNELS `

    let categoryCTE = `Categories AS (
        SELECT category_id, category_title FROM VIDEO_CATEGORIES
        WHERE category_title = '${category}'
    ), `

    let videosCTE = `Videos AS (
        SELECT V.video_id, VI.published_at, VI.title, VI.thumbnail_link, VI.category_id, VI.channel_title
        FROM TOP_TRENDING_VIDEOS AS V JOIN VIDEOS AS VI ON V.video_id = VI.video_id
        WHERE V.country = '${country}' `

    let firstLeg = `LIMIT ${pagePull}
        OFFSET ${offset}
    ) SELECT V.video_id, V.title as video_title, V.thumbnail_link, V.category_id `

    let secondLeg = (language != 'Select' || subscribersHigh != 0 || libraryHigh !=0) ? `FROM Channels AS C JOIN ` : `FROM `    
    
    let thirdLeg = (language != 'Select' || subscribersHigh != 0 || libraryHigh !=0) ? `Videos AS V ON C.channel_title=V.channel_title` : `Videos AS V JOIN VIDEOS AS VI ON V.video_id = VI.video_id  `


    let forthLeg = `GROUP BY V.video_id
        Limit ${limit};
    `

    if (publishStart !='' && publishStop != '' && publishStart !='undefined' && publishStop !='undefined')  {
        searchClauses += `AND VI.published_at BETWEEN '${publishStart}' AND '${publishStop}' `} 
    if (trendStart != '' && trendStop != '' && trendStart != 'undefined' && trendStop != 'undefined')  {
        searchClauses += `AND V.trending_date BETWEEN '${trendStart}' AND '${trendStop}' `} 
    if (videoTitle != '' && videoTitle != 'undefined')  {
        searchClauses += `AND VI.title LIKE '${videoTitle}%' `} 
    if (channelTitle != '' && channelTitle != 'undefined')  {
        searchClauses += `AND VI.channel_title LIKE '${channelTitle}%' `} 
    if (category != '' && category != 'undefined'){
        searchClauses += `AND VI.category_id IN (Select category_id From Categories) `}

    if (viewsHigh != 0){
        searchClauses += `AND V.view_count BETWEEN ${viewsLow} AND ${viewsHigh} `} 
    if (likesHigh != 0){
        searchClauses += `AND V.likes BETWEEN ${likesLow} AND ${likesHigh} `} 
    if (dislikesHigh != 0){
        searchClauses += `AND V.dislikes BETWEEN ${dislikesLow} AND ${dislikesHigh} `} 
    if (commentsHigh != 0){
        searchClauses += `AND V.comment_count BETWEEN ${commentsLow} AND ${commentsHigh} `} 

    
    channelsCTE += 'WHERE '
    if (language != 'Select'){
        channelsCTE += ` channel_language = '${language}' `}
    else if (subscribersHigh != 0){
        channelsCTE += `subscribers BETWEEN ${subscribersLow} AND ${subscribersHigh} `}
    else if (libraryHigh != 0){
        channelsCTE += ` library_size BETWEEN ${libraryLow} AND ${libraryHigh} `}
        
        
    if (subscribersHigh != 0 && language != 'Select'){
        channelsCTE += `AND subscribers BETWEEN ${subscribersLow} AND ${subscribersHigh} `}
    if ((subscribersHigh != 0 || language != 'Select') && libraryHigh != 0){
        channelsCTE += `AND library_size BETWEEN ${libraryLow} AND ${libraryHigh} `} 
    
    channelsCTE += `), `

    let finalQuery = ((subscribersHigh!=0 || libraryHigh!=0 || language != 'Select') ? channelsCTE : "") 
    if (finalQuery == ""){
        finalQuery += `WITH `}
    if (category != '' && category != 'undefined') {
        pagePull = pagePull * 10
        finalQuery += categoryCTE} 
    if (finalQuery == ""){
        finalQuery += `WITH `}
    finalQuery += videosCTE +  searchClauses + firstLeg + secondLeg + thirdLeg + forthLeg

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
    WITH TVIDEOS AS (SELECT video_id, MAX(view_count) as views, max(trending_date) as trend_stop,
                        min(trending_date) as trend_start, max(likes) as likes,
                        max(dislikes) as dislikes, max(comment_count) as comments, GROUP_CONCAT(DISTINCT country) as countries
                 FROM TOP_TRENDING_VIDEOS WHERE video_id = '${videoid}'),
    WIDESET AS (SELECT video_id, published_at, title, channel_title, tags, description, thumbnail_link FROM VIDEOS
                WHERE video_id = '${videoid}')
    SELECT VI.title as video_title, VI.published_at, V.video_id,
            V.views, V.trend_stop, V.trend_start, VI.thumbnail_link, V.likes,
           V.dislikes, V.comments,
            V.countries, VI.channel_title,
            VI.description, VI.tags
    FROM TVIDEOS AS V JOIN WIDESET AS VI ON V.video_id = VI.video_id
    GROUP BY V.video_id;
    `
    // console.log(finalQuery)

    connection.query(finalQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            console.log(finalQuery)
            res.json({ results: results })
        }
    });
}   

async function countryGantt(req, res){
    videoid = req.query.videoid;
    country = req.query.country;
    finalQuery = `
    SELECT video_id, MAX(trending_date) AS trend_stop,
            MIN(trending_date) AS trend_start, country
    FROM TOP_TRENDING_VIDEOS
    WHERE video_id = '${videoid}' and country = '${country}'
    GROUP BY video_id
    `
    // console.log(finalQuery)

    connection.query(finalQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
} 

async function favoritedVideos(req, res){

    user = req.query.user

    finalQuery = `
    SELECT F.video_id, VI.title as video_title, VI.thumbnail_link
    FROM FAVORITES AS F JOIN VIDEOS AS VI ON F.video_id = VI.video_id
    WHERE F.user = '${user}'
    `

    connection.query(finalQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            console.log(finalQuery)
            res.json({ results: results })
        }
    });
}   

async function insert(req, res){
 
    const videoId = req.body.videoId
    const user = req.body.user
  
    finalQuery = `INSERT INTO FAVORITES (video_id, user) VALUES ('${videoId}', '${user}');`
  
    connection.query(finalQuery, function (error, results, fields) {
  
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
} 

async function recommendedVideos(req,res){
    videoid = req.query.videoid
    // finalQuery = 
    // `
    // WITH Selected_Video AS (
    //     SELECT category_id 
    //     FROM TOP_TRENDING_VIDEOS
    //     WHERE video_id = ${videoId}
    // )SELECT V.title as video_title, V.published_at AS published, V.video_id,
    // MAX(V.view_count) AS views, MAX(V.trending_date) AS trend_stop,
    // MIN(V.trending_date) AS trend_start, V.thumbnail_link, V.likes,
    // GROUP_CONCAT(DISTINCT V.country) AS countries, V.channel_title,
    // V.description, V.tags
    // FROM TOP_TRENDING_VIDEOS AS V JOIN Selected_Video AS S
    // WHERE V.category_id = S.category_id 
    // GROUP BY video_id;
    // `
    // // finayQuery = 
    // // `
    //         WITH Selected_Channel AS (
    //             SELECT category_id
    //             FROM TOP_YOUTUBE_VIDEOS
    //             WHERE video_id = ${videoid}
    //         )
    //         SELECT V.title AS video_title, V.published_at AS published, V.video_id AS video_id,
    //                 MAX(V.view_count) AS views, MAX(V.trending_date) AS trend_stop,
    //                 MIN(V.trending_date) AS trend_start, GROUP_CONCAT(DISTINCT V.country) AS countries
    //         FROM TOP_TRENDING_VIDEOS AS V JOIN Selected_Channel AS C
    //         WHERE V.category_id= C.category_id
    //         GROUP BY video_id
    //         LIMIT 3;`

    finalQuery = `

    SELECT DISTINCT B.title as video_title, B.video_id, B.thumbnail_link
    FROM TOP_TRENDING_VIDEOS AS A JOIN VIDEOS AS B ON A.video_id =  B.video_id
    WHERE B.category_id IN
    (SELECT VI.category_id  
            FROM TOP_TRENDING_VIDEOS AS V JOIN VIDEOS AS VI ON V.video_id = 
                VI.video_id
            WHERE V.video_id = '${videoid}')
    AND A.video_id <>'${videoid}' 
    LIMIT 12; `
    


    // finalQuery = `SELECT A.title as video_title, A.published_at AS published, A.video_id
    // FROM  TOP_TRENDING_VIDEOS A JOIN TOP_TRENDING_VIDEOS B ON A.video_id = B.video_id
    // WHERE B.video_id = '${videoid}' AND A.category_id = B.category_id AND A.video_id != '${videoid}'
    // GROUP BY A.video_id,B.video_id 
    // LIMIT 0,2000;`

    
    // finalQuery = `
    // SELECT title as video_title
    // FROM TOP_TRENDING_VIDEOS
    // WHERE video_id = '${videoid}'
    // GROUP BY video_id
    // `
    
   
    console.log(finalQuery)
    console.log(videoid)
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
    channel,
    find_channels,
    trendingVideos,
    selected_channel_recent_trending,
    singleVideo,
    favoritedVideos,
    insert,
    recommendedVideos,
    countryGantt,
}