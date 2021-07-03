const path = require('path')
const fs = require('fs')
const jsonWebToken = require('jsonwebtoken')
const KEY = '1111'
const { addUser } = require('./model')

function checkToken(req, res, next) {
    try {
        if (req.cookies.token) {
            let users = fs.readFileSync(path.join(process.cwd(), 'database', 'users.json'), 'utf-8')
            users = users ? JSON.parse(users) : []
            let payload = jsonWebToken.verify(req.cookies.token, KEY)
            let found = users.find(user => user.user_id == payload)
            if (found) {
                res.redirect('/admin')
            } else throw 'error'
        } else throw 'error'
    } catch (err) {
        next()
    }
}

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'register.html'))
}
const POST = (req, res) => {
    let file = req.files.file
    let fileName = new Date().getTime() + file.name.replace(/\s/g, "_").trim()
    file.mv(path.join(process.cwd(), 'upload', 'uploadedImages', fileName))
    let newUser = addUser(req.body, fileName)
    if (newUser) {
        res.cookie('token', jsonWebToken.sign(newUser.user_id, KEY))
        res.status(200).send({
            message: 'User successfully added',
            body: newUser
        })
    } else {
        res.status(404).send({
            message: 'user has already exists'
        })
    }
}

module.exports = { GET, POST, checkToken }