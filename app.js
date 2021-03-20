require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const express = require('express')
const app = express()

const getScheduleObjects = require('./src/db/getScheduleObjects').getScheduleObjects
const createScheduleObject = require('./src/db/createScheduleObject')

const scheduleToPost = require('./src/scheduler/scheduler')

const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/instascheduler'

app.use(express.static('public'))
app.use(express.json(), express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

//first have to set up mongodb to run locally:
// mongod -dbpath ~/data/db
// ------------------------- Connect to Mongo DB -------------------------------------- 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connect => console.log('connected to mongodb..'))
    .catch(e => console.log('could not connect to mongodb', e));


// ------------------------- Config multer disk storage -------------------------------------- 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })


// ------------------------- Render upload page -------------------------------------- 
app.get('/', (req, res) => {
    getScheduleObjects((err, items) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error occured while fetching images.', err)
        } else {
            res.render('index', { items: items })
        }
    })
})

// ------------------------- Upload photo and schedule it to post -------------------------------------- 
app.post('/', upload.single('image'), (req, res, next) => {
    createScheduleObject(req, (err, val) => {
        if (err) {
            console.log(err)
        } else {
            scheduleToPost(val)
            res.redirect('/')
        }
    })
})

// ------------------------- Listen on port -------------------------------------- 
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})