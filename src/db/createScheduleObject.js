const fs = require('fs')
const image = require('./schema/image')
const post = require('./schema/post')
const scheduleInfo = require('./schema/scheduleInfo')

const mongoose = require('mongoose')

// ------------------------- Create Schedule Info object -------------------------------------- 
//Creates a Schedule Info object and saves it to the database
const createScheduleObject = (req, callback) => {
    const img = new image.Image({
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
    })

    const igPost = new post.Post({
        caption: req.body.caption,
        image: img
    })

    const scheduleObj = new scheduleInfo.ScheduleInfo({
        postDate: req.body.postDate,
        post: igPost,
        firstComment: req.body.firstComment
    })

    scheduleObj.save((err, val) => {
        callback(err, val)
    })
}

module.exports = createScheduleObject