const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const Post = new Schema({
    username: {type: String},
    message: {type: String},
    time: {type: Date}
})


Post.virtual('url').get(function(){
    return `/post/${this._id}`
})

module.exports = mongoose.model('Post', Post)