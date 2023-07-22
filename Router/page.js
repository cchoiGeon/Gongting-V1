const express = require('express');
const router = express.Router();


const {homepage,loginpage,signuppage,intropage,myprofilepage,matching,matchingresult,myprofilesetting,verify, lovematching, friendmatching, gopage} = require('../controllers/page')
const {isLoggedIn,isNotLoggedIn} = require('../middlewares/index');
const {isverify} = require('../controllers/auth')

router.use(express.static('css')); // 정적파일들 불러오기 ex) 이미지, 동영상, css등 
router.use(express.static('css')); // 정적파일들 불러오기 ex) 이미지, 동영상, css등 

router.get('/',isLoggedIn,homepage)
router.get('/intro',isNotLoggedIn,intropage)

router.get('/login',isNotLoggedIn,loginpage)
router.get('/signup',isNotLoggedIn,signuppage)

router.get('/gomyprofilesetting',isLoggedIn,gopage)
router.get('/myprofile',isLoggedIn,myprofilepage)
router.get('/matching',isLoggedIn,matching)
router.get('/matchingresult',isLoggedIn,matchingresult)

router.get('/myprofilesetting',isLoggedIn,myprofilesetting)
router.get('/lovematching',isLoggedIn,isverify,lovematching)
router.get('/friendmatching',isLoggedIn,isverify,friendmatching)

router.get('/verify',isLoggedIn,verify)

module.exports = router