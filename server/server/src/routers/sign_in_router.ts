import { NextFunction, Request, Response, Router } from "express";
import { userDatabase } from "../database/user_repository";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const loginRouter: Router = require('express').Router();
loginRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let password: string = req.body.password;
    let checker = new QueryChecker();
    if (checker.notNull(id, password)) {
        if (checker.hasInvalidString(id, password)) {
            res.status(400).send("Invalid characters in name or password");
        } else {
            userDatabase.signin(id, password).then((result: boolean) => {
                if (result) {
                    userDatabase.getUserById(id).then((user) => {
                        if (!checker.notNull(user)) {
                            res.status(404).send(respRest(404, 0));
                            return;
                        }
                        if (user) {
                            req.session.uid = user.getUid();
                            req.session.userid = id;
                            req.session.nickname = user.getNickname();
                            req.session.email = user.getEmail();
                            req.session.studentName = user.getStudentName();
                            req.session.generation = user.getGeneration();
                            req.session.studentNumber = user.getStudentNumber();
                            req.session.birthday = user.getBirthday();
                            req.session.role = user.getRole();
                            req.session.penalty = user.getPenalty();
                            req.session.save(() => console.log("Session saved"));
                            res.status(200).send(respRest(200, 0));
                        }
                    }).catch((err: any) => {
                        res.status(500).send(respRest(500, 2));
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