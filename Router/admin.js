const express = require('express');
const router = express.Router();

const {isadmin} = require('../controllers/auth')
const {adminpage, mysqlverify, mysqlsubmit, lovealgorithm,friendalgorithm} = require('../controllers/admin')
const {isLoggedIn} = require('../middlewares/index');


router.get('/',isLoggedIn,isadmin,adminpage)
router.get('/verify',isLoggedIn,isadmin,mysqlverify)
router.get('/submit',isLoggedIn,isadmin,mysqlsubmit)
router.get('/lovealgorithm',isLoggedIn,isadmin,lovealgorithm)
router.get('/friendalgorithm',isLoggedIn,isadmin,friendalgorithm)

module.exports = router