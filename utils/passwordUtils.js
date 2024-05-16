const crypto = require('crypto')

function generatePassword(password){
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')

    return {
        salt: salt,
        hash: hash
    }
}

function validatePassword(currPassword, storedHash, storedSalt){
    const currHash = crypto.pbkdf2Sync(currPassword, storedSalt, 10000, 64, 'sha512');

    return currHash === storedHash
}

module.exports = {
    generatePassword: generatePassword,
    validatePassword: validatePassword
}