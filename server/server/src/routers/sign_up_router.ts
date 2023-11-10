import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_repository";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

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
    let privilege: number = req.body.privilege;
    
    let checker = new QueryChecker();
    if (privilege >= 0 && checker.notNull(key, id, password, identifyCode, email, name, nickname, privilege)) {
        if (checker.hasInvalidString(name, password)) {
            res.status(400).send("Invalid characters in name or password");
        }
        else {
            userDatabase.signUp(key, id, password, identifyCode, email, name, nickname, birthday, privilege).then((result: boolean) => {
                if (result) {
                    req.session.key = key;
                    req.session.id = id;
                    req.session.password = password;
                    req.session.identifyCode = identifyCode;
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