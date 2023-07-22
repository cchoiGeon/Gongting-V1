const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/index');
const {myprofileInfo,loveprofile,friendprofile} = require('../controllers/setting')

router.post('/myprofile',isLoggedIn,myprofileInfo)
router.post('/loveprofile',isLoggedIn,loveprofile)
router.post('/friendprofile',isLoggedIn,friendprofile)

module.exports = router