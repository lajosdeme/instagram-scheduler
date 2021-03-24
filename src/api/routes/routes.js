const express = require('express')
const getScheduleObjects = require('../../db/getScheduleObjects').getScheduleObjects
const createScheduleObject = require('../../db/createScheduleObject')
const { scheduleToPost, unschedulePost, rescheduleAllJobs } = require('../../scheduler/scheduler')
const upload = require('../../loaders/multer')
const Logger = require('../../loaders/logger')

const router = express.Router()

require('dotenv').config()
module.exports = (app) => {
    app.use('/', router)

    // ------------------------- Render upload page -------------------------------------- 
    router.get('/', (req, res) => {
        res.render('index')
        rescheduleAllJobs()
    })
    
    // ------------------------- Render scheduled posts --------------------------------------
    router.get('/posts', (req, res) => {
        getScheduleObjects((err, items) => {
            if (err) {
                Logger.error(`❗️ Error occured while fetching images.❗️ ${err}`)
                res.status(500).send(                    {
                    status: 'error',
                    message: 'Error occured while fetching images.',
                    description: `${err}`
                })
            } else {
                res.render('posts', { items: items, uName: process.env.IG_USERNAME })
            }
        })
    })

    // ------------------------- Upload photo and schedule it to post -------------------------------------- 
    router.post('/', upload.single('image'), (req, res, next) => {
        createScheduleObject(req, (err, val) => {
            if (err) {
                Logger.error(`❗️ Error occured while creating object in DB.❗️ ${err}`)
                res.status(500).send(                    {
                    status: 'error',
                    message: 'Error occured while creating object in DB.',
                    description: `${err}`
                })
            } else {
                scheduleToPost(val)
                Logger.info('👻 Success! Your post is scheduled.')
                res.redirect('/')
            }
        })
    })

    // ------------------------- Unschedule post -------------------------------------- 
    router.post('/unschedule/:id', (req, res) => {
        const id = req.params.id
        if (id == undefined) {
            Logger.error(`❗️ This request is not quite right. The id parameter is missing.❗️ ${err}`)
            res.status(400).send(                    {
                status: 'error',
                message: 'This request is not quite right. The id parameter is missing.',
                description: `${err}`
            })
        } else {
            unschedulePost(id, (success, error) => {
                if (!success) {
                    Logger.error(`❗️ Error occured while unscheduling post.❗️ ${err}`)
                    res.status(400).send(                    {
                        status: 'error',
                        message: 'Error occured while unscheduling post.',
                        description: `${err}`
                    })
                } else {
                    Logger.info('✅ Post unscheduled.')
                    res.redirect('/posts')
                }
            })
        }
    })

    /* ------------------------- Unschedule post -------------------------------------- 
     * Ping app. Used to keep app alive on Heroku. Check Readme for more info.
     */
    router.get('/ping', (req,res) => {
        res.send('pong')
        rescheduleAllJobs()
    })
}