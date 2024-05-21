const asyncHandler = require('express-async-handler')
const {body, resultValidation} = require('express-validator') 


exports.get_login = asyncHandler(
    (req, res, next)=>{
        res.send('GET_LOGIN NOT IMPLEMENTED')
    }
)

exports.post_login = asyncHandler(
    (req, res, next)=>{
        res.send('POST_LOGIN NOT IMPLEMENTED');
    }
)



exports.get_signup = asyncHandler(
    (req, res, next)=>{
        res.send('GET SIGNUP NOT IMPLEMENTED');
    }
)

exports.post_signup = asyncHandler(
    (req, res, next)=>{
        res.send('POST SIGN UP NOT IMPLEMENTED');
    }
)