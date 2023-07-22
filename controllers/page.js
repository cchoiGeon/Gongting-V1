const { compile } = require("ejs")
const Result = require('../models/result')
const LoveProfile = require('../models/loveprofile')
const UserProfile = require('../models/userprofile')
const Users = require('../models/user')
const db = require('../db')
exports.homepage = async (req,res,next) =>{
    try{
        let user = await db.query('SELECT * FROM users WHERE email=?',[req.user.email])
        user = user[0]
        if(user[0].myprofile === 'X'){
            return res.redirect('/gomyprofilesetting')
        }
        res.render('home')
    }
    catch(error){
        next(error)
    }
}
exports.intropage = (req,res) =>{
    res.render('intro')
}

exports.gopage = (req,res) => {
    res.render('gomyprofilesetting')
}

exports.loginpage = (req,res) =>{
    res.render('login')
}
exports.signuppage = (req,res) =>{
    res.render('signup')
}


exports.myprofilepage = async(req,res,next) =>{
    try{
        let submit
        let complete
        let wait 
        if(req.user.statusmatch == 1){
            submit = 1
            complete = 0
            wait = 1
        }else if (req.user.statusmatch == 2){
            submit = 1
            complete = 1
            wait = 0
        }else{
            submit = 0
            complete = 0
            wait = 0
        }
        // db에 애초에 submit complete wait 을 만들어놓자 
        res.render('myprofile',{'username':req.user.name,'submit': submit,'complete':complete,'wait':wait,'verify': req.user.studentcard})
    }catch(error){
        console.error(error)
        next(error)
    }
}
exports.matching = (req,res) =>{
    res.render('matching')
}
exports.matchingresult = async(req,res,next) =>{
    try{
        let MatchedUser = await Result.findOne({
            where:{email:req.user.email}
        })
        if(MatchedUser){
            return res.render('matchingresult',{'matchingresult':true,'username':req.user.name,'matchedname':MatchedUser.name,'matchedsex':MatchedUser.sex,
            'matchedmajor':MatchedUser.major,'matchedmbti':MatchedUser.mbti,'matchedhobby':MatchedUser.hobby,'matchedfeatures':MatchedUser.features,
            'matchedsocialmediatype':MatchedUser.socialmediatype,'matchedsocialmediaid':MatchedUser.socialmediaid})
        }else{
            return res.render('matchingresult',{'matchingresult':false})
        }
    }catch(error){  
        next(error)
    }
}
exports.myprofilesetting = (req,res) =>{
    res.render('myprofileset')
}
exports.lovematching = (req,res) =>{
    res.render('lovematching')
}
exports.friendmatching = (req,res) =>{
    res.render('friendmatching')
}

exports.verify = (req,res) =>{
    res.render('verify')
}
