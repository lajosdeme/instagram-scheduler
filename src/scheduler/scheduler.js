const scheduler = require('node-schedule')
const uploadPhoto = require('../instagram-api/uploadPhoto')
const deleteObject = require('../db/deleteScheduleObject')
const getScheduleObjects = require('../db/getScheduleObjects').getScheduleObjects
const Logger = require('../loaders/logger')

/* ------------------------- Schedule IG photo upload -------------------------------------- 
 * @param {ScheduleInfo} scheduleObj    The ScheduleInfo object to schedule for upload.
 */
const scheduleInstagramUpload = (scheduleObj) => {
    const id = scheduleObj._id
    const date = scheduleObj.postDate
    scheduler.scheduleJob(id.toString(), date, () => {
        uploadPhoto(id)
    })
    console.log(scheduler.scheduledJobs)
}

 /* ------------------------- Unschedule IG photo upload --------------------------------------
  * @param {Int} id     The id of the ScheduleInfo object to unschedule. 
  */
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

/* ---------------------------- Reschedule all posts ----------------------------------------
 * The basic idea behind this is that free Heroku apps need to sleep at least 7 hours/day. 
 * That means when your server restarts scheduled jobs will be lost. 
 * We reschedule the posting of every object we have in our database upon server restart.
 * Since objects are deleted from DB right after they're posted, we can be certain that only scheduled posts will be in DB, so it's safe to reschedule all.
 */
const rescheduleAllJobs = () => {
    const jobsCount = Object.keys(scheduler.scheduledJobs).length
    if (jobsCount > 0) {
        return
    } else {
        getScheduleObjects((err, items) => {
            if (err) {
                Logger.error('❗ Error rescheduling pending jobs. ❗️', err)
            } else if (items.length === 0) {
                Logger.info('No posts to reschedule. 📭')
            } else {
                items.forEach(item => {
                    scheduleInstagramUpload(item)
                })
                Logger.info(`💤 Server restarted from sleep. Rescheduled ${items.length} items. ⏰`)
            }
        })
    }
}

module.exports = { scheduleToPost: scheduleInstagramUpload, unschedulePost: unscheduleInstagramUpload, rescheduleAllJobs: rescheduleAllJobs }