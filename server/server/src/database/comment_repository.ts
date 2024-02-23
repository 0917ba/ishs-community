import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Comment } from '../dto/comment';
import { ReactionStatus } from '../util/reaction_status';
import { resolve } from 'styled-jsx/css';

export class CommentDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.comment
    });   
    constructor() {}

    connect() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(comment)');
        });
    }

    createComment(authorId: string, postId: string, author: string, like: number, dislike: number, createdAt: string, target: string, content: string, status: string) {
        let uid = new UUID().generateUUID();
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO comment (uid, authorId, postId, author, \`like\`, dislike, createdAt, target, content, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [uid, authorId, postId, author, like, dislike, createdAt, target, content, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    updateComment(uid: string, content: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comment SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    getCommentByUid(uid: string) {
        this.connect();
        return new Promise<Comment>((resolve, reject) => {
            this.db.query(`SELECT * FROM comment WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Comment.fromObject(result[0]));
            });
        }).then((result: Comment) => {
            this.close();
            return result;
        });
    }

    getCommentsByPostId(postId: string) {
        this.connect();
        return new Promise<Comment[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM comment WHERE postId='${postId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Comment.fromObjectList(result));
            });
        }).then((result: Comment[]) => {
            this.close();
            return result;
        });
    }

    getCommentsByAuthorId(authorId: string) {
        this.connect();
        return new Promise<Comment[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM comment WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Comment.fromObjectList(result));
            });
        }).then((result: Comment[]) => {
            this.close();
            return result;
        });
    }

    getCommentsByTarget(target: string) {
        this.connect();
        return new Promise<Comment[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM comment WHERE target='${target}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Comment.fromObjectList(result));
            });
        }).then((result: Comment[]) => {
            this.close();
            return result;
        });
    }

    deleteCommentByUid(uid: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM comment WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    setContent(uid: string, content: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comment SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    setLike(uid: string, like: number) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comment SET \`like\`='${like}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    getLike(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT \`like\` FROM comment WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].like);
            });
        }).then((result: number) => {
            this.close();
            return result;
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
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comment SET dislike='${dislike}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    getDislike(uid: string) {
        this.connect();
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT dislike FROM comment WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].dislike);
            });
        }).then((result: any) => {
            this.close();
            return result;
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

    subLike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getLike(uid).then((result: any) => {
                this.setLike(uid, result - 1).then((result: any) => {
                    resolve(true);
                });
            });
        });
    }

    subDislike(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.getDislike(uid).then((result: any) => {
                this.setDislike(uid, result - 1).then((result: any) => {
                    resolve(true);
                });
            });
        });
    }

    updateReaction(uid: string, status: string, previousStatus?: string) {
        return new Promise<boolean>((resolve, reject) => {
            if (status == ReactionStatus.LIKE) {
                this.addLike(uid).then((result: boolean) => {
                    resolve(result);
                });
            } else if (status == ReactionStatus.DISLIKE) {
                this.addDislike(uid).then((result: boolean) => {
                    resolve(result);
                });
            } else if (status == ReactionStatus.NONE) {
                if (previousStatus == ReactionStatus.LIKE) {
                    this.subLike(uid).then((result: boolean) => {
                        resolve(result);
                    });
                } else if (previousStatus == ReactionStatus.DISLIKE) {
                    this.subDislike(uid).then((result: boolean) => {
                        resolve(result);
                    });
                }
            }
        });
    }

    setStatus(uid: string, status: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE comment SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    close() {
        this.db.end();
    }
}

export const commentDatabase = new CommentDatabase();