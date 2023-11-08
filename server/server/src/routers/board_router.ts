import { NextFunction, Request, Response, Router } from "express";
import { BoardDatabase } from "../database/board_repository";
import { QueryChecker } from "../util/query_checker";
import { PrivilegeEnum, UserPrivilege } from "../util/user_privilege";

import { respRest } from "../rest/rest_producer";
import { logger } from "../logging/central_log";

const boardRouter: Router = require('express').Router();
const boardDatabase = new BoardDatabase();

boardRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'applicaion/json');
    next();
});

/**
 * 0: success
 * 1: form validation
 * 2: internal server error
 */
boardRouter.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let title: string = req.body.title;
    let content: string = req.body.content;
    let checker = new QueryChecker();
    let userPrivilege = new UserPrivilege(req.session.privilege ? req.session.privilege : 0);
    try {
        if (!userPrivilege.hasPrivilegeAll(PrivilegeEnum.WRITE_POST)) {
            if(checker.notNull(title, content)) {
                if(title.length > 30 || content.length > 9000) {
                    res.status(400).send(respRest(400, 1));
                }
                else {
                    // TODO: USER UID HERE(0)
                    boardDatabase.addPost(title, content, 0);
                    res.status(200).send(respRest(200, 0));
                }
            }
        }
    } catch(err) {
        logger.error(err);
        res.status(500).send(respRest(500, 2));
    }
});

/**
 * 0: success
 * 1: no post
 * 2: internal server error
 * 3: authentication failed
 */
boardRouter.delete('/delete', (req: Request, res: Response, next: NextFunction) => {
    let code: number = req.body.code;
    let userPrivilege = new UserPrivilege(req.session.privilege ? req.session.privilege : 0);
    try {
        if (!userPrivilege.hasPrivilegeAll(PrivilegeEnum.DELETE_POST)) {
            boardDatabase.existsByCode(code)
            .then((rex: boolean) => {
                if(rex) {
                    boardDatabase.deletePostByCode(code);
                    res.status(200).send(respRest(200, 0));
                }
                else {
                    res.status(400).send(respRest(400, 1));
                }
            })
            .catch((err: any) => {
                logger.error(err);
                res.status(500).send(respRest(500, 2));
            });
        }
    } catch(err) {
        logger.error(err);
        res.status(500).send(respRest(500, 2));
    }
});

/**
 * 0: success
 * 1: no post
 * 2: internal server error
 * 3: authentication failed,
 * 4: form validation
 */
boardRouter.put('/update', (req: Request, res: Response, next: NextFunction) => {
    let code: number = req.body.code;
    let title: string = req.body.title;
    let content: string = req.body.content;
    let checker = new QueryChecker();
    let userPrivilege = new UserPrivilege(req.session.privilege ? req.session.privilege : 0);
    try {
        if (!userPrivilege.hasPrivilegeAll(PrivilegeEnum.UPDATE_POST)) {
            if(checker.notNull(title, content)) {
                if(title.length > 30 || content.length > 9000) {
                    res.status(400).send(respRest(400, 4));
                }
                else {
                    boardDatabase.existsByCode(code)
                    .then((rex: boolean) => {
                        if(rex) {
                            boardDatabase.updatePost(code, title, content);
                            res.status(200).send(respRest(200, 0));
                        }
                        else {
                            res.status(400).send(respRest(400, 1));
                        }
                    })
                    .catch((err: any) => {
                        logger.error(err);
                        res.status(500).send(respRest(500, 2));
                    });
                }
            }
        }
    } catch(err) {
        logger.error(err);
        res.status(500).send(respRest(500, 2));
    }
});

/**
 * 0: success
 * 1: internal server error
 * 2: form validation
 */
boardRouter.get('/get/latest', (req: Request, res: Response, next: NextFunction) => {   
    let cnt: number =  Number.parseInt(req.query.count as string);

    if(!Number.isInteger(cnt)) {
        res.status(400).send(respRest(400, 2));
        return;
    }

    boardDatabase.getDesc(cnt)
    .then(rs => {
        res.status(200).send(respRest(200, rs));
    })
    .catch(err => {
        res.status(500).send(respRest(500, 1));
    });
});
/**
 * 0: success
 * 1: internal server error
 * 2: form validation
 */
boardRouter.get('/get/range', (req: Request, res: Response, next: NextFunction) => {   
    let from: number =  Number.parseInt(req.query.from as string);
    let to  : number =  Number.parseInt(req.query.to   as string);

    if(!Number.isInteger(from) || !Number.isInteger(to)) {
        res.status(400).send(respRest(400, 2));
        return;
    }
    if(from > to) {
        res.status(400).send(respRest(400, 2));
        return;
    }
    if(to - from > 29) {
        res.status(400).send(respRest(400, 2));
        return;
    }

    boardDatabase.getRange(from, to)
    .then(rs => {
        res.status(200).send(respRest(200, rs));
    })
    .catch(err => {
        res.status(500).send(respRest(500, 1));
    });
});

module.exports = boardRouter;