const express = require('express');
const multer = require("multer");
const path = require('path')
const { loginprocess,logoutprocess,signupprocess,verifyprocess } = require('../controllers/auth');
const {isLoggedIn,isNotLoggedIn} = require('../middlewares/index')
const cookieParser = require('cookie-parser')
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null,path.basename(file.originalname,ext) + "-" + Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
})
const upload = multer({storage: storage})
router.use(cookieParser())
router.use(express.static('uploads'));

router.post('/login',isNotLoggedIn,loginprocess) //process
router.get('/logout',isLoggedIn,logoutprocess)
router.post('/signup',isNotLoggedIn,signupprocess)
router.post('/verify',upload.single('card'),isLoggedIn,verifyprocess)

module.exports = router