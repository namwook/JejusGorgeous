import * as express from 'express';
import {Request, Response} from "express";
import mysql = require('mysql');

export const router = express.Router();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skadnr12',
    // FIXME: database 이름을 바꿀까 어케 생성하지...
    database: 'o2'
});


router.get('/', (req: Request, res: Response) => {
    console.log(`get method : ${req.path+'signUp'}`);
    res.render('signUp');
});


router.post('/', (req: Request, res: Response) => {
    console.log(`post method : ${req.path+'signUp'}`);
    res.render('login');
});