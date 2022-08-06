const express = require('express');
const router = express.Router();
const article_handler = require('../router_handler/artcate');
const expressjoi  = require('@escook/express-joi');
const {add_article_Cat_schema, delete_article_Cat_schema, update_article_Cat_schema} = require('../schema/artcate');

router.get('/cates', article_handler.getArtCate);

router.post('/addcates',expressjoi(add_article_Cat_schema), article_handler.addcates);

router.post('/deletecate/:id',expressjoi(delete_article_Cat_schema), article_handler.deleteCatesById);

router.get('/cates/:id',expressjoi(delete_article_Cat_schema), article_handler.getArtCateById);

router.post('/updatecate', expressjoi(update_article_Cat_schema), article_handler.updateCates);


module.exports = router;