"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
/* GET home page. */
exports.router.get('/login', (req, res) => {
    if (!req.session.displayName) {
        res.render('login', {
            title: 'Jejus Gorgeous',
            msg: 'hi session'
        });
    }
    else {
        res.redirect('/');
    }
});
exports.router.post('/login', (req, res) => {
    // FIXME : 실제로라면 디비데이터와 맞는지 작업 추가
    let user = {
        username: 'nw',
        password: '111',
        displayName: 'NW'
    };
    let uname = req.body.username;
    let pwd = req.body.password;
    if (user.username === uname && pwd === user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/');
    }
    else
        res.send(`failed.`);
});
exports.router.get('/logout', (req, res) => {
    delete req.session.displayName;
    res.redirect('/');
});
//# sourceMappingURL=auth.js.map