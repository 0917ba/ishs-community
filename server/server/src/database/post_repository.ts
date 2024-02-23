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
    constructor() {}

    connect() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(post)');
        });
    }

    createPost(authorId: string, author: string, title: string, content: string, like: number, dislike: number, view: number, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        this.connect();
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
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    updatePost(uid: string, title: string, content: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET title='${title}', content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Updated post of uid ${uid}`);
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    getPostByUid(uid: string) {
        this.connect();
        return new Promise<Post>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObject(result[0]));
            });
        }).then((result: Post) => {
            this.close();
            return result;
        });
    }

    getPostsByAuthorId(authorId: string) {
        this.connect();
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        }).then((result: Post[]) => {
            this.close();
            return result;
        });
    }

    getPostsInAscendingOrder(start: number, end: number) {
        this.connect();
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        }).then((result: Post[]) => {
            this.close();
            return result;
        });
    }



    setpostStatus(uid: string, status: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setPostTitle(uid: string, title: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET title='${title}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setPostContent(uid: string, content: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET content='${content}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setPostLike(uid: string, like: number) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET \`like\`=${like} WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getPostLike(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT \`like\` FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
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
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET dislike=${dislike} WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getPostDislike(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT dislike FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].dislike);
            });
        }).then((result: number) => {
            this.close();
            return result;
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
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE post SET view=${view} WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getPostView(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT view FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].view);
            });
        }).then((result: number) => {
            this.close();
            return result;
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
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM post WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Deleted post of uid ${uid}`);
                resolve(true);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    findPostByTitleAndRange(title: string, start: number, end: number) {
        this.connect();
        return new Promise<Post[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM post WHERE title LIKE '%${title}%' ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Post.fromObjectList(result));
            });
        }).then((result: Post[]) => {
            this.close();
            return result;
        });
    }

    close() {
        this.db.end();
    }
}

export const postDatabase = new PostDatabase();
