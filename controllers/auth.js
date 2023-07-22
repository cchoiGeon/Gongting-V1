const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();
const db = require('../db/index')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const sanitizeHtml = require('sanitize-html')
const passport = require('passport');
dotenv.config()
router.use(bodyParser.urlencoded({ extended: false}));

exports.iscompletion = async(req,res,next) => {
  let user = await User.findOne({where:{email:req.user.email}})
  if(user.myprofile === 'X'){
    return res.redirect('/gomyprofilesetting')
  }
  next()
}

exports.isverify = async(req,res,next) => {
  let user = await User.findOne({where:{email:req.user.email}})
  if(user.studentcard === 'X'){
    return res.redirect('/verify')
  }else if(user.studentcard === 'processing'){
    next()
    // return res.redirect('/myprofile')
  }else{
    next()
  }
}

exports.isadmin = async(req,res,next) => {
  try{
    let admin = await User.findOne({where:{email:req.user.email}})
    if(req.user.email === process.env.ADMIN_ID && admin.password === process.env.ADMIN_PASSWORD){
      next()
    }else{
      next('404error')
    }
  }catch(error){
    next(error)
  }
}

exports.loginprocess = async(req,res,next) =>{
  passport.authenticate('local', (authError, user, info) => { // 로컬 로그인 전략 수행 ?
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) { // 아이디 비번 틀렸을 때 ?
      return res.redirect('/login')
    }
    return req.login(user, (loginError) => { // 성공했을 때
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
}
exports.logoutprocess = async (req,res,next) =>{
  await req.session.destroy(
    function (err) {
      if (err) {
        next(err)    
      }
      return res.redirect('/login');
    }
);     
}
exports.signupprocess = async(req,res,next) =>{
    let post = req.body
    try{
      let user = await User.findOne({where:{email:post.email}})
      if(user){
        return res.redirect('/signup')
      }else{
        if (post.password === post.checkpassword){
          let hashpassword = await bcrypt.hashSync(post.password,12)
          await db.query('INSERT INTO users(name,email,password,studentnum) VALUES(?,?,?,?)',[sanitizeHtml(post.name),sanitizeHtml(post.email),sanitizeHtml(hashpassword),sanitizeHtml(post.studentnum)])
          return res.redirect('/login');
        }else{
          return res.redirect('/signup')
        }
      }
    }
    catch(error){
        console.error(error)
        next(error)
  }
}
exports.verifyprocess = async(req,res,next) =>{
  if(!req.file){
    return res.redirect('/verify')
  }
  try{
    await db.query('UPDATE users SET studentcard=?,studentcardroot=? WHERE email=?',['O',req.file.filename,req.user.email])
    return res.redirect('/myprofile');
  }catch(error){
    console.error(error)
    next(error)
  }
}