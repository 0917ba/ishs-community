import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const postRouter = require('express').Router();

postRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: use necessary session variables only
    let authorId: string = req.session.authorId;
    let author: string = req.session.author;
    let title: string = req.session.title;
    let content: string = req.session.content;

    let checker = new QueryChecker();

    if (checker.notNull(authorId), author, title, content) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.patch('/', (req: Request, res: Response, next: NextFunction) => {
    // FIXME: use necessary session variables only
    let uid: string = req.body.uid;
    let title: string = req.body.title;
    let content: string = req.body.content;

    let checker = new QueryChecker();

    if (checker.notNull(uid, title, content)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    let uid = req.body.uid;

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.delete('/', (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.body.uid;

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/list', (req: Request, res: Response, next: NextFunction) => {
    let start = req.query.start;
    let end = req.query.end;

    let checker = new QueryChecker();

    if (checker.notNull(start, end)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = postRouter;