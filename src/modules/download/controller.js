const path = require('path')

const GET = (req, res) => {
    let fileName = path.join(process.cwd(), 'upload', 'uploadedVideo', req.query.link)
    res.download(fileName)
}

module.exports = { GET }