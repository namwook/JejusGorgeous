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
exports.router.get(['/', '/:id'], (req, res) => {
    let sql = 'select * from projectlist;';
    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;
        console.log(`id : ${id}`);
        if (id) {
            console.log(`id : ${id}`);
            let sql = 'select * from projectlist where id=?;';
            conn.query(sql, [id], (err, prj_item, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    let rows = new Array();
                    for (let i = 0; i < prj_item.length; i++) {
                        console.log(`rows : ${prj_item[i].id}, ${prj_item[i].title}`);
                    }
                    res.render('prjList', { rows: prj_item, row: prj_item[0], id: prj_item[0].id });
                }
            });
        }
        else {
            res.render('prjList', { rows: rows });
        }
    });
});
exports.router.post('/:id', (req, res) => {
    let sql = 'select * from projectlist;';
    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;
        if (id) {
            let title = req.body.title;
            let author = req.body.author;
            let description = req.body.description;
            let sql = 'update projectlist set title=?, author=?, description=? where id=?;';
            let params = [title, author, description, id];
            conn.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    let sql2 = 'select * from projectlist where id=?;';
                    conn.query(sql2, id, (err, data, fields) => {
                        res.render('prjList', { rows: data, row: data[0] });
                    });
                }
            });
        }
        else {
            console.log('There is no id');
            res.status(500).send('Internal Server Error');
        }
    });
});
exports.router.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    if (id) {
        let sqlBefore = 'select * from projectlist where id=?;';
        let parameter = [id];
        conn.query(sqlBefore, parameter, (err, data, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else
                res.render('prjEdit', { params: data, param: data[0] });
        });
    }
    else {
        console.log('There is no id');
        res.status(500).send('Internal Server Error');
    }
});
exports.router.get('/:id/delete', (req, res) => {
    let sql = 'select id, title from projectlist;';
    let id = req.params.id;
    conn.query(sql, id, (err, data, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            if (data.length === 0) {
                console.log('There is no data');
                res.status(500).send('Internal Server Error');
            }
            else {
                let sql = 'delete from projectlist where id=?;';
                conn.query(sql, id, (err, data, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    }
                    else {
                        let sqlBefore = 'select * from projectlist;';
                        conn.query(sqlBefore, (err, rows, fields) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal Server Error');
                            }
                            else
                                res.render('prjList', { rows: rows });
                        });
                    }
                });
            }
        }
    });
});
exports.router.get('/:id/delete', (req, res) => {
    let sql = 'select * from projectlist;';
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            let id = req.params.id;
            console.log(`id : ${id}`);
            if (id) {
                console.log(`id : ${id}`);
                let sql = 'select * from projectlist where id=?;';
                conn.query(sql, [id], (err, prj_item, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    }
                    else {
                        res.render('prjList', { rows: prj_item, row: prj_item[0], id: prj_item[0].id });
                    }
                });
            }
        }
    });
});
//# sourceMappingURL=prjList.js.map