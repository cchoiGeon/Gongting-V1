const { compile } = require("ejs")
const db = require('../db')
const User = require('../models/user')
const LoveProfile = require('../models/loveprofile')
const FriendProfile = require('../models/friendprofile')

exports.adminpage = (req,res) =>{
    res.render('admin')
}
exports.mysqlverify = async(req,res) =>{
    try{
        let userlist = await User.findAll({})
        let tables;
        for(let i=0; i < userlist.length; i++){
            tables += `
            <tr>
                <td> ${userlist[i].name}</td>
                <td> ${userlist[i].email}</td>
                <td> ${userlist[i].studentnum}</td>
                <td> ${userlist[i].studentcard}</td>
                <td> ${userlist[i].studentcardroot}</td>
            </tr>
            `
        }
        res.render('mysqlverify',{'tables':tables})
    }catch(error){
        next(error)
    }
}
exports.mysqlsubmit = async(req,res,next) =>{
    try{
        let loveuserlist = await LoveProfile.findAll({})
        let frienduserlist = await FriendProfile.findAll({})
        let loveprofile='';
        let friendprofile='';
        if(loveuserlist){
            for(let i=0; i < loveuserlist.length; i++){
                loveprofile += `
                <tr>
                    <td> ${loveuserlist[i].email}</td>
                    <td> ${loveuserlist[i].sex}</td>
                    <td> ${loveuserlist[i].age}</td>
                    <td> ${loveuserlist[i].smoke}</td>
                    <td> ${loveuserlist[i].major}</td>
                    <td> ${loveuserlist[i].mbti}</td>
                    <td> ${loveuserlist[i].hobby}</td>
                    <td> ${loveuserlist[i].features}</td>
                </tr>
                `
            }   
        }
        if(frienduserlist){
            for(let i=0; i < frienduserlist.length; i++){
                friendprofile += `
                <tr>
                    <td> ${frienduserlist[i].email}</td>
                    <td> ${frienduserlist[i].sex}</td>
                    <td> ${frienduserlist[i].age}</td>
                    <td> ${frienduserlist[i].smoke}</td>
                    <td> ${frienduserlist[i].major}</td>
                    <td> ${frienduserlist[i].mbti}</td>
                    <td> ${frienduserlist[i].hobby}</td>
                </tr>
                `
            }  
        }
        res.render('mysqlsubmit',{'loveprofile':loveprofile,'friendprofile':friendprofile})
    }catch(error){
        next(error)
    }
}
exports.lovealgorithm = async(req,res,next) =>{
    try{
        let User = (await db.query('SELECT * FROM loveprofiles ORDER BY id ASC LIMIT 1'))[0][0];
        let MatchingUser = (await db.query('SELECT * FROM userprofiles WHERE email=?', [User.email]))[0][0];
        let MatchedUser = (await db.query('SELECT * FROM userprofiles WHERE sex=? and age=? and smoke=? and major=? and mbti=? and hobby=? and features=?', [User.sex, User.age, User.smoke, User.major, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser2 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and major=? and mbti=? and hobby=? and features=?', [User.sex, User.smoke, User.major, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser3 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and major=? and mbti=? and hobby=? and features=?', [User.sex, User.major, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser4 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and mbti=? and hobby=? and features=?', [User.sex, User.mbti, User.hobby, User.features]))[0][0];
        let MatchedUser5 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and hobby=? and features=?', [User.sex, User.hobby, User.features]))[0][0];
        let MatchedUser6 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and features=?', [User.sex, User.features]))[0][0];
        let MatchedUser7 = (await db.query('SELECT * FROM userprofiles WHERE sex=?', [User.sex]))[0][0];
        if(!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4 && !MatchedUser5 && !MatchedUser6){
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser7.name, MatchedUser7.sex, MatchedUser7.age, MatchedUser7.smoke ,MatchedUser7.major, MatchedUser7.mbti, MatchedUser7.hobby, MatchedUser7.features, MatchedUser7.socialmediaid, MatchedUser7.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser7.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        }
        else if(!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4 && !MatchedUser5){
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser6.name, MatchedUser6.sex, MatchedUser6.age, MatchedUser6.smoke ,MatchedUser6.major, MatchedUser6.mbti, MatchedUser6.hobby, MatchedUser6.features, MatchedUser6.socialmediaid, MatchedUser6.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser6.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, MatchingUser.features, MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        }
        else if (!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4) { // 성별, 특징 MatchedUser5
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser5.name, MatchedUser5.sex, MatchedUser5.age, MatchedUser5.smoke ,MatchedUser5.major, MatchedUser5.mbti, MatchedUser5.hobby, MatchedUser5.features, MatchedUser5.socialmediaid, MatchedUser5.socialmediaidtype]);
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
exports.friendalgorithm = async(req,res,next) =>{
    try{
        let User = (await db.query('SELECT * FROM friendprofiles ORDER BY id ASC LIMIT 1'))[0][0];
        let MatchingUser = (await db.query('SELECT * FROM userprofiles WHERE email=?', [User.email]))[0][0];
        let MatchedUser = (await db.query('SELECT * FROM userprofiles WHERE sex=? and age=? and smoke=? and major=? and mbti=? and hobby=?', [User.sex, User.age, User.smoke, User.major, User.mbti, User.hobby]))[0][0];
        let MatchedUser2 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and major=? and mbti=? and hobby=?', [User.sex, User.smoke, User.major, User.mbti, User.hobby]))[0][0];
        let MatchedUser3 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and mbti=? and hobby=?', [User.sex, User.major, User.mbti, User.hobby]))[0][0];
        let MatchedUser4 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and smoke=? and hobby=?', [User.sex, User.mbti, User.hobby]))[0][0];
        let MatchedUser5 = (await db.query('SELECT * FROM userprofiles WHERE sex=? and hobby=?', [User.sex, User.hobby]))[0][0];
        let MatchedUser6 = (await db.query('SELECT * FROM userprofiles WHERE sex=?', [User.sex]))[0][0];
        if(!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4 && !MatchedUser5){
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser6.name, MatchedUser6.sex, MatchedUser6.age, MatchedUser6.smoke ,MatchedUser6.major, MatchedUser6.mbti, MatchedUser6.hobby, 'X', MatchedUser6.socialmediaid, MatchedUser6.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser6.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, 'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        }
        else if (!MatchedUser && !MatchedUser2 && !MatchedUser3 && !MatchedUser4) { // 성별, 특징 MatchedUser5
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser5.name, MatchedUser5.sex, MatchedUser5.age, MatchedUser5.smoke ,MatchedUser5.major, MatchedUser5.mbti, MatchedUser5.hobby, 'X', MatchedUser5.socialmediaid, MatchedUser5.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser5.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, 'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser && !MatchedUser2 && !MatchedUser3) { // 성별, 특징, 취미 MatchedUser4
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser4.name, MatchedUser4.sex, MatchedUser4.age, MatchedUser5.smoke , MatchedUser4.major, MatchedUser4.mbti, MatchedUser4.hobby, 'X', MatchedUser4.socialmediaid, MatchedUser4.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser4.email, MatchingUser.Name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, 'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser && !MatchedUser2) { // 성별, 특징, 취미, mbti가 같을 때 MatchedUser3
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser3.name, MatchedUser3.sex, MatchedUser3.age,  MatchedUser5.smoke ,MatchedUser3.major, MatchedUser3.mbti, MatchedUser3.hobby, 'X', MatchedUser3.socialmediaid, MatchedUser3.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser3.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, 'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else if (!MatchedUser) { // 성별, 특징, 취미, mbti, 전공이 같을 때 MatchedUser2
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser2.name, MatchedUser2.sex, MatchedUser2.age,  MatchedUser5.smoke ,MatchedUser2.major, MatchedUser2.mbti, MatchedUser2.hobby,'X', MatchedUser2.socialmediaid, MatchedUser2.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser2.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby, 'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        } else { // 다 같을 때
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User.email, MatchedUser.name, MatchedUser.sex, MatchedUser.age,  MatchedUser5.smoke ,MatchedUser.major, MatchedUser.mbti, MatchedUser.hobby,'X', MatchedUser.socialmediaid, MatchedUser.socialmediaidtype]);
            await db.query('INSERT INTO results(email,name,sex,age,smoke,major,mbti,hobby,features,socialmediaid,socialmediatype) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [MatchedUser.email, MatchingUser.name, MatchingUser.sex, MatchingUser.age, MatchingUser.smoke ,MatchingUser.major, MatchingUser.mbti, MatchingUser.hobby,'X', MatchingUser.socialmediaid, MatchingUser.socialmediaidtype]);
            return res.redirect('/')
        }
    }catch(error){
        next(error)
    }   
}