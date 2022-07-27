import config from './config.json'

const getChannel = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/channel?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getHomeVideos = async (country, pageCount) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/home?country=${country}&page=${pageCount}`, {
        method: 'GET',
    })
    
    const result = await res.json()

    const setKeys = (array) => {
        var size = array.results.length
        for (var x=0; x < size; x++ ){
            array.results[x].key = array.results[x].video_id + " " + array.results[x].trending_date
        }
        return array
    }

    const final = await setKeys(result);
    return final
}



export {
    getChannel,
    getHomeVideos
}