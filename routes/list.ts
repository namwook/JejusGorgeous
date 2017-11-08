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

router.get(['/'], (req: Request, res: Response) => {
    let sql: string = 'select * from projectlist';

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
                    res.render('projectList', {rows: rows};
                }
            });
        }
        else {
            res.render('projectList', {rows: rows};
        }
        for (let i = 0; i < rows.length; i++) {
            console.log(`id : ${rows[i].id}, title : ${rows[i].title}`);
        }
    });
});

router.post('/', (req: Request, res: Response) => {

    res.render('index', {});
});


router.get('/new', (req: Request, res: Response) => {
    res.render('prjAdd');
});

router.post('new', (req: Request, res: Response) => {
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;

    let sql: string = 'insert into projectlist (title, author, description) VALUES(?,?,?)';
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
