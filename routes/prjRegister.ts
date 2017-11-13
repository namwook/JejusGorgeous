import * as express from 'express';
import {Request, Response} from "express";
import mysql = require('mysql');

export const router = express.Router();

// mysql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    database: 'o2'
});
conn.connect();

router.get('/', (req: Request, res: Response) => {
    if (req.session.displayName) {
        console.log(`get method : ${req.path}`);
        res.render('prjAdd');
    } else {
        res.redirect('/');
    }
});


router.post('/', (req: Request, res: Response) => {
    console.log(`post method : ${req.path}`);
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;

    console.log(`title is ${title} author is ${author} description is ${description}`);

    // language=MySQL
    let sql: string = 'INSERT INTO projectlist (title, author, description) VALUES(?,?,?)';
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
            // language=MySQL
            let sql2 = 'SELECT * FROM projectlist;';
            conn.query(sql2, (err, data, fields) => {
                res.render('prjList', {rows: data});
            });
        }
    });
});
