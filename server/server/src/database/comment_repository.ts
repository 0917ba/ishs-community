import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';

export class CommentDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.comment
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(user)');
        });
    }

    createComment(authorId: string, postId: string, author: string, like: number, dislike: number, createdAt: string, target: string, content: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO comments (uid, authorId, postId, author, like, dislike, createdAt, target, content, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [uid, authorId, postId, author, like, dislike, createdAt, target, content, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Created new comment of uid ${res.insertId}`);
                resolve(true);
            });
        });
    }

    getCommentByUid(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM comments WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getCommentsByPostId(postId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM comments WHERE postId='${postId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getCommentsByAuthorId(authorId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM comments WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getCommentsByTarget(target: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM comments WHERE target='${target}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    deleteCommentByUid(uid: string) {
        this.db.query(
            'delete from comments where uid=?',
            [uid],
            (err: any, res: any) => {
                if(err) {
                    throw err;
                }
                logger.debug(`Deleted comment of ${uid}`);
            }
        )
    }

    setContent(uid: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comments SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setLike(uid: string, like: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comments SET like='${like}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getLike(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT like FROM comments WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].like);
            });
        });
    }

    addLike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getLike(uid).then((result: any) => {
                this.setLike(uid, result + 1).then((result: any) => {
                    resolve(true);
                });
            });
        });
    }

    setDislike(uid: string, dislike: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comments SET dislike='${dislike}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getDislike(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT dislike FROM comments WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].dislike);
            });
        });
    }

    addDislike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getDislike(uid).then((result: any) => {
                this.setDislike(uid, result + 1).then((result: any) => {
                    resolve(true);
                });
            });
        });
    }

    setStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comments SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

}