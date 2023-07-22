const passport = require('passport');
const local = require('./localStrategy');
const {User} = require('../models/index')

module.exports = () => {
  passport.serializeUser((user, done) => { // 로그인 시 실행됨 , req.session 객체에 어떤 데이터를 저장할지 정하는 메서드 
    done(null, user.email); // user.id 는 deserializeUser 에 있는 첫 번째 인수로 감 -> id
  });

  passport.deserializeUser(async(email, done) => { // 각 요청마다 실행,  id 안에는 위에서 보내준 user.id 사용자 id가 담겨져있음
    let exUser = await User.findOne({
      where:{email}
    })
    if(exUser){
      done(null,exUser) // req.user을 만들어줌, req.user에는 사용자 정보가 담겨있음
    }  
    else{
      return done('error')// 없으면 에러 
    }
  })
  local();
};
