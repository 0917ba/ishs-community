import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Post } from '../dto/post';
import { ReactionStatus } from '../util/reaction_status';

export class PostDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.post
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(board)');
        });
    }

    createPost(authorId: string, author: string, title: string, content: string, like: number, dislike: number, view: number, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO post (uid, authorId, author, title, content, \`like\`, dislike, view, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [uid, authorId, author, title, content, like, dislike, view, createdAt, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Created new post of uid ${uid}`);
                resolve(true);
            });
        });
    }

    updatePost(uid: string, title: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET title='${title}', content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Updated post of uid ${uid}`);
                resolve(true);
            });
        });
    }

    getPostByUid(uid: string) {
        return new Promise<Post>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObject(result[0]));
            });
        });
    }

    getPostsByAuthorId(authorId: string) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        });
    }

    getPostsInAscendingOrder(start: number, end: number) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        });
    }



    setpostStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostTitle(uid: string, title: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET title='${title}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostContent(uid: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    setPostLike(uid: string, like: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET \`like\`=${like} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostLike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT \`like\` FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
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

    subPostLike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getPostLike(uid).then((like: number) => {
                this.setPostLike(uid, like - 1).then((result: boolean) => {
                    resolve(result);
                });
            });
        });
    }

    setPostDislike(uid: string, dislike: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET dislike=${dislike} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostDislike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT dislike FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
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

    subPostDislike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getPostDislike(uid).then((dislike: number) => {
                this.setPostDislike(uid, dislike - 1).then((result: boolean) => {
                    resolve(result);
                });
            });
        });
    }

    updateReaction(uid: string, status: string, previousStatus?: string) {
        return new Promise<boolean>((resolve, reject) => {
            if (status == ReactionStatus.LIKE) {
                this.addPostLike(uid).then((result: boolean) => {
                    resolve(result);
                });
            } else if (status == ReactionStatus.DISLIKE) {
                this.addPostDislike(uid).then((result: boolean) => {
                    resolve(result);
                });
            } else if (status == ReactionStatus.NONE) {
                if (previousStatus == ReactionStatus.LIKE) {
                    this.subPostLike(uid).then((result: boolean) => {
                        resolve(result);
                    });
                } else if (previousStatus == ReactionStatus.DISLIKE) {
                    this.subPostDislike(uid).then((result: boolean) => {
                        resolve(result);
                    });
                }
            }
        });
    }

    setPostView(uid: string, view: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET view=${view} WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getPostView(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT view FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
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
            this.db.query(`DELETE FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Deleted post of uid ${uid}`);
                resolve(true);
            });
        });
    }

    findPostByTitleAndRange(title: string, start: number, end: number) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE title LIKE '%${title}%' ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        });
    }

    close() {
        this.db.end();
    }
}

export const postDatabase = new PostDatabase();
