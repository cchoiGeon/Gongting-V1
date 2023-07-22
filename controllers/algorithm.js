// const { LoveProfile, UserProfile , Result} = require("../models");
// exports.lovealgorithm = ()=> async(req,res) =>{

//     // let User = LoveProfile.findOne({ // 매칭 하는 유저의 이상형 프로필 
//     //     where:{createAt}
//     // })
//     let User = LoveProfile.findOne({
//         order:[['createAt', 'DESC']]
//     })
//     // MatchedUser result에 쓰임
//     let MatchingUserName = User.findOne({ // 매칭 하는 유저의 이름
//         attributes:['name'],
//         where:{email:User.email},
//     })
//     let MatchingUser = UserProfile.findOne({ // 매칭 하는 유저의 profile -> 매칭 되는 사람한테 정보 주기 위함
//         where:{email:User.email}
//     })
    
//     // MatchingUser result에 쓰임
//     // User 안에는 email(매칭 유저), sex (이상형 성별) , age(이상형 나이), major(이상형 전공), mbti(이상형 mbti),hobby,features(이상형 특징)
//     let MatchedUser = UserProfile.findOne({
//         where:{sex:User.sex,age:User.age,major:User.major,mbti:User.mbti,hobby:User.hobby,features:User.features}
//     })
//     let MatchedUserName =  User.findOne({
//         attributes:['name'],
//         },{
//         where:{email:MatchedUser.email}
//     })

//     let MatchedUser2 = UserProfile.findOne({
//         where:{sex:User.sex,major:User.major,mbti:User.mbti,hobby:User.hobby,features:User.features}
//     })
//     let MatchedUser2Name =  User.findOne({
//         attributes:['name'],
//         },{
//         where:{email:MatchedUser2.email}
//     })

//     let MatchedUser3 = UserProfile.findOne({
//         where:{sex:User.sex,mbti:User.mbti,hobby:User.hobby,features:User.features}
//     })
//     let MatchedUser3Name =  User.findOne({
//         attributes:['name'],
//         },{
//         where:{email:MatchedUser3.email}
//     })

//     let MatchedUser4 = UserProfile.findOne({
//         where:{sex:User.sex,hobby:User.hobby,features:User.features}
//     })
//     let MatchedUser4Name =  User.findOne({
//         attributes:['name'],
//         },{
//         where:{email:MatchedUser4.email}
//     })

//     let MatchedUser5 = UserProfile.findOne({
//         where:{sex:User.sex,features:User.features}
//     })
//     let MatchedUser5Name =  User.findOne({
//         attributes:['name'],
//         },{
//         where:{email:MatchedUser5.email}
//     })

//     if(!MatchedUser&&!MatchedUser2&&!MatchedUser3&&!MatchedUser4){ // 성별,특징 MatchedUser5
//         await Result.create({ // MatchedUser 매칭 되는 유저 -> 매칭 하는 유저
//             email:MatchingUser.email,
//             name: MatchedUser5Name,
//             sex:MatchedUser5.sex,
//             major:MatchedUser5.major,
//             mbti:MatchedUser5.mbti,
//             hobby:MatchedUser5.hobby,
//             features:MatchedUser5.features,
//             socialmediaid:MatchedUser5.socialmediaid,
//             socialmediaidtype:MatchedUser5.socialmediaidtype,
//         })
//         await Result.create({ // MatchingUser 매칭 하는 유저 정보 -> 매칭 되는 유저
//             email:MatchedUser5.email,
//             name: MatchingUserName,
//             sex: MatchingUser.sex,
//             major: MatchingUser.major,
//             mbti : MatchingUser.mbti,
//             hobby: MatchingUser.hobby,
//             features: MatchingUser.features,
//             socialmediaid: MatchingUser.socialmediaid,
//             socialmediaidtype: MatchingUser.socialmediaidtype,
//         })
        
//     }else if(!MatchedUser&&!MatchedUser2&&!MatchedUser3){ // 성별, 특징, 취미  MatchedUser4
//         await Result.create({ // MatchedUser 매칭 되는 유저 -> 매칭 하는 유저
//             email:User.email,
//             name: MatchedUser4Name,
//             sex:MatchedUser4.sex,
//             major:MatchedUser4.major,
//             mbti:MatchedUser4.mbti,
//             hobby:MatchedUser4.hobby,
//             features:MatchedUser5.features,
//             socialmediaid:MatchedUser4.socialmediaid,
//             socialmediaidtype:MatchedUser4.socialmediaidtype,
//         })
//         await Result.create({ // MatchingUser 매칭 하는 유저 정보 -> 매칭 되는 유저
//             email:MatchedUser5.email,
//             name: MatchingUserName,
//             sex: MatchingUser.sex,
//             major: MatchingUser.major,
//             mbti : MatchingUser.mbti,
//             hobby: MatchingUser.hobby,
//             features: MatchingUser.features,
//             socialmediaid: MatchingUser.socialmediaid,
//             socialmediaidtype: MatchingUser.socialmediaidtype,
//         })
//     }else if(!MatchedUser&&!MatchedUser2){ // 성별, 특징, 취미 ,mbti가 같을 때 MatchedUser3
//         await Result.create({ // MatchedUser 매칭 되는 유저 -> 매칭 하는 유저
//             email:User.email,
//             name: MatchedUser3Name,
//             sex:MatchedUser3.sex,
//             major:MatchedUser3.major,
//             mbti:MatchedUser3.mbti,
//             hobby:MatchedUser3.hobby,
//             features:MatchedUser5.features,
//             socialmediaid:MatchedUser3.socialmediaid,
//             socialmediaidtype:MatchedUser3.socialmediaidtype,
//         })
//         await Result.create({ // MatchingUser 매칭 하는 유저 정보 -> 매칭 되는 유저
//             email:MatchedUser5.email,
//             name: MatchingUserName,
//             sex: MatchingUser.sex,
//             major: MatchingUser.major,
//             mbti : MatchingUser.mbti,
//             hobby: MatchingUser.hobby,
//             features: MatchingUser.features,
//             socialmediaid: MatchingUser.socialmediaid,
//             socialmediaidtype: MatchingUser.socialmediaidtype,
//         })
//     }else if(!MatchedUser){ // 성별, 특징, 취미, mbti, 전공이 같을 때 MatchedUser2
//         await Result.create({ // MatchedUser 매칭 되는 유저 -> 매칭 하는 유저
//             email:User.email,
//             name: MatchedUser2Name,
//             sex:MatchedUser2.sex,
//             major:MatchedUser2.major,
//             mbti:MatchedUser2.mbti,
//             hobby:MatchedUser2.hobby,
//             features:MatchedUser5.features,
//             socialmediaid:MatchedUser2.socialmediaid,
//             socialmediaidtype:MatchedUser2.socialmediaidtype,
//         })
//         await Result.create({ // MatchingUser 매칭 하는 유저 정보 -> 매칭 되는 유저
//             email:MatchedUser5.email,
//             name: MatchingUserName,
//             sex: MatchingUser.sex,
//             major: MatchingUser.major,
//             mbti : MatchingUser.mbti,
//             hobby: MatchingUser.hobby,
//             features: MatchingUser.features,
//             socialmediaid: MatchingUser.socialmediaid,
//             socialmediaidtype: MatchingUser.socialmediaidtype,
//         })
//     }else{ // 다 같을 때
//         await Result.create({  // MatchedUser 매칭 되는 유저 -> 매칭 하는 유저
//             email:User.email,
//             name: MatchedUserName,
//             sex:MatchedUser.sex,
//             major:MatchedUser.major,
//             mbti:MatchedUser.mbti,
//             hobby:MatchedUser.hobby,
//             features:MatchedUser5.features,
//             socialmediaid:MatchedUser.socialmediaid,
//             socialmediaidtype:MatchedUser.socialmediaidtype,
//         })
//         await Result.create({ // MatchingUser 매칭 하는 유저 정보 -> 매칭 되는 유저
//             email:MatchedUser5.email,
//             name: MatchingUserName,
//             sex: MatchingUser.sex,
//             major: MatchingUser.major,
//             mbti : MatchingUser.mbti,
//             hobby: MatchingUser.hobby,
//             features: MatchingUser.features,
//             socialmediaid: MatchingUser.socialmediaid,
//             socialmediaidtype: MatchingUser.socialmediaidtype,
//         })
//     }    
// }
// exports.friendalgorithm = () => (req,res) =>{
    
// }