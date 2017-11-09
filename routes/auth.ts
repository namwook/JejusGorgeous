import * as express from 'express';
import {Request, Response} from "express";

export const router = express.Router();


/* GET home page. */
router.get('/login', (req: Request, res: Response) => {
    if (!req.session.displayName) {
        res.render('login', {
            title: 'Jejus Gorgeous',
            msg: 'hi session'
        });
    } else {
        res.redirect('/');
    }
});

router.post('/login', (req: Request, res: Response) => {
    // FIXME : 실제로라면 디비데이터와 맞는지 작업 추가
    let user = {
        username: 'nw',
        password: '111',
        displayName: 'NW'
    };
    let uname = req.body.username;
    let pwd = req.body.password;
    if (user.username === uname && pwd === user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/');
    } else res.send(`failed.`);

});

router.get('/logout', (req: Request, res: Response) => {
    delete req.session.displayName;
    res.redirect('/');
});