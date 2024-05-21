const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String},
    hash: {type: String},
    salt: {type: String},
    isAdmin: {type: Boolean},
    isMember: {type: Boolean}
})

module.exports = mongoose.model('User', User);