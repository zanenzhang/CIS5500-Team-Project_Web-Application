import config from './config.json'

const getChannel = async (ranking) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/channel?ranking=${ranking}`, {
        method: 'GET',
    })
    return res.json() 
}

const getChannelRecentTrending = async (ranking) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/selected_channel_recent_trending?ranking=${ranking}`, {
        method: 'GET',
    })
    return res.json()
}

const getFindChannels = async (searchString, country, language, producer, rankingLow, rankingHigh, 
    viewsLow, viewsHigh, subsLow, subsHigh, libSizeLow, libSizeHigh, viewsPerLow, viewsPerHigh,
    viewsGrowthLow, viewsGrowthHigh, subsGrowthLow, subsGrowthHigh) => {
    
    let toFetch = `http://${config.server_host}:${config.server_port}/find_channels?searchString=${searchString}`
    toFetch += `&country=${country}&language=${language}&producer=${producer}&rankingLow=${rankingLow}&rankingHigh=${rankingHigh}`
    toFetch += `&viewsLow=${viewsLow}&viewsHigh=${viewsHigh}&subsLow=${subsLow}&subsHigh=${subsHigh}&libSizeLow=${libSizeLow}&libSizeHigh=${libSizeHigh}`
    toFetch += `&viewsPerLow=${viewsPerLow}&viewsPerHigh=${viewsPerHigh}&viewsGrowthLow=${viewsGrowthLow}&viewsGrowthHigh=${viewsGrowthHigh}`
    toFetch += `&subsGrowthLow=${subsGrowthLow}&subsGrowthHigh=${subsGrowthHigh}`
    var res = await fetch(toFetch, {
        method: 'GET',
    })
    return res.json()
}

const getTrendingVideos = async (country, channelLanguage, pageCount, offset, trendStart, trendStop, publishStart, publishStop, videoTitle, channelTitle, tag, category, viewsLow, viewsHigh, likesLow, likesHigh, dislikesLow, dislikesHigh, commentsLow, commentsHigh, subscribersLow, subscribersHigh, libraryLow, libraryHigh) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trendingvideos?country=${country}&language=${channelLanguage}&page=${pageCount}&offset=${offset}&trendstart=${trendStart}&trendstop=${trendStop}&publishstart=${publishStart}&publishstop=${publishStop}&video=${videoTitle}&channel=${channelTitle}&tag=${tag}&category=${category}&viewslow=${viewsLow}&viewshigh=${viewsHigh}&likeslow=${likesLow}&likeshigh=${likesHigh}&dislikeslow=${dislikesLow}&dislikeshigh=${dislikesHigh}&commentslow=${commentsLow}&commentshigh=${commentsHigh}&subscriberslow=${subscribersLow}&subscribershigh=${subscribersHigh}&librarylow=${libraryLow}&libraryhigh=${libraryHigh}`, {
        method: 'GET',
    })
    
    var result = await res.json()

    const setKeysResolution = (array) => {
        var size = array.results.length;
        for (var x=0; x < size; x++ ){
            array.results[x].key = array.results[x].video_id + " " + array.results[x].trend_start + " " + array.results[x].trend_stop;
            array.results[x].thumbnail_link = array.results[x].thumbnail_link.replace("default", "mqdefault");
            array.results[x].video_title = array.results[x].video_title.slice(0,21) + "..."
        };
        return array;
    }

    const final = await setKeysResolution(result);
    return final
}

const getFavoritedVideos = async (user) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/favorited?user=${user}`, {
        method: 'GET',
    })

    const result = await res.json()

    const setKeysResolution = (array) => {
        var size = array.results?.length;
        for (var x=0; x < size; x++ ){
            array.results[x].key = array.results[x].video_id + " " + array.results[x].trend_start + " " + array.results[x].trend_stop;
            array.results[x].thumbnail_link = array.results[x].thumbnail_link.replace("default", "mqdefault");
            array.results[x].video_title = array.results[x].video_title.slice(0,21) + "..."
        };

        return array;
    }

    const final = await setKeysResolution(result);
    return final
}



const getSingleVideo = async (videoid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/video?videoid=${videoid}`, {
        method: 'GET',
    })
    const result = await res.json()

    const setKeysResolution = (array) => {
        var size = array.results?.length;
        for (var x=0; x < size; x++ ){
            if (array.results[x].description){
                array.results[x].description = array.results[x].description.slice(0,160) + "..."
            } else {
                array.results[x].description = "No description available."
            }
        };

        return array;
    }

    const final = await setKeysResolution(result);
    return final
}

const getCountryGantt = async (videoid, country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/gantt?videoid=${videoid}&country=${country}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecommendedVideos = async (videoid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recommendation?videoid=${videoid}`, {
        method: 'GET',
    })
    
    const result = await res.json()

    const setKeysResolution = (array) => {
        var size = array.results?.length;
        for (var x=0; x < size; x++ ){
            array.results[x].key = array.results[x].video_id + " " + array.results[x].trend_start + " " + array.results[x].trend_stop;
            array.results[x].thumbnail_link = array.results[x].thumbnail_link.replace("default", "mqdefault");
            array.results[x].video_title = array.results[x].video_title.slice(0,21) + "..."
        };

        return array;
    }

    const final = await setKeysResolution(result);
    return final
    
}
export {
    getChannel,
    getFindChannels,
    getTrendingVideos,
    getChannelRecentTrending,
    getSingleVideo,
    getFavoritedVideos,
    getRecommendedVideos,
    getCountryGantt
}