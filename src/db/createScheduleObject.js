const fs = require('fs')
const image = require('./schema/image')
const post = require('./schema/post')
const scheduleInfo = require('./schema/scheduleInfo')
const scheduleToPost = require('../scheduler/scheduler').scheduleToPost
const moment = require('moment')

// ------------------------- Create Schedule Info object -------------------------------------- 
//Creates a Schedule Info object and saves it to the database
const createScheduleObject = (req, callback) => {
    const datetimeLocal = req.body.postDate
    const datetimeUTC = new Date(datetimeLocal).toISOString()
    
    const img = new image.Image({
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
    })

    const igPost = new post.Post({
        caption: req.body.caption,
        image: img
    })

    const scheduleObj = new scheduleInfo.ScheduleInfo({
        postDate: datetimeUTC,
        post: igPost,
        firstComment: req.body.firstComment
    })

    scheduleObj.save()
        .then((val) => {
            callback(null, val)
        })
        .catch((err) => {
            callback(err, null)
        })
}

module.exports = createScheduleObject