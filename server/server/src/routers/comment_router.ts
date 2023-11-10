import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const commentRouter = require('express').Router();

commentRouter.post('/comment', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: session must include necessary information only
    let authorId: string = req.session.authorId;
    let author: string = req.session.author;
    let postId: string = req.session.postId;
    let target: string = req.session.target;
    let content: string = req.session.content;

    let checker = new QueryChecker();
    //TODO: purify content
    if (checker.notNull(authorId, author)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

commentRouter.patch('/comment', (req: Request, res: Response, next: NextFunction) => {
    let target: string = req.session.target;
    let content: string = req.session.content;
    let uid: string = req.session.uid;

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