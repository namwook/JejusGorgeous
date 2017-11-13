import * as express from 'express';
import {Request, Response} from "express";
import * as passport from "passport";
import * as passportLocal from 'passport-local';
// import * as twitterStrategy from 'passport-twitter';
import mysql = require('mysql');

// mysql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    database: 'o2'
});

let bkfd2Password = require('pbkdf2-password');
let hasher = bkfd2Password();

export const router = express.Router();

//todo: array가 아니라, mysql에 회원 정보를 저장하여 회원이 맞을 경우에만 유저의 정보를 저장하는 기능 만들기.
let users = [{
    id: 1,
    username: 'nw',
    password: '111',
    displayName: 'NW'
}];

router.get('/login', (req: Request, res: Response) => {
    console.log(`req.user : ${req}`);
    if (!req.user) {
        res.render('login', {
            title: 'Jejus Gorgeous'
        });
    } else {
        res.redirect('/');
    }
});

passport.serializeUser((user, done) => {
    console.log('serializer username : ', user.username);
    return done(null, user.username);
});

passport.deserializeUser((id, done) => {
    console.log('deserializer id:', id);
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.username === id) {
            return done(null, user);
        }
    }
});

router.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: false
        }
    )
);

passport.use(
    new passportLocal.Strategy(
        (username, password, done) => {
            let user = {
                username: username,
                password: password
            };

            for (let i = 0; i < users.length; i++) {
                if (user.username === users[i].username && user.password === users[i].password) {
                    console.log(`localstrategy ${user}`);
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
            done(null, false);
        }
    )
);


/*router.post('/login', (req: Request, res: Response) => {
    // FIXME : 실제로라면 디비데이터와 맞는지 작업 추가
    // FIXME: USER의 PASSWORD값에 암호화된 문자열이 들어가기때문에 로그인 못함 -> 미리 만들어뒀다면 가능한데 나는 완벽하게 처리하고싶음 이거 방법 찾아야됨.
    if (!req.session.displayName) {
        hasher({password:req.body.password},(err, pass, salt, hash) => {
            let uname = req.body.username;
            for (let i in users) {
                if (users[i].username === uname && pass === users[i].password) {
                    req.session.displayName = users[i].displayName;
                    res.redirect('/');
                }
            }
        });
    } else {
        res.redirect('/');
    }
});*/

router.get('/logout', (req: Request, res: Response) => {
    req.logOut();
    req.session.save(() => {
        res.redirect('/');
    });
});

router.get('/register', (req: Request, res: Response) => {
    console.log(`get method : ${req.path}`);
    res.render('signUp');
});


router.post('/register', (req: Request, res: Response) => {
    //FIXME : 이미 회원이 있는지 없는지 체크해야함
    let username = req.body.username;
    let password = req.body.password;
    let displayName = req.body.displayName;
    // let email = req.body.email;

    // language=MySQL
    let sql: string = 'SELECT * FROM members;';

    conn.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            for (let list in rows) {
                if (username === rows[list].username) {
                    return res.redirect('/auth/login');
                }
            }

            // language=MySQL
            sql = 'INSERT INTO memebers (username, password, displayName) VALUES(?,?,?)';
            let params = [username, password, displayName];
            conn.query(sql, (err, add_data, fields) => {
                hasher({password: req.body.password}, (err, pass, salt, hash) => {
                    req.login(rows[0], (err) => {
                        // if (err) { }
                        req.session.save(() => {
                            res.redirect('/');
                        });
                    });
                    req.session.displayName = rows[0].displayName;

                });
            });
        }
    });


});