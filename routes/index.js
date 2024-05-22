var express = require('express');
var router = express.Router();
const Homepage = require('./../controllers/homepage');
const Post = require('./../controllers/post');
const Auth = require('./../controllers/authentication')
const passport = require('passport')


function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/');
}
/* GET home page. */
router.get('/', Homepage.get_homepage);


router.get('/new', Post.get_newPost);


router.post('/new', Post.post_newPost);

router.get('/login', Auth.get_login);

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/delete/:id', ensureAuthentication, Post.get_deletePost);
router.get('/logout', Auth.get_logout);

router.get('/signup', Auth.get_signup);

router.post('/signup', Auth.post_signup);


module.exports = router;
