import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_data";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const signUpRouter: Router = require('express').Router();
const userDatabase = new UserDatabase();

signUpRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.body.key;
    let name: string = req.body.name;
    let privilege: number = req.body.privilege;
    let password: string = req.body.password;
    let checker = new QueryChecker();
    if (privilege >= 0 && checker.notNull(key, name, password)) {
        if (checker.hasInvalidString(name, password)) {
            res.status(400).send("Invalid characters in name or password");
        }
        else {
            userDatabase.signUp(key, name, privilege, password).then((result: boolean) => {
                if (result) {
                    req.session.key = key;
                    req.session.name = name;
                    req.session.password = password;
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