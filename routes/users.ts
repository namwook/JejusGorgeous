import * as express from 'express';
import {Request, Response} from "express";


export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log(`execution? : ${req.session.count}`);
    console.log(`req : ${req}`);
    console.log(`req session : ${req.session}`);
    console.log(`req session : ${req.session}`);
    res.send('result : ' + req.session.count);
});