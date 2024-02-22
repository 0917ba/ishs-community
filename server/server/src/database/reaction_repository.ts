import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Reaction } from '../dto/reaction';
import { ReactionType } from '../util/reaction_type';
import { ReactionStatus } from '../util/reaction_status';

export class ReactionDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.reaction
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(reaction)');
        });
        this.db.on('error', (err: any) => {
            this.db.end();
            this.db = this.mysql.createConnection({
                host: cf.database.host,
                user: cf.database.user,
                password: cf.database.password,
                database: cf.database.database.post
            });
            this.db.connect((err: any) => {
                if (err) {
                    throw err;
                }
                logger.info('Connected to database(board)');
            });
        });
    }

    createReaction(type: string, userId: string, targetId: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO reaction (uid, type, userId, targetId, status) VALUES (?, ?, ?, ?, ?)`,
                [uid, type, userId, targetId, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getReactionByUid(uid: string) {
        return new Promise<Reaction | null>((resolve, reject) => {
            this.db.query(`SELECT * FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Reaction.fromObject(result[0]));
            });
        });
    }

    getReactionsByUserId(userId: string) {
        return new Promise<Reaction[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM reaction WHERE userId='${userId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Reaction.fromObjectList(result));
            });
        });
    }

    findReactionByUserId(target: string, userId: string) {
        return new Promise<Reaction | null>((resolve, reject) => {
            this.db.query(`SELECT * FROM reaction WHERE targetId='${target}' AND userId='${userId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                if (result.length > 0) {
                    resolve(Reaction.fromObject(result[0]));
                } else {
                    resolve(null);
                }
            });
        });
    }


    getUserId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT userId FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].userId);
            });
        });
    }

    getTargetId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT targetId FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].targetId);
            });
        });
    }

    getReactionType(uid: string) {
        return new Promise<ReactionType>((resolve, reject) => {
            this.db.query(`SELECT type FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].type);
            });
        });
    }

    getReactionStatus(uid: string) {
        return new Promise<ReactionStatus>((resolve, reject) => {
            this.db.query(`SELECT status FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].status);
            });
        });
    }

    setReactionStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE reaction SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Updated reaction of uid ${uid}`);
                resolve(true);
            });
        });
    }

    deleteReaction(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM reaction WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Deleted reaction of uid ${uid}`);
                resolve(true);
            });
        });
    }
}

export const reactionDatabase = new ReactionDatabase();