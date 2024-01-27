import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { ContentStatus } from "../util/content_status";
import { commentDatabase } from "../database/comment_repository";
import { PostDatabase, postDatabase } from "../database/post_repository";

const postRouter = require('express').Router();

postRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: use necessary session variables only
    let authorId: string = req.body.authorId;
    let author: string = req.body.author;
    let title: string = req.body.title;
    let content: string = req.body.content;

    let checker = new QueryChecker();

    if (checker.notNull(authorId, author, title, content)) {
        let time = new Date();
        let createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        console.log(createdAt);
        postDatabase.createPost(authorId, author, title, content, 0, 0, 0, createdAt, ContentStatus.GOOD);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.patch('/', (req: Request, res: Response, next: NextFunction) => {
    // FIXME: use necessary session variables only
    let uid: string = req.body.uid;
    let title: string = req.body.title;
    let content: string = req.body.content;

    let checker = new QueryChecker();

    if (checker.notNull(uid, title, content)) {
        postDatabase.updatePost(uid, title, content);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let uid = req.body.uid;

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {
        let post = await postDatabase.getPostByUid(uid);
        if (post.getStatus() == ContentStatus.GOOD) {
            let comments = await commentDatabase.getCommentsByPostId(uid);
            let result = post.toObject();
            result.comments = [];
            comments.forEach((comment) => {
                result.comments.push(comment.toObject());
            });
            res.status(200).send(respRest(200, result));
        } else {
            res.status(400).send(respRest(400, 1));
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.delete('/', (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.body.uid;

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {
        postDatabase.deletePost(uid);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    let start = req.query.start;
    let end = req.query.end;

    let checker = new QueryChecker();
    if (checker.notNull(start, end)) {
        let posts = await postDatabase.getPostsInAscendingOrder(Number(start), Number(end))
        let result: any[] = [];
        posts.forEach((post) => {
            result.push(post.toObject());
        });
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = postRouter;