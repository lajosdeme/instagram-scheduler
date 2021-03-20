const mongoose = require('mongoose')
const image = require('./image')

// ------------------------- Post schema -------------------------------------- 
const postSchema = new mongoose.Schema({
    caption: String,
    image: image.imageSchema
})

const Post = new mongoose.model('Post', postSchema)

module.exports = {postSchema: postSchema, Post: Post}