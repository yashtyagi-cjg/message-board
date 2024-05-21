const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    hash: {type: String},
    salt: {type: String},
    isAdmin: {type: Boolean},
    isMember: {type: Boolean}
})

User.virtual('name').get(function(){
    return `${this.firstname} ${this.lastname}`
})

module.exports = mongoose.model('User', User);