"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mysql = require("mysql");
// mysql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    database: 'o2'
});
conn.connect();
exports.router = express.Router();
exports.router.get(['/'], (req, res) => {
    let sql = 'select * from projectlist';
    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;
        if (id) {
            let sql = 'select * from projectlist where id=?';
            conn.query(sql, [id], (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    res.render('projectList', { rows: rows });
                }
            });
        }
        else {
            res.render('projectList', { rows: rows });
        }
        for (let i = 0; i < rows.length; i++) {
            console.log(`id : ${rows[i].id}, title : ${rows[i].title}`);
        }
    });
});
exports.router.post('/', (req, res) => {
    res.render('index', {});
});
exports.router.get('/new', (req, res) => {
    res.render('prjAdd');
});
exports.router.post('new', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;
    let sql = 'insert into projectlist (title, author, description) VALUES(?,?,?)';
    let params = [title, author, description];
    conn.query(sql, params, (err, rows, fields) => {
        for (let i = 0; i < rows.length; i++) {
            console.log(`id : ${rows[i].id}, title : ${rows[i].title}`);
        }
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            res.render('/');
        }
    });
    /*let sql: string = 'select * from projectlist';

    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;

        for (let i = 0; i < rows.length; i++) {
            console.log(`id : ${rows[i].id}, title : ${rows[i].title}`);
        }
    });
    res.render('projectList', {});*/
});
//# sourceMappingURL=list.js.map