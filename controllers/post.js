const {body, resultValidation} = require('express-validator')
const asyncHandler = require('express-async-handler')
const Post = require('./../models/post')
const User = require('./../models/user')


exports.get_newPost = asyncHandler(
    async(req, res, next)=>{
        res.render("newpost_form", 
            {
                title: "New Post"
            }
        )
    }
)

exports.post_newPost = asyncHandler(
    async(req,res,next)=>{
        console.log(req.user)
        const newPost = new Post({
            user: req.user,
            message: req.body.message,
            time: Date.now(),
        })

        newPost.save()

        res.redirect('/')
    }
)

exports.get_deletePost = asyncHandler(
    async(req, res, next)=>{
        if(req.user.isAdmin){
            await Post.findByIdAndDelete(req.params.id).exec().catch((err)=>{
                console.log(`ERROR OCCURED while deleting ${req.params.id} by user ${req.user._id}`)
            })

            console.log('Post Deleted')
        }
        res.redirect('/')
    }
)