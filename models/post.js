const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const Post = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    message: {type: String},
    time: {type: Date}
})


Post.virtual('url').get(function(){
    return `/post/${this._id}`
})

module.exports = mongoose.model('Post', Post)