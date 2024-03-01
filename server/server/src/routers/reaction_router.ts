import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { ReactionType } from "../util/reaction_type";
import { ReactionStatus } from "../util/reaction_status";
import { reactionDatabase } from "../database/reaction_repository";
import { postDatabase } from "../database/post_repository";
import { commentDatabase } from "../database/comment_repository";

const reactionRouter = require('express').Router();

reactionRouter.post('/',  async (req: Request, res: Response, next: NextFunction) => {
    let type: ReactionType = req.body.type;
    let userId: string = req.body.userId;
    let targetId: string = req.body.targetId;
    let status: ReactionStatus = req.body.status;
    let checker = new QueryChecker();
    if (checker.notNull(type, userId, targetId, status)) {
        let reaction = await reactionDatabase.findReactionByUserId(targetId, userId);
        if (reaction) {
            reactionDatabase.deleteReaction(reaction.getUid());
            if (type == ReactionType.POST) {
                postDatabase.updateReaction(targetId, ReactionStatus.NONE, reaction.getStatus());
            } else if (type == ReactionType.COMMENT) {
                commentDatabase.updateReaction(targetId, ReactionStatus.NONE, reaction.getStatus());
            }
        } else {
            reactionDatabase.createReaction(type, userId, targetId, status);
            if (type == ReactionType.POST) {
                postDatabase.updateReaction(targetId, status);
            } else if (type == ReactionType.COMMENT) {
                commentDatabase.updateReaction(targetId, status);
            }
        }
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reactionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.query.userId;
    let targetId = req.query.targetId;
    let checker = new QueryChecker();
    if (checker.notNull(userId, targetId)) {
        let reaction = await reactionDatabase.findReactionByUserId(String(targetId), String(userId));
        if (reaction) {
            res.status(200).send(respRest(200, reaction.toObject()));
        } else {
            res.status(404).send(respRest(404, 0));
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = reactionRouter;