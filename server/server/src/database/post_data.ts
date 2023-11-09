import { logger } from '../logging/central_log';
import { cf } from '../config/config';

export class UserDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(user)');
        });
    }

    getView(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT view FROM users WHERE uid=${uid}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let view: number = result[0].view;
                resolve(view);
            });
        });
    }

    async upView(uid: string) {
        let view: number = await this.getView(uid);
        view++;
        this.db.query(`UPDATE posts SET view=${view} WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    close() {
        this.db.end();
    }
}

