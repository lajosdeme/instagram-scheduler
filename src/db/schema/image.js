const mongoose = require('mongoose')

// ------------------------- Image schema -------------------------------------- 
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
})

const Image = new mongoose.model('Image', imageSchema)
module.exports = {imageSchema: imageSchema, Image: Image}