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

const getFindChannels = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/find_channels`, {
        method: 'GET',
    })
    return res.json()
}

const getHomeVideos = async (country, pageCount) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/home?country=${country}&page=${pageCount}`, {
        method: 'GET',
    })
    
    const result = await res.json()

    const setKeysResolution = (array) => {
        var size = array.results.length;
        for (var x=0; x < size; x++ ){
            array.results[x].key = array.results[x].video_id + " " + array.results[x].trend_start + " " + array.results[x].trend_stop;
            array.results[x].thumbnail_link = array.results[x].thumbnail_link.replace("default", "mqdefault");
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
    return res.json()
}

export {
    getChannel,
    getFindChannels,
    getHomeVideos,
    getChannelRecentTrending,
    getSingleVideo
}