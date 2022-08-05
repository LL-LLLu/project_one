const express = require('express');

const user_handler = require('../router_handler/user');

const router = express.Router();

const expressjoi  = require('@escook/express-joi');

const {reg_login_schema} = require('../schema/user');

router.post('/reguser',expressjoi(reg_login_schema),  user_handler.regUser);

router.post('/login',expressjoi(reg_login_schema),  user_handler.login);






module.exports = router;
