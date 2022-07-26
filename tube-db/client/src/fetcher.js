import config from './config.json'

const getChannel = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/channel?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllChannels = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/channels?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllVideos = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/videos?name=${id}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getChannel,
    getAllChannels,
    getAllVideos
}