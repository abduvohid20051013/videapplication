const path = require("path")
const render = (htmlFile) => {
    return path.join(process.cwd(), "views", htmlFile)
}

module.exports = render