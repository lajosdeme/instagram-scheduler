const scheduler = require('node-schedule')
const uploadPhoto = require('../instagram-api/uploadPhoto')
const deleteObject = require('../db/deleteScheduleObject')

// ------------------------- Schedule IG photo upload -------------------------------------- 
const scheduleInstagramUpload = (scheduleObj) => {
    const id = scheduleObj._id
    const date = scheduleObj.postDate
    scheduler.scheduleJob(id.toString(), date, () => {
        uploadPhoto(id)
    })
}

 // ------------------------- Unschedule IG photo upload --------------------------------------
const unscheduleInstagramUpload = (id, callback) => {
    const job = scheduler.scheduledJobs[id.toString()]
    if (job == undefined) {
        callback(false, "Job with id doesnt exist.")
    } else {
        job.cancel()
        deleteObject(id, (err,_) => { })
        callback(true, null)
    }
}

module.exports = { scheduleToPost: scheduleInstagramUpload, unschedulePost: unscheduleInstagramUpload }