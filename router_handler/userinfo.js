const db = require('../db/index');
const key = require('../config');


exports.getUserInfo = (req, res) => {

    const sql = 'SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id = ?';

    db.query(sql, req.user.id, (err, data) => {

        if(err) {
            return res.cc('get userinfo error');
        }
        if(data.length !== 1) {
            return res.cc('username does not exist');
        }
        res.send({status: 0, message: 'get userinfo success', data: data[0]});
    })

};


