import { NextFunction, Request, Response } from "express";
import { FileUploadBuilder } from "../util/file_upload";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { UserPrivilege, PrivilegeEnum } from "../util/user_privilege";

const userInfoRouter = require('express').Router();

userInfoRouter.get('/info', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.session.id;
    let requestUserId: string = req.session.uid;
    let checker = new QueryChecker();
    if (checker.notNull(id, requestUserId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

userInfoRouter.patch('/info', (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.session.key;
    let password: string = req.session.password;
    let email: string = req.session.email;
    let privilege: string = req.session.privilege;
    let nickname: string = req.session.nickname;
    let id: string = req.session.id;
    let birthday: string = req.session.birthday;
    let penalty: number = req.session.penalty;
    let profileImage: string = req.session.profileImage;
    // let role: role = req.session.role; role 타입 정의 필요
    let checker = new QueryChecker();
    let userPrivilege = new UserPrivilege(req.session.privilege ? req.session.privilege : 0);
    if (checker.notNull(id, password)) {
        res.status(200).send(respRest(200, userPrivilege.getPrivilegeListString()));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

userInfoRouter.get('/info', (req: Request, res: Response, next: NextFunction) => {
    let requestUserId: string = req.session.uid;
    let checker = new QueryChecker();
    if (checker.notNull(requestUserId)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = userInfoRouter;