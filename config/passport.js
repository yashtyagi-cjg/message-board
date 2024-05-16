const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const User = require('./../models/user')
const validatePassword = require('./../utils/passwordUtils').validatePassword;


passport.use(new LocalStratergy((username, password, cb)=>{
    User.findOne({username: username}).exec().then((user)=>{
        if(!user){
            return cb(null, false, {message: "Incorrect Username or Password"});
        }

        const isValid = validatePassword(password, user.hash, user.salt);

        if(isValid){
            return cb(null, true);
        }else{
            return cb(null, false, {message: "Incorrect Username or Password."})
        }
    })

}))


passport.serializeUser((user, cb)=>{
    return cb(null, user.id)
})

passport.deserializeUser(async (userId, cb)=>{
    try{
        const user = await User.findById(userId).exec();
        return cb(null, user);
    }catch(err){
        return cb(err)
    }
})