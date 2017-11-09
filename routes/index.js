"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
/* GET home page. */
exports.router.get('/', (req, res) => {
    let msg;
    if (req.session.displayName) {
        msg = req.session.displayName;
    }
    else
        msg = 'Visitor';
    console.log(`session length : ${req.session.count}`);
    res.render('index', {
        title: 'Jejus Gorgeous', msg: msg
    });
});
//# sourceMappingURL=index.js.map