"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
exports.router.get('/', (req, res) => {
    console.log(`execution? : ${req.session.count}`);
    console.log(`req : ${req}`);
    console.log(`req session : ${req.session}`);
    console.log(`req session : ${req.session}`);
    res.send('result : ' + req.session.count);
});
//# sourceMappingURL=users.js.map