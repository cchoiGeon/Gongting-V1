const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require("dotenv")
const morgan = require('morgan')
const helmet = require('helmet')
const hpp = require('hpp')
const redis = require('redis');
const RedisStore = require('connect-redis')(session)
// 버전 6.1.3에서는 session 함수가 사용 가능한데 7.0.0 이후부턴 코드가 바뀐 듯 알아봐야 될 듯
dotenv.config()
const passport = require('passport')
const passportConfig = require('./passport/index.js')
passportConfig()
const {sequelize} = require('./models/index.js')
const logger = require('./logger.js')
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode:true,
})
redisClient.connect().catch(console.error)
// 라우팅 불러오기
const pageRouter = require('./Router/page.js')
const authRouter = require('./Router/auth.js')
const settingRouter = require('./Router/setting.js')
const adminRouter = require('./Router/admin.js')
//set 메서드
app.set('view engine', 'ejs');
app.set('html',require('ejs').renderFile);
app.set('views', './views');
app.set('port',process.env.PORT||5000)

// sequelize 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

if(process.env.NODE_ENV === 'production'){
  app.enable('trust proxy')
  app.use(morgan('combined'))
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }))
  app.use(hpp())
}else{
  app.use(morgan('dev'))
}
//use 메서드
app.use(express.static('js')); // 정적파일들 불러오기 ex) 이미지, 동영상, css등 
app.use(express.static('css')); // 정적파일들 불러오기 ex) 이미지, 동영상, css등 
app.use(express.static('uploads')); // 이미지 올리는 곳 불러오기 
app.use(express.json()); // json 사용 가능하게 만들기 
app.use(cookieParser(process.env.COOKIE_SECRET)) 
app.use(bodyParser.urlencoded({ extended: false}));
const sessionOption = {
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly : true,
    secure : false,
  },
  store: new RedisStore({client: redisClient}),
}
if (process.env.NODE_ENV === 'production'){
  sessionOption.proxy = true;
}
app.use(session(sessionOption))
app.use(passport.initialize());
app.use(passport.session());

//라우팅
app.use('/',pageRouter)
app.use('/auth',authRouter)
app.use('/setting',settingRouter)
app.use('/admin',adminRouter)

/// 404 처리
app.use((req,res,next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404
  logger.info('404 error');
  logger.error(error.message)
  next(error)
})
/// error 처리
app.use((err,req,res,next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error')
})

module.exports = app;