import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Reaction } from '../dto/reaction';
import { ReactionType } from '../util/reaction_type';
import { ReactionStatus } from '../util/reaction_status';

export class ReactionDatabase {
    mysql = require('mysql');
    db = this.mysql.createPool({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.reaction
    });   
    constructor() {
    }

    createReaction(type: string, userId: string, targetId: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(
                    `INSERT INTO reaction (uid, type, userId, targetId, status) VALUES (?, ?, ?, ?, ?)`,
                    [uid, type, userId, targetId, status],
                    (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getReactionByUid(uid: string) {
        return new Promise<Reaction | null>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length == 0) {
                        resolve(null);
                    } else {
                        resolve(Reaction.fromObject(result[0]));
                    }
                });
                connection.release();
            });
        });
    }

    getReactionsByUserId(userId: string) {
        return new Promise<Reaction[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM reaction WHERE userId='${userId}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Reaction.fromObjectList(result));
                });
                connection.release();
            });
        });
    }

    findReactionByUserId(target: string, userId: string) {
        return new Promise<Reaction | null>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM reaction WHERE targetId='${target}' AND userId='${userId}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length > 0) {
                        resolve(Reaction.fromObject(result[0]));
                    } else {
                        resolve(null);
                    }
                });
                connection.release();
            });
        });
    }


    getUserId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT userId FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].userId);
                });
                connection.release();
            });
        });
    }

    getTargetId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT targetId FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].targetId);
                });
                connection.release();
            });
        });
    }

    getReactionType(uid: string) {
        return new Promise<ReactionType>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT type FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].type);
                });
                connection.release();
            });
        });
    }

    getReactionStatus(uid: string) {
        return new Promise<ReactionStatus>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT status FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].status);
                });
                connection.release();
            });
        });
    }

    setReactionStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE reaction SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    deleteReaction(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`DELETE FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }
}

export const reactionDatabase = new ReactionDatabase();