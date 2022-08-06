const db = require('../db/index');



exports.getArtCate = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate';
    db.query(sql, (err, data) => {
        if(err) {
            return res.cc(err);
        }
        if(data.length === 0) {
            return res.cc('no data');
        }
        res.send({status: 0, message: 'get artcate success', data:data[0]});
    } )
}

exports.addcates = (req, res) => {

    const sql = 'select * from ev_article_cate where name = ? or alias = ?'

    db.query(sql, [req.body.name, req.body.alias], (err, data) => {
        if(err) return res.cc(err);
        if(data.length === 2) return res.cc('name and alias are both taken')
        if(data.length === 1 && data[0].name === req.body.name && data[0].alias === req.body.alias) return res.cc('name and alias are both taken')
        if(data.length === 1 && data[0].name === req.body.name) return res.cc('name is taken')
        if(data.length === 1 && data[0].alias === req.body.alias) return res.cc('alias is taken')
        
        
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, data) => {
            if(err) return res.cc(err);
            if(data.affectedRows !== 1) return res.cc('add artcate failed')
            res.send({status: 1, message: 'add artcate failed'})
        } )

    } )
}


exports.deleteCatesById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql, [req.params.id], (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('delete artcate failed')
        res.send({status: 1, message: 'delete article success'})
    })
}

exports.getArtCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id = ?'

    db.query(sql, [req.params.id], (err, data) => {
        if(err) return res.cc(err);
        if(data.length === 0) return res.cc('no data')
        console.log(data)
        res.send({status: 0, message: 'get artcate success', data:data[0]})
    } )
}


exports.updateCates = (req, res) => {
    const sql = 'select * from ev_article_cate where id<>? and (name = ? or alias = ?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, data) => {
        if(err) return res.cc(err)

        if (data.length === 2) return res.cc('name and alias are both taken！')
        if (data.length === 1 && data[0].name === req.body.name && data[0].alias === req.body.alias) return res.cc('name and alias are both taken')
        if (data.length === 1 && data[0].name === req.body.name) return res.cc('name is taken')
        if (data.length === 1 && data[0].alias === req.body.alias) return res.cc('alias is taken')
    
        
        if(data.affectedRows === 1) return res.cc('update artcate success')
       
        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql, [req.body, req.body.id], (err, data) => {
            if(err) return res.cc(err)
            if(data.affectedRows !== 1) return res.cc('update artcate failed')
            res.cc('update artcate success')
        })
    } )
}