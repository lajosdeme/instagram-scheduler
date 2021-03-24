const mongoose = require('mongoose')
const scheduleInfo = require('./schema/scheduleInfo')

// ------------------------- Get all schedule objects -------------------------------------- 
const getScheduleObjects = (callback) => {
    scheduleInfo.ScheduleInfo.find(function (err, items) {
        callback(err, items)
    })
}

/* ------------------------- Get schedule object by id -------------------------------------- 
 * @param {Int} id   The id of the schedule info object.
 */
const getObject = async (id) => {
    scheduleInfo.ScheduleInfo.findById(id, (err, object) => {
        if (err) {
            console.log(err)
            return null
        }
        return object
    })
}

/* ------------------------- Get schedule object by id with callback -------------------------------------- 
 * @param {Int} id   The id of the schedule info object.
 */
const getSingleScheduleObject = async (id, callback) => {
    scheduleInfo.ScheduleInfo.findById(id, (err, object) => {
        callback(err, object)
    })
}
module.exports = { getScheduleObjects: getScheduleObjects, getSingleScheduleObject: getSingleScheduleObject, getObject: getObject }