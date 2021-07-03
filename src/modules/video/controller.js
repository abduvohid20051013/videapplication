const path = require('path')
const { getVideo, deleteVideo, updateVideo } = require('./model')

const GET = (req, res) => {
    res.json(getVideo())
}

const SEARCH = (req, res) => {
    let word = req.query.searchedItem
    let videos = getVideo()
    let filtered = videos.filter(video => video.title.toLowerCase().includes(word))
    res.status(200).send({
        body: filtered
    })
}

const DELETE = (req, res) => {
    let videos = deleteVideo(req.params.videoId)
    res.status(200).send({
        message: 'Video deleted',
        body: videos
    })
}

const PUT = (req, res) => {
    let videos = updateVideo(req.body, req.params.videoId)
    res.status(200).send({
        message: 'Video title changed',
        body: videos
    })
}

module.exports = { GET, SEARCH, DELETE, PUT }