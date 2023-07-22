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

exports.abcd = async(req,res,next)=>{
    try{
        let User = (await db.query('SELECT * FROM loveprofiles ORDER BY id ASC LIMIT 1'))[0][0];
        let MatchingUser = (await db.query('SELECT * FROM userprofiles WHERE email=?', [User.email]))[0][0];
        let MatchedUser = (await db.query('SELECT * FROM userprofiles WHERE sex=? and age=? and smoke=? and major=? and mbti=? and hobby=? and features=?', [User.sex, User.age, User.smoke, User.major, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser2 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and major=? and mbti=? and hobby=? and features=?', [User.sex, User.smoke, User.major, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser3 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and mbti=? and hobby=? and features=?', [User.sex, User.smoke, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser4 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and hobby=? and features=?', [User.sex, User.smoke, User.hobby, User.features]))[0][0];
        let MatchedUser5 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and features=?', [User.sex, User.smoke, User.features]))[0][0];
        if (!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4) { // 성별, 특징 MatchedUser5
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser5.name, MatchedUser5.sex, MatchedUser5.age, MatchedUser5.smoke ,MatchedUser5.major, MatchedUser5.mbti, MatchedUser5.hobby, MatchedUser5.features, MatchedUser.socialmediaid, MatchedUser.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser5.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser && !MatchedUser2 && !MatchedUser3) { // 성별, 특징, 취미 MatchedUser4
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser4.name, MatchedUser4.sex, MatchedUser4.age, MatchedUser5.smoke , MatchedUser4.major, MatchedUser4.mbti, MatchedUser4.hobby, MatchedUser4.features, MatchedUser4.socialmediaid, MatchedUser4.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser4.email, MatchingUser.Name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser && !MatchedUser2) { // 성별, 특징, 취미, mbti가 같을 때 MatchedUser3
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser3.name, MatchedUser3.sex, MatchedUser3.age,  MatchedUser5.smoke ,MatchedUser3.major, MatchedUser3.mbti, MatchedUser3.hobby, MatchedUser3.features, MatchedUser3.socialmediaid, MatchedUser3.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser3.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser) { // 성별, 특징, 취미, mbti, 전공이 같을 때 MatchedUser2
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser2.name, MatchedUser2.sex, MatchedUser2.age,  MatchedUser5.smoke ,MatchedUser2.major, MatchedUser2.mbti, MatchedUser2.hobby, MatchedUser2.features, MatchedUser2.socialmediaid, MatchedUser2.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser2.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else { // 다 같을 때
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser.name, MatchedUser.sex, MatchedUser.age,  MatchedUser5.smoke ,MatchedUser.major, MatchedUser.mbti, MatchedUser.hobby, MatchedUser.features, MatchedUser.socialmediaid, MatchedUser.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        }
    }catch(error){
        next(error)
    }   
}