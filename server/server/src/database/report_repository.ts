import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Role } from '../util/role';
import { PrivilegeEnum } from '../util/user_privilege';
import { CodeManager, IdentiFier } from '../util/identifier';
import { Report } from '../dto/report';
import { ReportType } from '../util/report_type';
import { ReportStatus } from '../util/report_status';

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
        this.db.on('error', (err: any) => {});
    }

    createReport(type: string, authorId: string, targetId: string, content: string, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO report (uid, type, authorId, targetId, content, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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
        return new Promise<Report>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObject(result[0]));
            });
        });
    }

    getReportsByAuthorId(authorId: string) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        });
    }

    getReportsByTargetId(targetId: string) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE targetId='${targetId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        });
    }

    getReportType(uid: string) {
        return new Promise<ReportType>((resolve, reject) => {
            this.db.query(`SELECT type FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].type);
            });
        });
    }

    getReportAuthorId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT authorId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].authorId);
            });
        });
    }

    getReportTargetId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT targetId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].targetId);
            });
        });
    }

    getReportContent(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT content FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].content);
            });
        });
    }

    getReportStatus(uid: string) {
        return new Promise<ReportStatus>((resolve, reject) => {
            this.db.query(`SELECT status FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].status);
            });
        });
    }

    updateReportStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE report SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    deleteReport(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    getReportsInAscendingOrder(start: number, end: number) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        });
    }
}

export const reportDatabase = new ReportDatabase();