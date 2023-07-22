const Sequelize = require('sequelize');
const User = require('./user');
const LoveProfile = require('./loveprofile');
const FriendProfile = require('./friendprofile');
const UserProfile = require('./userprofile');
const Result = require('./result');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.UserProfile = UserProfile;
db.LoveProfile = LoveProfile;
db.FriendProfile = FriendProfile;
db.Result = Result;

User.initiate(sequelize);
UserProfile.initiate(sequelize);
LoveProfile.initiate(sequelize);
FriendProfile.initiate(sequelize);
Result.initiate(sequelize);

module.exports = db;
