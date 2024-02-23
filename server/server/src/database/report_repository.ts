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
        this.db.end();
    }

    connect() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(report)');
        });
    }

    createReport(type: string, authorId: string, targetId: string, content: string, createdAt: string, status: string) {
        let uid = new UUID().generateUUID();
        this.connect();
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
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    getReportByUid(uid: string) {
        this.connect();
        return new Promise<Report>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObject(result[0]));
            });
        }).then((result: Report) => {
            this.close();
            return result;
        });
    }

    getReportsByAuthorId(authorId: string) {
        this.connect();
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE authorId='${authorId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        }).then((result: Report[]) => {
            this.close();
            return result;
        });
    }

    getReportsByTargetId(targetId: string) {
        this.connect();
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report WHERE targetId='${targetId}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        }).then((result: Report[]) => {
            this.close();
            return result;
        });
    }

    getReportType(uid: string) {
        this.connect();
        return new Promise<ReportType>((resolve, reject) => {
            this.db.query(`SELECT type FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].type);
            });
        }).then((result: ReportType) => {
            this.close();
            return result;
        });
    }

    getReportAuthorId(uid: string) {
        this.connect();
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT authorId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].authorId);
            });
        }).then((result: string) => {
            this.close();
            return result;
        });
    }

    getReportTargetId(uid: string) {
        this.connect();
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT targetId FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].targetId);
            });
        }).then((result: string) => {
            this.close();
            return result;
        });
    }

    getReportContent(uid: string) {
        this.connect();
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT content FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].content);
            });
        }).then((result: string) => {
            this.close();
            return result;
        });
    }

    getReportStatus(uid: string) {
        this.connect();
        return new Promise<ReportStatus>((resolve, reject) => {
            this.db.query(`SELECT status FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0].status);
            });
        }).then((result: ReportStatus) => {
            this.close();
            return result;
        });
    }

    updateReportStatus(uid: string, status: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE report SET status='${status}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    deleteReport(uid: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`DELETE FROM report WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getReportsInAscendingOrder(start: number, end: number) {
        this.connect();
        return new Promise<Report[]>((resolve, reject) => {
            this.db.query(`SELECT * FROM report ORDER BY createdAt ASC LIMIT ${start}, ${end}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(Report.fromObjectList(result));
            });
        }).then((result: Report[]) => {
            this.close();
            return result;
        });
    }

    close() {
        this.db.end();
    }
}

export const reportDatabase = new ReportDatabase();