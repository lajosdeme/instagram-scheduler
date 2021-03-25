const express = require('express')
const getScheduleObjects = require('../../db/getScheduleObjects').getScheduleObjects
const createScheduleObject = require('../../db/createScheduleObject')
const { scheduleToPost, unschedulePost, rescheduleAllJobs } = require('../../scheduler/scheduler')
const createUser = require('../../db/createUser')
const upload = require('../../loaders/multer')
const Logger = require('../../loaders/logger')

const passport = require('passport')
const router = express.Router()
const checkAuth = require('../../utils/checkAuth')

require('dotenv').config()
module.exports = (app) => {
    app.use('/', router)
    // ------------------------- Render upload page -------------------------------------- 
    router.get('/', (req, res) => {
        if (checkAuth(req, res)) {
            res.render('index')
            rescheduleAllJobs()
        }
    })

    // ------------------------- Upload photo and schedule it to post -------------------------------------- 
    router.post('/', upload.single('image'), (req, res) => {
        if (checkAuth(req, res)) {
            createScheduleObject(req, (err, val) => {
                if (err) {
                    Logger.error(`❗️ Error occured while creating object in DB.❗️ ${err}`)
                    res.status(500).send({
                        status: 'error',
                        message: 'Error occured while creating object in DB.',
                        description: `${err}`
                    })
                } else {
                    Logger.debug('object created', val)
                    scheduleToPost(val)
                    Logger.info('👻 Success! Your post is scheduled.')
                    res.redirect('/')
                }
            })
        }
    })

    // ------------------------- Render scheduled posts --------------------------------------
    router.get('/posts', (req, res) => {
        if (checkAuth(req, res)) {
            getScheduleObjects((err, items) => {
                if (err) {
                    Logger.error(`❗️ Error occured while fetching images.❗️ ${err}`)
                    res.status(500).send({
                        status: 'error',
                        message: 'Error occured while fetching images.',
                        description: `${err}`
                    })
                } else {
                    res.render('posts', { items: items, uName: process.env.IG_USERNAME })
                }
            })
        }
    })

    // ------------------------- Unschedule post -------------------------------------- 
    router.post('/unschedule/:id', (req, res) => {
        if (checkAuth(req, res)) {
            const id = req.params.id
            if (id == undefined) {
                Logger.error(`❗️ This request is not quite right. The id parameter is missing.❗️ ${err}`)
                res.status(400).send({
                    status: 'error',
                    message: 'This request is not quite right. The id parameter is missing.',
                    description: `${err}`
                })
            } else {
                unschedulePost(id, (success, error) => {
                    if (!success) {
                        Logger.error(`❗️ Error occured while unscheduling post.❗️ ${err}`)
                        res.status(400).send({
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
        }
    })

    /* ---------------------------- Login -----------------------------------
     */
    router.route('/login')
        .get((req, res) => {
            createUser()
            res.render('login')
        })
        .post(passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }),
            function (err, req, res) {
                console.log(err)
                res.redirect('/')
            })

    /* ---------------------------- Ping server ----------------------------------- 
     * Ping app. Used to keep app alive on Heroku. Check Readme for more info.
     */
    router.get('/ping', (req, res) => {
        res.send('pong')
        rescheduleAllJobs()
    })
}