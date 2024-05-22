const {body, resultValidation} = require('express-validator')
const asyncHandler = require('express-async-handler')
const Post = require('./../models/post')

exports.get_homepage = asyncHandler(
    async(req, res, next)=>{
        const messages = await Post.find({}).sort({time: 1}).exec();
        console.log(req.user)
        res.render("homepage",
            {
                title: "Messages",
                posts: (messages.length > 0?messages:undefined),
                user: req.user,
                isAdmin: (req.user===undefined?undefined:req.user.isAdmin)
            }
        )
    }
)