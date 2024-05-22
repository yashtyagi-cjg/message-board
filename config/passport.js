const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const User = require('./../models/user')
const validatePassword = require('./../utils/passwordUtils').validatePassword;


passport.use(new LocalStratergy((username, password, cb)=>{
    User.findOne({username: username}).exec().then((user)=>{
        if(!user){
            console.log(username, password, '0')
            return cb(null, false, {message: "Incorrect Username or Password"});
        }
        console.log(username, password, '1')
        const isValid = validatePassword(password, user.hash, user.salt);

        if(isValid){
            return cb(null, user);
        }else{
            return cb(null, false, {message: "Incorrect Username or Password."})
        }
    }).catch((err)=>{
        console.log(`Encountered error while processing ${err}`)
        return cb(err);
    })

}))


passport.serializeUser((user, cb)=>{
    return cb(null, user.id)
})

passport.deserializeUser(async (userId, cb)=>{
    try{
        const user = await User.findById(userId).exec();
        return cb(null, user);
    }catch (err) {
        console.error(`Error occurred during deserialization: ${err}`);
        return cb(err);
    }
})