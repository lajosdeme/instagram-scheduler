const mongoose = require('mongoose')
const post = require('./post')

// ------------------------- Schedule info schema -------------------------------------- 
const scheduleInfoSchema = new mongoose.Schema({
    postDate: Date,
    post: post.postSchema,
    firstComment: String
})
const ScheduleInfo = new mongoose.model('ScheduleInfo', scheduleInfoSchema)

module.exports = {scheduleInfoSchema: scheduleInfoSchema, ScheduleInfo: ScheduleInfo}