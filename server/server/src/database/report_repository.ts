import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Role } from '../util/role';
import { PrivilegeEnum } from '../util/user_privilege';
import { CodeManager, IdentiFier } from '../util/identifier';

export class ReportDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.report
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(report)');
        });
    }

    createReport(type: string, authorId: string, targetId: string, content: string, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO reports (uid, type, authorId, targetId, content, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [uid, type, authorId, targetId, content, createdAt, status],
                (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getReportByUid(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getReportsByAuthorId(authorId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM reports WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getReportsByTargetId(targetId: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM reports WHERE targetId='${targetId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    getReportType(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT type FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].type);
            });
        });
    }

    getReportAuthorId(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT authorId FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].authorId);
            });
        });
    }

    getReportTargetId(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT targetId FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].targetId);
            });
        });
    }

    getReportContent(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT content FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].content);
            });
        });
    }

    getReportStatus(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT status FROM reports WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].status);
            });
        });
    }
}

export const reportDatabase = new ReportDatabase();