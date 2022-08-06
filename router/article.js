const express = require('express')

const router = express.Router()

const multer = require('multer')

const path = require('path')

const uploads = multer({dest: path.join(__dirname, '../uploads')})

const article_handler = require('../router_handler/article')

const expressjoi = require('@escook/express-joi')

const {add_article_schema} = require('../schema/article')

router.post('/add',uploads.single('cover_img'), expressjoi(add_article_schema), article_handler.addArticle)

module.exports = router;
