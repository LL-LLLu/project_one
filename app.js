const express = require('express');
const app = express();
const cors = require('cors');
const joi = require('joi');

app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.cc = function(err, status = 1){
        res.send({
            status, 
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

const expressJWT = require('express-jwt');
const config = require('./config');

app.use(expressJWT({ secret: config.jwtSecrettKey }).unless({ path: [/^\/api/] }));

const userRouter = require('./router/user');
app.use('/api', userRouter);


const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc('identity verification failed');

    if (err.name === 'UnauthroizedError') return res.cc('token error')
    // 未知的错误
    res.cc(err)
  })




app.listen(3007, () => {
    console.log('Server is running on 127.0.0.1:3007');
    }
);