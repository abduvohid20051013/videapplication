const express = require('express')
const { GET, SEARCH, DELETE, PUT } = require('./controller')

const videoRoute = express.Router()

videoRoute.route('/videos')
    .get(GET)

videoRoute.route('/videos/search')
    .get(SEARCH)

videoRoute.route('/videos/:videoId')
    .delete(DELETE)
    .put(PUT)


module.exports = videoRoute