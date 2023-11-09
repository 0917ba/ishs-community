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

    signUp(key: number, id: string, password: string, identifyCode: string, email: string, name: string, nickname: string, birthday: string, privilege: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`INSERT INTO users (\`key\`, id, password, identifyCode, email, name, nickname, birthday, privilege) VALUES (${key}, ${id}, ${password}, ${identifyCode}, ${email}, ${name}, ${nickname}, ${birthday}, ${privilege}')`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }

    login(id: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE id='${id}' AND password='${password}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result.length > 0);
            });
        });
    }
    

    getUsers() {
        this.db.query('SELECT * FROM users', (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getUser(key: number) {
        this.db.query(`SELECT * FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    removeUser(key: number) {
        this.db.query(`DELETE FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    updateUser(key: number, name: string, privilege: number, password: string) {
        this.db.query(`UPDATE users SET name='${name}', privilege=${privilege}, password='${password}' WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    userExists(key: number): boolean {
        this.db.query(`SELECT * FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
            return result.length > 0;
        });
        return false;
    }

    updateUserKey(key: number, name: string, password: string) {
        this.db.query(`UPDATE users SET \`key\`=${key} WHERE name='${name}' AND password='${password}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getPrivilege(id: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT privilege FROM users WHERE \`id\`=${id}`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let privilege: number = result[0].privilege;
                resolve(privilege);
            });
        });
    }

    close() {
        this.db.end();
    }
}

