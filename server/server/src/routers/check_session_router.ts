import { NextFunction, Request, Response, Router } from "express";
import { respRest } from "../rest/rest_producer";
import { User } from "../dto/user";

const checkSessionRouter: Router = require('express').Router();
checkSessionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.uid) {
        let user = User.fromObject(req.session);
        let generation = (new Date().getFullYear() % 100) - Math.floor(user.getStudentNumber() / 1000) + 8;
        user.setGeneration(generation)
        res.status(200).send(respRest(200, user.toObject()));
    } else {
        res.status(404).send(respRest(404, 1));
    }
});

module.exports = checkSessionRouter;