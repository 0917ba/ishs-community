import { NextFunction, Request, Response, Router } from "express";
import { userDatabase } from "../database/user_repository";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { Role } from "../util/role";
import { logger } from "../logging/central_log";
import { UUID } from "../util/uuid_generator";

const signUpRouter: Router = require('express').Router();

signUpRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.body.key;
    let id: string = req.body.id;
    let password: string = req.body.password;
    let identifyCode: string = req.body.identifycode;
    let email: string = req.body.email;
    let studentName: string = req.body.studentname;
    let nickname: string = req.body.nickname;
    let checker = new QueryChecker();
    logger.info(req.body.key)
    if (checker.notNull(key, id, password, identifyCode, email, studentName, nickname)) {
        if (checker.hasInvalidString(id, password, identifyCode, email, studentName, nickname)) {
            res.status(400).send("Invalid characters in request");
        }
        else {
            let result = await new Promise<boolean>((resolve, reject) => {
                userDatabase.getUserById(id).then((user) => {
                if (user) {
                    logger.error("Sign up failed 0");
                    res.status(400).send(respRest(400, "아이디 중복"));
                    resolve(false);
                } else {
                    resolve(true);
                }
                }).catch((err: any) => {
                    logger.error("Sign up failed 0 ");
                    res.status(500).send(respRest(500, 2));
                    reject(err)
                });
            });
            if (!result) {
                return;
            }
            let role = Role.STUDENT;
            let penalty = 0;
            let studentNumber = parseInt(key.toString());    
            let uid = new UUID().generateUUID();
            let generation = (new Date().getFullYear() % 100) - Math.floor(studentNumber / 1000) + 8;
            userDatabase.signup(uid, id, password, nickname, email, studentName, studentNumber, role, penalty, 0).then((result: boolean) => {
                if (result) {
                    req.session.uid = uid;
                    req.session.userid = id;
                    req.session.nickname = nickname;
                    req.session.email = email;
                    req.session.studentName = studentName;
                    req.session.generation = generation;
                    req.session.studentNumber = studentNumber;
                    req.session.role = role;
                    req.session.penalty = penalty;
                    req.session.save(() => console.log("Session saved"));
                    res.status(200).send(respRest(200, 0));
                } else {
                    logger.error("Sign up failed 1 ");
                    res.status(400).send(respRest(400, "회원가입 실패"));
                }
            }
            )
        }
    } else {
        logger.error("Sign up failed 2 ");
        res.status(400).send(respRest(400, "빈칸을 모두 채워주세요"));
    }
});

module.exports = signUpRouter;