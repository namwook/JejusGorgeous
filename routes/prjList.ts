import * as express from 'express';
import {Request, Response} from "express";

import mysql = require('mysql');

// mysql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    database: 'o2'
});
conn.connect();

export const router = express.Router();

router.get(['/', '/:id'], (req: Request, res: Response) => {

    // language=MySQL
    let sql: string = 'SELECT * FROM projectlist;';
    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;
        console.log(`id : ${id}`);
        if (id) {
            console.log(`id : ${id}`);
            // language=MySQL
            let sql = 'SELECT * FROM projectlist WHERE id=?;';
            conn.query(sql, [id], (err, prj_item, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    let rows: string[] = new Array();
                    for (let i = 0; i < prj_item.length; i++) {
                        console.log(`rows : ${prj_item[i].id}, ${prj_item[i].title}`);
                    }
                    res.render('prjList', {rows: prj_item, row: prj_item[0], id: prj_item[0].id});
                }
            });
        }
        else {
            res.render('prjList', {rows: rows});
        }
    });
});

//fixme:/:id post 무슨 역할맡을지 안정해짐 -> prjRegister로 가버림
router.post(['/:id'], (req: Request, res: Response) => {
    console.log(`/:id post 무슨 역할맡을지 안정해짐`);
    /* let sql = 'SELECT id, title FROM projectlist;';
     let id = req.params.id;
     conn.query(sql, id, (err, data, fields) => {
         if (err) {
             console.log(err);
             res.status(500).send('Internal Server Error');
         } else {
             if (data.length === 0) {
                 console.log('There is no data');
                 res.status(500).send('Internal Server Error');
             } else {
                 // language=MySQL
                 let sql = 'DELETE FROM projectlist WHERE id=?;';
                 conn.query(sql, id, (err, data, fields) => {
                     if (err) {
                         console.log(err);
                         res.status(500).send('Internal Server Error');
                     } else {
                         // language=MySQL
                         let sqlBefore: string = 'SELECT * FROM projectlist;';
                         conn.query(sqlBefore, (err, rows, fields) => {
                             if (err) {
                                 console.log(err);
                                 res.status(500).send('Internal Server Error');
                             }
                             else res.redirect('/prjList');
                         });
                     }
                 });
             }
         }
     });
     /!*let sql: string = 'select * from projectlist;';
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
                         res.render('prjList', {rows: data, row: data[0]});
                     });
                 }
             });

         }
         else {
             console.log('There is no id');
             res.status(500).send('Internal Server Error');
         }
     });           *!/*/
});


router.get('/:id/edit', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id) {

        // language=MySQL
        let sqlBefore: string = 'SELECT * FROM projectlist WHERE id=?;';
        let parameter = [id];

        conn.query(sqlBefore, parameter, (err, data, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else res.render('prjEdit', {params: data, param: data[0]});
        });
    } else {
        console.log('There is no id');
        res.status(500).send('Internal Server Error');
    }
});
router.post('/:id/edit', (req: Request, res: Response) => {
    // language=MySQL
    let sql: string = 'SELECT * FROM projectlist;';
    conn.query(sql, (err, rows, fields) => {
        let id = req.params.id;
        if (id) {
            let title = req.body.title;
            let author = req.body.author;
            let description = req.body.description;

            // language=MySQL
            let sql = 'UPDATE projectlist SET title=?, author=?, description=? WHERE id=?;';
            let params = [title, author, description, id];

            conn.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    // language=MySQL
                    let sql2 = 'SELECT * FROM projectlist WHERE id=?;';
                    conn.query(sql2, id, (err, data, fields) => {
                        res.render('prjList', {rows: data, row: data[0]});
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

router.get('/:id/delete', (req: Request, res: Response) => {
    // language=MySQL
    let sql = 'SELECT id, title FROM projectlist;';
    let id = req.params.id;
    conn.query(sql, id, (err, data, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (data.length === 0) {
                console.log('There is no data');
                res.status(500).send('Internal Server Error');
            } else {
                // language=MySQL
                let sql = 'DELETE FROM projectlist WHERE id=?;';
                conn.query(sql, id, (err, data, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        // language=MySQL
                        let sqlBefore: string = 'SELECT * FROM projectlist;';
                        conn.query(sqlBefore, (err, rows, fields) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal Server Error');
                            }
                            else res.render('prjList', {rows: rows});
                        });
                    }
                });
            }
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log(`지금 post id delete니?`);
    // language=MySQL
    let sql = 'SELECT id, title FROM projectlist;';
    let id = req.params.id;
    conn.query(sql, id, (err, data, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (data.length === 0) {
                console.log('There is no data');
                res.status(500).send('Internal Server Error');
            } else {
                // language=MySQL
                let sql = 'DELETE FROM projectlist WHERE id=?;';
                conn.query(sql, id, (err, data, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        // language=MySQL
                        let sqlBefore: string = 'SELECT * FROM projectlist;';
                        conn.query(sqlBefore, (err, rows, fields) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal Server Error');
                            }
                            else res.redirect('/prjList');
                        });
                    }
                });
            }
        }
    });
});
