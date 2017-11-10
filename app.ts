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
import * as signUp from './routes/signUp';

var app = express();


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

app.use(session({
    secret: 'i-love-everything-except-you',
    resave: false,
    // 접속마다 아이디를 발급한다  = resave
    saveUninitialized: true
    // : 세션아이디를 실제로 사용하기전까지는 발급하지말아라
}));

app.use('/', index.router);
app.use('/users', users.router);
app.use('/auth', auth.router);
app.use('/prjList', list.router);
app.use('/prjRegister', reg.router);
app.use('/signUp', signUp.router);


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

