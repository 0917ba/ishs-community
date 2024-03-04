import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Report } from '../dto/report';
import { ReportType } from '../util/report_type';
import { ReportStatus } from '../util/report_status';

export class ReportDatabase {
    mysql = require('mysql');
    db = this.mysql.createPool({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.report
    });

    constructor() {
    }

    createReport(type: string, authorId: string, targetId: string, content: string, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(
                    `INSERT INTO report (uid, type, authorId, targetId, content, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [uid, type, authorId, targetId, content, createdAt, status],
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

    getReportByUid(uid: string) {
        return new Promise<Report|null>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length == 0) {
                        resolve(null);
                    } else {
                        resolve(Report.fromObject(result[0]));
                    }
                });
                connection.release();
            });
        });
    }

    getReportsByAuthorId(authorId: string) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM report WHERE authorId='${authorId}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Report.fromObjectList(result));
                });
                connection.release();
            });
        });
    }

    getReportsByTargetId(targetId: string) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM report WHERE targetId='${targetId}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Report.fromObjectList(result));
                });
                connection.release();
            });
        });
    }

    getReportType(uid: string) {
        return new Promise<ReportType>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT type FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].type);
                });
                connection.release();
            });
        });
    }

    getReportAuthorId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT authorId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].authorId);
                });
                connection.release();
            });
        });
    }

    getReportTargetId(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT targetId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].targetId);
                });
                connection.release();
            });
        });
    }

    getReportContent(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT content FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].content);
                });
                connection.release();
            });
        });
    }

    getReportStatus(uid: string) {
        return new Promise<ReportStatus>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT status FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].status);
                });
                connection.release();
            });
        });
    }

    updateReportStatus(uid: string, status: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE report SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    deleteReport(uid: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`DELETE FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getReportsInAscendingOrder(start: number, end: number) {
        return new Promise<Report[]>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM report ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(Report.fromObjectList(result));
                });
                connection.release();
            });
        });
    }
}

export const reportDatabase = new ReportDatabase();