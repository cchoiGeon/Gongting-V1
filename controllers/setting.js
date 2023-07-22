const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();
const UserProfile = require('../models/userprofile')
const LoveProfile = require('../models/loveprofile')
const FriendProfile = require('../models/friendprofile')
const db = require('../db/index')
dotenv.config()
router.use(bodyParser.urlencoded({ extended: false}));

exports.myprofileInfo = async(req,res,next) =>{
    try{
        let post = req.body;
        let mbti = post.mbti1+post.mbti2+post.mbti3+post.mbti4
        let hobby = post.hobby1+'/'+post.hobby2+'/'+post.hobby3
        let features = post.features1+'/'+post.features2+'/'+post.features3
        let exUser = await UserProfile.findOne({
            where:{email:req.user.email}
        })
        if(exUser){
            await db.query('UPDATE userprofiles SET email=?, name=? ,sex=?, age=?, major=?, smoke=?, socialmediaid=?, socialmediaidtype=?, mbti=?, hobby=?, features=? WHERE email=?', [req.user.email, req.user.name ,post.sex, post.age, post.major, post.smoke, post.socialmediaid, post.socialmediaidtype, mbti, hobby, features, req.user.email]);
            return res.redirect('/myprofile')
        }else{
            await db.query('INSERT INTO userprofiles(email,name,sex,age,major,smoke,socialmediaid,socialmediaidtype,mbti,hobby,features) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[req.user.email,req.user.name,post.sex,post.age,post.major,post.smoke,post.socialmediaid,post.socialmediaidtype,mbti,hobby,features])
            await db.query('UPDATE users SET myprofile=? WHERE email=?',['O',req.user.email])
            return res.redirect('/myprofile')
        }
    }catch(error){
        console.error(error)
        next(error)
    }
}
exports.loveprofile = async(req,res,next) =>{
    try{
        let post = req.body;
        let mbti = post.mbti1+post.mbti2+post.mbti3+post.mbti4
        let features = post.features1+'/'+post.features2+'/'+post.features3
        let hobby = post.hobby1+'/'+post.hobby2+'/'+post.hobby3
        let exUser = await LoveProfile.findOne({
            where:{email:req.user.email}
        })
        if(exUser){
            await db.query('UPDATE loveprofiles SET email=?, sex=?, age=?, major=?, smoke=?, mbti=?, hobby=? ,features=? WHERE email=?', [req.user.email, post.sex, post.age ,post.major, post.smoke, mbti, hobby ,features, req.user.email]);
            return res.redirect('/myprofile')
        }else{
            await db.query('INSERT INTO loveprofiles(email,sex,age,major,smoke,mbti,hobby,features) VALUES(?,?,?,?,?,?,?,?)',[req.user.email,post.sex,post.age,post.major,post.smoke,mbti,hobby,features])
            return res.redirect('/myprofile')
        }
    }catch(error){
        console.error(error)
        next(error)
    }
}
exports.friendprofile = async(req,res,next) =>{
    try{
        let post = req.body;
        let mbti = post.mbti1+post.mbti2+post.mbti3+post.mbti4
        let hobby = post.hobby1+'/'+post.hobby2+'/'+post.hobby3
        let exUser = await FriendProfile.findOne({
            where:{email:req.user.email}
        })
        if(exUser){
            await db.query('UPDATE friendprofiles SET email=?, sex=?, age=?, smoke=? ,major=?, mbti=?, hobby=? WHERE email=?', [req.user.email, post.sex, post.age, post.smoke, post.major, mbti, hobby, req.user.email]);
            return res.redirect('/myprofile')
        }else{
            await db.query('INSERT INTO friendprofiles(email,sex,age,smoke,major,mbti,hobby) VALUES(?,?,?,?,?,?,?)',[req.user.email,post.sex,post.age,post.smoke,post.major,mbti,hobby])
            return res.redirect('/myprofile')
        }
    }catch(error){
        console.error(error)
        next(error)
    }
}
