const {body, resultValidation} = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.get_newPost = asyncHandler(
    (req, res, next)=>{
        res.send("GET_NEW_POST NOT IMPLEMENTED");
    }
)

exports.post_newPost = asyncHandler(
    (req,res,next)=>{
        res.send("POST_NEW_POST NOT IMPLEMENTED");
    }
)