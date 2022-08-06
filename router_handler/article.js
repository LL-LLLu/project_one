const db = require('../db/index');

const path = require('path');


exports.addArticle = (req, res) => {
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover page is required')

    const articleInfo = {
        ...req.body,
        author_id: req.user.id,
        pub_date: new Date(),
        cover_img: path.join('/uploads', req.file.filename),
    }


    
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('adding article failed')
        res.cc('article publish success', 0)
    })


}