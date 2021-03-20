const mongoose = require('mongoose')
const scheduleInfo = require('../db/schema/scheduleInfo')

// ------------------------- Delete schedule object by id -------------------------------------- 
const deleteObject = (id, callback) => {
    scheduleInfo.ScheduleInfo.findByIdAndDelete(id, (err, object) => {
        callback(err, object)
    })
}
module.exports = deleteObject