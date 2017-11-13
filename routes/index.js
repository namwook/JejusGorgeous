"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
/* GET home page. */
exports.router.get('/', (req, res) => {
    //todo: mysql에 회원 정보를 저장하여 회원이 맞을 경우에만 유저의 정보를 저장하는 기능 만들기.
    let msg;
    if (req.session.passport.user) {
        msg = req.session.passport.user;
    }
    else
        msg = 'Visitor. 비밀번호 암호화 기능 고치고있기 때문에 현재 로그인이 가능하지 않아요;)';
    console.log(`session id : ${req.session.id}, session cookie : ${req.session.passport.user}`);
    res.render('index', {
        title: 'Jejus Gorgeous', msg: msg
    });
});
//# sourceMappingURL=index.js.map