import * as express from 'express';
import * as path from 'path';
// import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as index from './routes/index';
import * as users from './routes/users';
import * as auth from './routes/auth';
import * as list from './routes/prjList';
import * as reg from './routes/prjRegister';
import * as signup from './routes/signup';
import * as passport from "passport";

let mysqlstore: any = require('express-mysql-session');
let bkfd2Password = require('pbkdf2-password');


var app = express();

/*// let bkfd2Password = require('pbkdf2-password');
let hasher = bkfd2Password();
let opts = {password: 'helloworld'};
hasher(opts,(err,pass,salt,hash)=>{
    console.log(`${err}, ${pass}, ${salt},\n hash: ${hash}`);
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let sesStore = {
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    database: 'o2'
};


app.use(session({
    secret: 'i-love-everything-except-you',
    resave: false,
    // 접속마다 아이디를 발급한다  = resave
    // : 세션아이디를 실제로 사용하기전까지는 발급하지말아라
    saveUninitialized: true,
    // store: new RedisStore(store)
    store: new mysqlstore(sesStore)
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index.router);
app.use('/users', users.router);
app.use('/auth', auth.router);
app.use('/prjList', list.router);
app.use('/prjRegister', reg.router);
app.use('/signUp', signup.router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

