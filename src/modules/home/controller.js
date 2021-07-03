const path = require('path')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'index.html'))
}

module.exports = { GET }