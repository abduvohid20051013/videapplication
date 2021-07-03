const express = require('express')
const { GET, POST } = require('./controller')

const uploadRoute = express.Router()
uploadRoute.route('/admin')
    .get(GET)
    .post(POST)

module.exports = uploadRoute