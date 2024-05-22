const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator') 
const {generatePassword, validatePassword} = require('./../utils/passwordUtils')
const User = require('./../models/user')

exports.get_login = asyncHandler(
    async(req, res, next)=>{
        res.render("login", 
            {
                title: "Log In",
                authPage: true,
            }
        )
    }
)

exports.post_login = asyncHandler(
    (req, res, next)=>{
        res.send('POST_LOGIN NOT IMPLEMENTED');
    }
)

exports.get_logout = asyncHandler(
    async(req,res,next)=>{
        req.logout(function(err){
            if(err){
                return next(err);
            }
        })

        res.redirect('/')
    }
)

exports.get_signup = asyncHandler( 
    (req, res, next)=>{
        res.render("signup", 
            {
                title: "Sign Up",
                authPage: true,
            }
        )
    }
)

exports.post_signup = [
    asyncHandler(
        async(req, res, next)=>{
            const errors = validationResult(req);

            
            if(!errors.isEmpty()){
                res.render("signup", 
                {
                    title: "Sign Up",
                    authPage: true,
                    errors: errors.array(),
                })
            }else{
                const passSet = generatePassword(req.body.password);
                const newUser= new User({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    hash: passSet.hash,
                    salt: passSet.salt,
                    isAdmin: (req.body.AdminRadio === 'yes'?true:false),
                    isMember: false,
                })

                newUser.save();

                console.log(newUser);
                res.redirect('/login')
            }

            
        }
)]