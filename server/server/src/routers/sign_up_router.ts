import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_repository";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { PrivilegeEnum } from "../util/user_privilege";
import { Role } from "../util/role";
import { parse } from "uuid";

const signUpRouter: Router = require('express').Router();
const userDatabase = new UserDatabase();

signUpRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.body.key;
    let id: string = req.body.id;
    let password: string = req.body.password;
    let identifyCode: string = req.body.identifyCode;
    let email: string = req.body.email;
    let name: string = req.body.name;
    let nickname: string = req.body.nickname;
    let birthday: string = req.body.birthday;
    let checker = new QueryChecker();
    if (checker.notNull(key, id, password, identifyCode, email, name, nickname)) {
        if (checker.hasInvalidString(id, password, identifyCode, email, name, nickname, birthday)) {
            res.status(400).send("Invalid characters in name or password");
        }
        else {
            let privilege = PrivilegeEnum.DEFAULT;
            let role = Role.STUDENT;
            let penalty = 0;
            let classNumber = parseInt(key.toString().split("")[1]);
            let studentNumber = parseInt(key.toString().substring(2));      
            userDatabase.signUp(key, id, password, identifyCode, email, name, nickname, birthday, privilege).then((result: boolean) => {
                if (result) {
                    req.session.key = key;
                    req.session.id = id;
                    req.session.email = email;
                    req.session.name = name;
                    req.session.nickname = nickname;
                    req.session.birthday = birthday;
                    req.session.privilege = privilege;
                    req.session.save(() => console.log("Session saved"));
                    res.status(200).send(respRest(200, 0));
                } else {
                    res.status(400).send(respRest(400, 1));
                }
            }
            ).catch((err: any) => {
                res.status(500).send(respRest(500, 2));
            });
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = signUpRouter;