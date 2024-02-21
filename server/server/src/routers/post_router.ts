import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { ContentStatus } from "../util/content_status";
import { commentDatabase } from "../database/comment_repository";
import { postDatabase } from "../database/post_repository";
import { now } from "../util/time_templete";
import { reportDatabase } from "../database/report_repository";
import { Comment } from "../dto/comment";

const postRouter = require('express').Router();

postRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: use necessary session variables only
    let authorId: string = req.body.authorId;
    let author: string = req.body.author;
    let title: string = req.body.title;
    let content: string = req.body.content;

    let checker = new QueryChecker();

    if (checker.notNull(authorId, author, title, content)) {
        postDatabase.createPost(authorId, author, title, content, 0, 0, 0, now(), ContentStatus.GOOD);
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
            let result = post.toObject();
            let comments = await commentDatabase.getCommentsByPostId(uid);
            result.comments = [];
            for (let comment of comments) {
                if (comment.getStatus() == ContentStatus.REPORTED) {
                    let report = await reportDatabase.getReportsByTargetId(comment.getUid());
                    comment.setContent("신고가 접수되어 삭제된 댓글입니다.\n사유: " + report[0].getContent());
                }
                result.comments.push(comment.toObject());
            }
            postDatabase.addPostView(uid);
            res.status(200).send(respRest(200, result));
        } else {
            res.status(403).send(respRest(403, 1));
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
            if (post.getStatus() == ContentStatus.GOOD) {
                result.push(post.toObject());
            }
        });
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/search/keyword', async (req: Request, res: Response, next: NextFunction) => {
    let keyword = req.query.keyword;
    let start = req.query.start;
    let end = req.query.end;

    let checker = new QueryChecker();
    if (checker.notNull(keyword, start, end)) {
        if (!checker.checkNumber(start, end)) {res.status(400).send(respRest(400, 1)); return;}
        let posts = await postDatabase.findPostByTitleAndRange(String(keyword), Number(start), Number(end));
        let result: any[] = [];
        posts.forEach((post) => {
            result.push(post.toObject());
        });
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/search/author', async (req: Request, res: Response, next: NextFunction) => {
    let author = req.query.author;

    let checker = new QueryChecker();
    if (checker.notNull(author)) {
        let posts = await postDatabase.getPostsByAuthorId(String(author))
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