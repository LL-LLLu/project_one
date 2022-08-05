const db = require('../db/index');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../config');



exports.regUser = (req, res) => {
    
    const userinfo = req.body;
    const sqlStr = 'SELECT * FROM ev_users WHERE username = ?';

    db.query(sqlStr, userinfo.username, (err, data) => {
        if(err) {
            return res.cc(err);
        }
        if(data.length > 0){
            return res.cc(err);
        }

        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo)


    const sql = 'INSERT INTO ev_users SET ?';
    db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, data) => {
        if(err) {
            return res.cc(err);
        }
        if(data.affectedRows !== 1) {
            return res.cc(err);
        }
         res.send({status: 0, message: 'reguser success'});
        
    })
})
}





exports.login = (req, res) => {
    const userinfo = req.body;

    const sql = 'SELECT * FROM ev_users WHERE username = ?';

    db.query(sql, userinfo.username, (err, data) => {
        if(err) {
            return res.cc(err);
        }
        if(data.length !== 1) {
            return res.cc('username does not exist');
        }

        const isValid = bcrypt.compareSync(userinfo.password, data[0].password);

        if(!isValid) {
            return res.cc('password is not correct');
        }

        const user = {...data[0], password: undefined, user_pic: undefined};
        
        const token = jwt.sign(user, key.jwtSecrettKey, {expiresIn: key.expiresIn});
        res.send({status: 0, message: 'login success', token: 'Bearer ' + token});

        console.log(data[0], token)

    })

    

  
}


