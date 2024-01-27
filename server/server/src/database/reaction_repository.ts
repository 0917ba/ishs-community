import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Role } from '../util/role';
import { PrivilegeEnum } from '../util/user_privilege';
import { CodeManager, IdentiFier } from '../util/identifier';

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
            logger.info('Connected to database(user)');
        });
    }

    createReaction(type: string, userId: string, targetId: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO reactions (uid, type, userId, targetId, status) VALUES (?, ?, ?, ?, ?)`,
                [uid, type, userId, targetId, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Created new reaction of uid ${res.insertId}`);
                resolve(true);
            });
        });
    }

    getReactionByUid(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM reactions WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getReactionsByUserId(userId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM reactions WHERE userId='${userId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getUserId(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT userId FROM reactions WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].userId);
            });
        });
    }

    getTargetId(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT targetId FROM reactions WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].targetId);
            });
        });
    }

    getReactionType(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT type FROM reactions WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].type);
            });
        });
    }

    getReactionStatus(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT status FROM reactions WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].status);
            });
        });
    }

    setReactionStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE reactions SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                logger.debug(`Updated reaction of uid ${uid}`);
                resolve(true);
            });
        });
    }
}