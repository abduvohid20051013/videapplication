const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { checkUser } = require('./model')
const KEY = '1111'

function checkToken(req, res, next) {
    try {
        if (req.cookies.token) {
            let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
            users = users ? JSON.parse(users) : []
            let payload = jwt.verify(req.cookies.token, KEY)
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
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'login.html'))
}

const POST = (req, res) => {
    let user = checkUser(req.body)
    if (user) {
        res.cookie('token', jwt.sign(user.user_id, KEY))
        res.status(200).send({
            message: "The user logged in.",
            body: user
        })
    } else {
        res.status(404).send({
            message: "Wrong username or password"
        })
    }
}



module.exports = { GET, POST, checkToken }