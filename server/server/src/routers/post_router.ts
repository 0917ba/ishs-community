import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { ContentStatus } from "../util/content_status";
import { commentDatabase } from "../database/comment_repository";
import { postDatabase } from "../database/post_repository";
import { now } from "../util/time_templete";
import { reportDatabase } from "../database/report_repository";
import { Role } from "../util/role";
import { TargetBoard } from "../util/target_board";
import { userDatabase } from "../database/user_repository";

const postRouter = require('express').Router();

postRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    //FIXME: use necessary session variables only
    let authorId: string = req.body.authorId;
    let author: string = req.body.author;
    let title: string = req.body.title;
    let content: string = req.body.content;
    let board: string = req.body.board;

    let checker = new QueryChecker();

    if (checker.notNull(authorId, author, title, content)) {
        postDatabase.createPost(authorId, author, title, content, 0, 0, 0, now(), board, ContentStatus.GOOD);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    // FIXME: use necessary session variables only
    let uid: string = req.body.uid;
    let title: string = req.body.title;
    let content: string = req.body.content;
    let userUid: string = req.session.uid;
    let role: Role = req.session.role;

    let checker = new QueryChecker();

    if (checker.notNull(uid, title, content)) {
        let post = await postDatabase.getPostByUid(uid);
        if (checker.notNull(post)) {
            if (role != Role.ADMIN) {
                if (post?.getAuthorId() != userUid) {
                    res.status(403).send(respRest(403, 1));
                    return;
                } else {
                    postDatabase.updatePost(uid, title, content);
                    res.status(200).send(respRest(200, 0));
                }
            } else if (role == Role.ADMIN || role == Role.DEVELOPER) {
                postDatabase.updatePost(uid, title, content);
                res.status(200).send(respRest(200, 0));
            } else {
                res.status(403).send(respRest(403, 1));
            }
        } else {
            res.status(404).send(respRest(404, 1));
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let uid = req.query.uid; // host/?uid=1234

    let checker = new QueryChecker();

    if (checker.notNull(uid)) {
        let post = await postDatabase.getPostByUid(String(uid));
        if (!checker.notNull(post)) {
            res.status(404).send(respRest(404, 1));
            return;
        }
        if (post && post.getStatus() == ContentStatus.GOOD) {
            let result = post.toObject();
            let comments = await commentDatabase.getCommentsByPostId(String(uid));
            result.comments = [];
            for (let comment of comments) {
                if (comment.getStatus() == ContentStatus.REPORTED) {
                    let report = await reportDatabase.getReportsByTargetId(comment.getUid());
                    comment.setContent("신고가 접수되어 삭제된 댓글입니다.\n사유: " + report[0].getContent());
                }
                result.comments.push(comment.toObject());
            }
            postDatabase.addPostView(String(uid));
            res.status(200).send(respRest(200, result));
        } else {
            res.status(403).send(respRest(403, 1));
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.body.uid;
    let userUid: string = req.session.uid;
    let role: Role = req.session.role;

    let checker = new QueryChecker();

    if (checker.notNull(uid, userUid, role)) {
        let post = await postDatabase.getPostByUid(uid);
        if (role != Role.ADMIN) {
            if (post?.getAuthorId() != userUid) {
                res.status(403).send(respRest(403, 1));
                return;
            } else {
                postDatabase.deletePost(uid);
                res.status(200).send(respRest(200, 0));
            }
        } else if (role == Role.ADMIN || role == Role.DEVELOPER) {
            postDatabase.deletePost(uid);
            res.status(200).send(respRest(200, 0));
        } else {
            res.status(403).send(respRest(403, 1));
        }
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

postRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    let board = req.query.board;
    let generation = req.session.generation;
    let checker = new QueryChecker();
    if (checker.notNull(board)) {
        let posts = await postDatabase.getPostsInAscendingOrderFromBoard(TargetBoard[String(board) as keyof typeof TargetBoard])
        let result: any[] = [];
        await (async () => {
            for (let post of posts) {
                if (board == TargetBoard.GRADE && generation) {
                    let author = await userDatabase.getUserByUid(post.getAuthor());
                    if (author) {
                        let authorGeneration = (new Date().getFullYear() % 100) - Math.floor(author.getStudentNumber() / 1000) + 8;
                        if (authorGeneration == Number(generation)) {
                            if (post.getStatus() == ContentStatus.GOOD) {
                                let p = post.toObject();
                                p['comments'] = (await commentDatabase.getCommentsByPostId(p['uid'])).length;
                                result.push(p);
                            }
                        }
                    }
                } else {
                    if (post.getStatus() == ContentStatus.GOOD) {
                        let p = post.toObject();
                        p['comments'] = (await commentDatabase.getCommentsByPostId(p['uid'])).length;
                        result.push(p);
                    }
                }
            }
            
        })();
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