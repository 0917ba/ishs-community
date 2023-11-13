import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const reportRouter = require('express').Router();

reportRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let type: string = req.body.type; // 나중에 enum으로 바꿔야 함.
    let authorId: string = req.body.authorId;
    let targetId: string = req.body.targetId;
    let checker = new QueryChecker();
    if (checker.notNull(type, authorId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reportRouter.post('/execute', (req: Request, res: Response, next: NextFunction) => {
    let type: string = req.body.type; // 나중에 enum으로 바꿔야 함.
    let uid: string = req.body.uid;
    let status: string = req.body.status; // 나중에 enum으로 바꿔야 함.
    let checker = new QueryChecker();
    if (checker.notNull(type, uid, status)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = reportRouter;