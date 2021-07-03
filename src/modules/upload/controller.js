const path = require('path')
const jwt = require('jsonwebtoken')
const KEY = '1111'
const { addVideo } = require('./model')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'admin.html'))
}

const POST = (req, res) => {
    let file = req.files.file
    let payload = jwt.verify(req.cookies.token, KEY)
    let fileName = new Date().getTime() + file.name.replace(/\s/g, "_").trim()
    file.mv(path.join(process.cwd(), 'src', 'upload', 'uploadedVideo', fileName))
    addVideo(req.body, payload, fileName)
    res.status(200).send({
        message: 'Video added successfully'
    })

}



module.exports = { GET, POST }