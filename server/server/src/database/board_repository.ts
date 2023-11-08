import { logger } from '../logging/central_log';
import { cf } from '../config/config';

export class BoardDatabase {
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
            logger.info('Connected to database(board)');
        });
    }

    addPost(title: string, content: string, auther: number) {
        this.db.query(
            `INSERT INTO posts (title, content, author, write_date) VALUES (?, ?, ?, ?)`,
            [title, content, auther, new Date(Date.now())],
            (err: any, res: any) => {
            if (err) {
                throw err;
            }
            logger.debug(`Created new post of uid ${res.insertId}`);
        });
    }

    existsByCode(code: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                'select uid from posts where uid=?',
                [code],
                (err: any, res: any) => {
                    if(err) {
                        reject(err);
                    }
                    else resolve(res.length > 0)
                }
            )
        });
    }

    deletePostByCode(code: number) {
        this.db.query(
            'delete from posts where uid=?',
            [code],
            (err: any, res: any) => {
                if(err) {
                    throw err;
                }
                logger.debug(`Deleted post of ${code}`);
            }
        )
    }

    updatePost(code: number, title: string, content: string) {
        this.db.query(
            'update posts set title=?, content=? where uid=?',
            [title, content, code],
            (err: any, res: any) => {
                if(err) {
                    throw err;
                }
                logger.debug(`Updated post of ${code}`);
            }
        )
    }

    getDesc(count: number) {
        return new Promise<Object>((resolve, reject) => {
            this.db.query(
                'select * from posts order by uid desc limit ?',
                [count],
                (err: any, res: any) => {
                    if(err) {
                        logger.error(err);
                        reject(err);
                        return;
                    }
                    let ret = [];
                    for(let row of res) {
                        ret.push({
                            uid: row.uid,
                            title: row.title,
                            content: row.content,
                            write_date: row['write_date']
                        });
                    }
                    resolve(ret);
                }
            )
        });
    }
    getRange(from: number, to: number) {
        return new Promise<Object>((resolve, reject) => {
            this.db.query(
                'select * from posts where uid >= ? and uid <= ?',
                [from, to],
                (err: any, res: any) => {
                    if(err) {
                        logger.error(err);
                        reject(err);
                        return;
                    }
                    let ret = [];
                    for(let row of res) {
                        ret.push({
                            uid: row.uid,
                            title: row.title,
                            content: row.content,
                            write_date: row['write_date']
                        });
                    }
                    resolve(ret);
                }
            )
        });
    }

    close() {
        this.db.end();
    }
}

