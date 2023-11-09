import { NextFunction, Request, Response } from "express";
import { FileUploadBuilder } from "../util/file_upload";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { UserPrivilege, PrivilegeEnum } from "../util/user_privilege";

const postRouter = require('express').Router();

postRouter.post('/post', (req: Request, res: Response, next: NextFunction) => {
    let authorId: string = req.session.authorId;
    let author: string = req.session.author;
    let title: string = req.session.title;
    let content: string = req.session.content;
    let checker = new QueryChecker();
    if (checker.notNull(authorId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.patch('/post', (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.session.uid;
    let title: string = req.session.title;
    let content: string = req.session.content;
    let checker = new QueryChecker();
    if (checker.notNull(uid)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = postRouter;