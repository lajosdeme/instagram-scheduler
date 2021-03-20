const mongoose = require('mongoose')
const scheduleInfo = require('./schema/scheduleInfo')

// ------------------------- Get all schedule objects -------------------------------------- 
const getScheduleObjects = (callback) => {
    scheduleInfo.ScheduleInfo.find(function (err, items) {
        callback(err, items)
    })
}

// ------------------------- Get schedule object by id -------------------------------------- 
const getObject = async (id) => {
    scheduleInfo.ScheduleInfo.findById(id, (err, object) => {
        if (err) {
            console.log(err)
            return null
        }
        return object
    })
}

// ------------------------- Get schedule object by id with callback -------------------------------------- 
const getSingleScheduleObject = async (id, callback) => {
    scheduleInfo.ScheduleInfo.findById(id, (err, object) => {
        callback(err, object)
    })
}
module.exports = { getScheduleObjects, getSingleScheduleObject, getObject }