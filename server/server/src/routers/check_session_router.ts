import { NextFunction, Request, Response, Router } from "express";
import { respRest } from "../rest/rest_producer";
import { User } from "../dto/user";

const checkSessionRouter: Router = require('express').Router();
checkSessionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.uid) {
        let user = User.fromObject(req.session);
        user.setId(req.session.userid);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.status(200).send(respRest(200, user.toObject()));
    } else {
        res.status(404).send(respRest(404, 1));
    }
});

module.exports = checkSessionRouter;