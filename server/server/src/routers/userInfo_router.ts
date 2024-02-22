import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { userDatabase } from "../database/user_repository";
import { Role } from "../util/role";

const userInfoRouter = require('express').Router();

userInfoRouter.get('/info/:id', (req: Request, res: Response, next: NextFunction) =>{
    let id: string = req.params.id;
    let requestUserId: string = req.session.uid;
    let checker = new QueryChecker();
    if (checker.notNull(id, requestUserId)) {
        userDatabase.getUserByUid(requestUserId).then((user) => {
            if (user.getId() == id || user.getRole() == Role.DEVELOPER) {
                userDatabase.getUserById(id).then((user) => {
                    res.status(200).send(respRest(200, user.toObject()));
                }).catch((err: any) => {
                    res.status(500).send(respRest(500, 2));
                });
            } else {
                userDatabase.getUserById(id).then((user) => {
                    let resUser = user.toObject();
                    let result = {
                        nickname: resUser.nickname,
                        profileImage: resUser.profileImage,
                        penalty: resUser.penalty
                    }
                    res.status(200).send(respRest(200, result));
                }).catch((err: any) => {
                    res.status(500).send(respRest(500, 2));
                });
            }
        }).catch((err: any) => {
            res.status(500).send(respRest(500, 2));
        });
    }
});

userInfoRouter.patch('/info', (req: Request, res: Response, next: NextFunction) => {
    let password: string = req.body.password;
    let email: string = req.body.email;
    let privilege: number = req.body.privilege;
    let nickname: string = req.body.nickname;
    let birthday: string = req.body.birthday;
    let penalty: number = req.body.penalty;
    let profileImage: string = req.body.profileImage;
    let role: string = req.session.role
    let requestUserId: string = req.session.uid;
    let uid = req.body.uid;
    let checker = new QueryChecker();
    if (checker.notNull(requestUserId)) {
        userDatabase.getUserByUid(requestUserId).then((user) => {
            if (user.getRole() == Role.DEVELOPER || user.getRole() == Role.ADMIN) {
                if (checker.notNull(uid)) {
                    if (checker.notNull(password)) {
                        userDatabase.setPassword(uid, password);
                    }
                    if (checker.notNull(email)) {
                        userDatabase.setEmail(uid, email);
                    }
                    if (checker.notNull(privilege)) {
                        userDatabase.setPrivilege(uid, privilege);
                    }
                    if (checker.notNull(nickname)) {
                        userDatabase.setNickname(uid, nickname);
                    }
                    if (checker.notNull(birthday)) {
                        userDatabase.setBirthday(uid, birthday);
                    }
                    if (checker.notNull(penalty)) {
                        userDatabase.setPenalty(uid, penalty);
                    }
                    if (checker.notNull(profileImage)) {
                        userDatabase.setProfileImage(uid, profileImage);
                    }
                    if (checker.notNull(role)) {
                        userDatabase.setRole(uid, role);
                    }
                    res.status(200).send(respRest(200, 0));
                } else {
                    res.status(400).send(respRest(400, 1));
                }
            } else {
                if (checker.notNull(password)) {
                    userDatabase.setPassword(requestUserId, password);
                }
                if (checker.notNull(email)) {
                    userDatabase.setEmail(requestUserId, email);
                    req.session.email = email;
                }
                if (checker.notNull(nickname)) {
                    userDatabase.setNickname(requestUserId, nickname);
                    req.session.nickname = nickname;
                }
                if (checker.notNull(birthday)) {
                    userDatabase.setBirthday(requestUserId, birthday);
                    req.session.birthday = birthday;
                }
                if (checker.notNull(profileImage)) {
                    userDatabase.setProfileImage(requestUserId, profileImage);
                    req.session.profileImage = profileImage;
                }
                req.session.save(() => console.log("Session saved"));
                res.status(200).send(respRest(200, 0));
            }
        }).catch((err: any) => {
            res.status(500).send(respRest(500, 2));
        });
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = userInfoRouter;