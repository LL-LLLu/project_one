const joi = require('joi')

const title = joi.string().required()

const cate_id = joi.number().integer().min(1).required()

const content = joi.string().required()

const state = joi.string().valid('published', 'draft').required()

exports. add_article_schema = ({
    body: {
        title,
        cate_id,
        content,
        state,
    }
})