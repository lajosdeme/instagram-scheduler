const scheduler = require('node-schedule')
const uploadPhoto = require('../instagram-api/uploadPhoto')

// ------------------------- Schedule IG photo upload -------------------------------------- 
const scheduleInstagramUpload = (scheduleObj) => {
    const id = scheduleObj._id
    const date = scheduleObj.postDate
    scheduler.scheduleJob(id, date, (fireDate) => {
        uploadPhoto(id)
    })
}

// ------------------------- Unschedule IG photo upload --------------------------------------
const unscheduleInstagramUpload = (id) => {
    const job = scheduler.scheduledJobs[id]
    job.cancel()
}

module.exports = scheduleInstagramUpload