const express = require('express');
const router = express.Router();

const {isadmin} = require('../controllers/auth')
const {adminpage, mysqlsubmit, lovealgorithm,friendalgorithm} = require('../controllers/admin')
const {isLoggedIn} = require('../middlewares/index');


router.get('/',isLoggedIn,isadmin,adminpage)
router.get('/submit',isLoggedIn,isadmin,mysqlsubmit)
router.get('/lovealgorithm',isLoggedIn,isadmin,lovealgorithm)
router.get('/friendalgorithm',isLoggedIn,isadmin,friendalgorithm)

module.exports = router