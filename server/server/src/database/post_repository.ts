import { logger } from '../logging/central_log';
import { cf } from '../config/config';

export class PostDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(board)');
        });
    }

    createPost(uid: string, authorId: string, author: string, title: string, content: string, like: number, dislike: number, view: number, createdAt: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO posts (uid, authorId, author, title, content, like, dislike, view, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [uid, authorId, author, title, content, like, dislike, view, createdAt, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Created new post of uid ${res.insertId}`);
                resolve(true);
            });
        });
    }

    getPostByUid(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM posts WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getPostsByAuthorId(authorId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM posts WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    setPostStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostTitle(uid: string, title: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET title='${title}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostContent(uid: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostLike(uid: string, like: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET like=${like} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostLike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT like FROM posts WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].like);
            });
        });
    }

    addPostLike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getPostLike(uid).then((like: number) => {
                this.setPostLike(uid, like + 1).then((result: boolean) => {
                    resolve(result);
                });
            });
        });
    }

    setPostDislike(uid: string, dislike: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET dislike=${dislike} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostDislike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT dislike FROM posts WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].dislike);
            });
        });
    }

    addPostDislike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getPostDislike(uid).then((dislike: number) => {
                this.setPostDislike(uid, dislike + 1).then((result: boolean) => {
                    resolve(result);
                });
            });
        });
    }

    setPostView(uid: string, view: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE posts SET view=${view} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostView(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT view FROM posts WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].view);
            });
        });
    }

    addPostView(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getPostView(uid).then((view: number) => {
                this.setPostView(uid, view + 1).then((result: boolean) => {
                    resolve(result);
                });
            });
        });
    }

    deletePost(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM posts WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Deleted post of uid ${uid}`);
                resolve(true);
            });
        });
    }

    close() {
        this.db.end();
    }
}

