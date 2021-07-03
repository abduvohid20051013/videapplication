const fs = require('fs')
const path = require('path')

const getUsers = () => {
    let users = fs.readFileSync(path.join(process.cwd(), 'database', 'users.json'), 'utf-8')
    let videos = fs.readFileSync(path.join(process.cwd(), 'database', 'videos.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    videos = videos ? JSON.parse(videos) : []
    users.map(user => {
        let userImg = user.userImg
        let username = user.username
        let userVideos = videos.filter(video => video.user_id == user.user_id)
        user.videos = userVideos
        for (let video of user.videos) {
            video.user = {
                username,
                userImg
            }
        }
    })
    return users
}

module.exports = { getUsers }