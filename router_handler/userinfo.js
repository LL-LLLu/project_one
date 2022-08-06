const db = require('../db/index');
const key = require('../config');
const bcrypt = require('bcryptjs');



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


exports.updateUserInfo = (req, res) => {
    
        const sql = 'UPDATE ev_users SET ? WHERE id = ?';
        const data = {
            id: req.body.id,
            nickname: req.body.nickname,
            email: req.body.email,
        };
        db.query(sql, [data, req.user.id], (err, data) => {
    
            if(err) {
                return res.cc(err);
            }
            if(data.affectedRows !== 1) {
                return res.cc('update userinfo error');
            }
            res.send({status: 0, imessage: 'update userinfo success', data: data[0]});
        } )
    }


exports.updatepwd = (req, res) => {
    const sql = 'select * from ev_users where id = ?';

    db.query(sql, req.user.id, (err, data) => {
        if(err) {
            return res.cc(err);
        }
        if(data.length !== 1) {
            return res.cc('username does not exist');
        }  

        const compareSync = bcrypt.compareSync(req.body.oldPwd, data[0].password);
        
        if(!compareSync) {
            return res.cc('old password is not correct');
        }

        const sqlpwd = 'UPDATE ev_users SET password = ? WHERE id = ?';

        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

        db.query(sqlpwd, [newPwd, req.user.id], (err, data) => {
            if(err) { 
            }
            if(data.affectedRows !== 1) {
                return res.cc('update password error');
            }
            res.send({status: 0, message: 'update password success'});

        } )


    } )
    
    }


    exports.updateAvatar = (req, res) => {

        const sql = 'UPDATE ev_users SET user_pic = ? WHERE id = ?';

        db.query(sql, [req.body.user_pic, req.user.id], (err, data) => {
            if(err){
                return res.cc(err);

            }
            if(data.affectedRows !== 1) {
                return res.cc('update avatar error');
            }
            res.send({status: 0, message: 'update avatar success'});
        } )

    }









