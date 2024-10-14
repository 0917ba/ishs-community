import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Post } from '../dto/post';
import { ReactionStatus } from '../util/reaction_status';
import { TargetBoard } from '../util/target_board';

export class PostDatabase {
    mysql = require('mysql');
    db = this.mysql.createPool({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.post
    });   
    constructor() {
    }

    createPost(authorId: string, author: string, title: string, content: string, like: number, dislike: number, view: number, createdAt: string, board: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(
                    `INSERT INTO post (uid, authorId, author, title, content, \`like\`, dislike, view, createdAt, board, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [uid, authorId, author, title, content, like, dislike, view, createdAt, board, status],
                    (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    logger.debug(`Created new post of uid ${uid}`);
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    updatePost(uid: string, title: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET title='${title}', content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    logger.debug(`Updated post of uid ${uid}`);
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPostByUid(uid: string) {
        return new Promise<Post|null>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length > 0) {
                        resolve(Post.fromObject(result[0]));
                    } else {
                        resolve(null);
                    }
                });
                connection.release();
            });
        });
    }

    getPostsByAuthorId(authorId: string) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM post WHERE authorId='${authorId}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Post.fromObjectList(result));
                });
                connection.release();
            });
        });
    }

    getPostsInAscendingOrderFromBoard(board: TargetBoard) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM post WHERE board='${board}' ORDER BY createdAt ASC`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Post.fromObjectList(result));
                });
                connection.release();
            });
        });
    }



    setpostStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setPostTitle(uid: string, title: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET title='${title}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setPostContent(uid: string, content: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setPostLike(uid: string, like: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET \`like\`=${like} WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPostLike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT \`like\` FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].like);
                });
                connection.release();
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
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET dislike=${dislike} WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPostDislike(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT dislike FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].dislike);
                });
                connection.release();
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
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE post SET view=${view} WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPostView(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT view FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].view);
                });
                connection.release();
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
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`DELETE FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    findPostByTitleAndRange(title: string, start: number, end: number) {
        return new Promise<Post[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM post WHERE title LIKE '%${title}%' ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Post.fromObjectList(result));
                });
                connection.release();
            });
        });
    }
}

export const postDatabase = new PostDatabase();
