import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const commentRouter = require('express').Router();

commentRouter.post('/comment', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: session must include necessary information only
    let authorId: string = req.body.authorId;
    let author: string = req.body.author;
    let postId: string = req.body.postId;
    let target: string = req.body.target;
    let content: string = req.body.content;

    let checker = new QueryChecker();
    //TODO: purify content
    if (checker.notNull(authorId, author, postId, content)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

commentRouter.patch('/comment', (req: Request, res: Response, next: NextFunction) => {
    let target: string = req.body.target;
    let content: string = req.body.content;
    let uid: string = req.body.uid;

    let checker = new QueryChecker();
    // TODO: purify content
    if (checker.notNull(content, uid)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

commentRouter.delete('/comment', (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.session.uid!;

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {

    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = commentRouter;