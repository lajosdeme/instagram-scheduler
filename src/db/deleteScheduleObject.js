const scheduleInfo = require('../db/schema/scheduleInfo')
const fs = require('fs')

// ------------------------- Delete schedule object by id -------------------------------------- 
const deleteObject = (id, callback) => {
    scheduleInfo.ScheduleInfo.findByIdAndDelete(id, (err, object) => {
        callback(err, object)
    })
}
module.exports = deleteObject