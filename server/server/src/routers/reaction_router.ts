import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { Type } from "../util/type";
import { Status } from "../util/status";

const reactionRouter = require('express').Router();

reactionRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let type: Type = req.session.type;
    let userId: string = req.session.userId;
    let targetId: string = req.session.targetId;
    let status: Status = req.session.status;
    let checker = new QueryChecker();
    if (checker.notNull(type, userId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reactionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    let userId = req.query.userId;
    let type = req.query.type; // 나중에 enum으로 바꿔야 함.
    let targetId = req.query.targetId;
    let checker = new QueryChecker();
    if (checker.notNull(userId, type, targetId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = reactionRouter;