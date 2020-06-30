const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlength : 50
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
    role : { //관리자
        type: Number,
        default : 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{ //토큰 사용 유효기간
        type: Number
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = {User}