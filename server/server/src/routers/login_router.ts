import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_repository";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const loginRouter: Router = require('express').Router();
const userDatabase = new UserDatabase();
loginRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let password: string = req.body.password;
    let checker = new QueryChecker();
    if (checker.notNull(id, password)) {
        if (checker.hasInvalidString(id, password)) {
            res.status(400).send("Invalid characters in name or password");
        } else {
            userDatabase.login(id, password).then((result: boolean) => {
                if (result) {
                    req.session.id = id;
                    req.session.password = password;
                    userDatabase.getPrivilege(id).then((privilege: number) => {
                        req.session.privilege = privilege;
                        req.session.save(() => console.log("Session saved"));
                        res.status(200).send(respRest(200, 0));
                    });
                } else {
                    res.status(400).send(respRest(400, 1));
                }
            }
            ).catch((err: any) => {
                res.status(500).send(respRest(500, 2));
            });
        }
    } else {
        res.status(400).send();
    }
});

module.exports = loginRouter;