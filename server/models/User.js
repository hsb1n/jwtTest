const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10; //10자리 수 salt로 비밀번호를 암호화
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백 제거
        unique: 1 // 중복 제거
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //관리자
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //토큰 사용 유효기간
        type: Number
    },

})

// salt를 사용해서 비밀번호를 암호화 시키기 위해 salt 생성

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next();
            }) //(myPlainText)
        });
    } else { //만약 비번을 바꾸는게 아니라 다른걸 바꿀때
        next() //next()가 없으면 이 코드상에서만 머문다.
    }


}) // user모델의 정보를 저장하기 전   

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword 12345678  암호화된 비밀번호 $2b$10$5ZnkPkXEuI7/2dG6StawvehCrgiaKgDDFszKUTBd1CZTi9axOjV3C
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function (cb) {
    //jwt를 이용해서 토큰 가져오기
    let user = this;

    let token = jwt.sign(user._id.toHexString(), 'secretToken')

    /*  user._id + 'secretToken' = token // 이 두개가 있어야 토큰이 만들어짐 
     //'secretToken'을 넣으면 user._id가 나옴
     ->
     'secretToken' -> user._id */

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    let user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음 
        // 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })

    })
}
const User = mongoose.model('User', userSchema)

module.exports = { User }

// 사용자의 정보를 변경할때마다 비밀번호가 암호화되면 안 된다(비번 바꿀때만 변경되야지)