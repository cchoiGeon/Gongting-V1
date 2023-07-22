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
        console.log('loveuserlist',loveuserlist)
        console.log('frienduserlist',frienduserlist)
        // let loveprofile='';
        // let friendprofile='';
        // if(loveuserlist){
        //     for(let i=0; i < loveuserlist.length; i++){
        //         loveprofile += `
        //         <tr>
        //             <td> ${loveuserlist[i].email}</td>
        //             <td> ${loveuserlist[i].sex}</td>
        //             <td> ${loveuserlist[i].age}</td>
        //             <td> ${loveuserlist[i].smoke}</td>
        //             <td> ${loveuserlist[i].major}</td>
        //             <td> ${loveuserlist[i].mbti}</td>
        //             <td> ${loveuserlist[i].hobby}</td>
        //             <td> ${loveuserlist[i].features}</td>
        //         </tr>
        //         `
        //     }   
        // }
        // if(frienduserlist){
        //     for(let i=0; i < frienduserlist.length; i++){
        //         friendprofile += `
        //         <tr>
        //             <td> ${frienduserlist[i].email}</td>
        //             <td> ${frienduserlist[i].sex}</td>
        //             <td> ${frienduserlist[i].age}</td>
        //             <td> ${frienduserlist[i].smoke}</td>
        //             <td> ${frienduserlist[i].major}</td>
        //             <td> ${frienduserlist[i].mbti}</td>
        //             <td> ${frienduserlist[i].hobby}</td>
        //         </tr>
        //         `
        //     }  
        // }
        // res.render('mysqlsubmit',{'loveprofile':loveprofile,'friendprofile':friendprofile})
    }catch(error){
        next(error)
    }
}
exports.lovealgorithm = (req,res) =>{
    
}
exports.friendalgorithm = (req,res) =>{
   
}