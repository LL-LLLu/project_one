
const joi = require('joi')


const username =  joi.string().alphanum().min(1).max(10).required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()

const nickname = joi.string().min(1).max(10).required()

const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()


exports.update_avatar_schema = ({
    body:
        {
            avatar
        }
})


exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email}
    }

exports.reg_login_schema = {
    body: {username,
    password}
}

exports.updatepwd_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).required(),
    }
}
