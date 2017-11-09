import * as express from 'express';
import {Request, Response} from "express";
import * as session from 'express-session';

export const router = express.Router();


/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    let msg: string;
    if (req.session.displayName) {
        msg = req.session.displayName;
    }
    else msg = 'Visitor';

    console.log(`session length : ${req.session.count}`);
    res.render('index', {
        title: 'Jejus Gorgeous', msg: msg
    });
});

