import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { Base64Encoder } from "../util/base64_encoder";
import { respRest } from "../rest/rest_producer";


const shareRouter = require('express').Router();

shareRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let postId = req.body.postId;
    let checker = new QueryChecker();
    if (checker.notNull(postId)) {
        let result = {
            url: "http://app.ishs.co.kr/share?post=" + Base64Encoder.encode(postId)
        }
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

shareRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let encoded = req.query.post;
    let checker = new QueryChecker();
    if (checker.notNull(encoded)) {
        let postId = Base64Encoder.decode(String(encoded));
        let result = {
            postId: postId
        }
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});