import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';

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

    signup(id: string, password: string, nickname: string, email: string, studentName: string, generation: number, classNumber: number, studentNumber: number, privilege: number, role: string, penalty: number): Promise<boolean> {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO users (uid, id, password, nickname, email, profileImage, studentName, generation, classNumber, studentNumber, birthday, privilege, role, penalty)
                VALUES (?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`, [uid, id, password, nickname, email, '', studentName, generation, classNumber, studentNumber, '', privilege, role, penalty],
                (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    logger.debug(`Created new user of uid ${res.insertId}`);
                    resolve(true);
                });
        });
    }

    signin(id: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE id='${id}' AND password='${password}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result.length > 0);
            });
        });
    }
    
    getUserByUid(uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    setPassword(uid: string, password: string) {
        this.db.query(`UPDATE users SET password='${password}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setEmail(uid: string, email: string) {
        this.db.query(`UPDATE users SET email='${email}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setPrivilege(uid: string, privilege: number) {
        this.db.query(`UPDATE users SET privilege=${privilege} WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getPrivilege(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT privilege FROM users WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let privilege: number = result[0].privilege;
                resolve(privilege);
            });
        });
    }

    setNickname(uid: string, nickname: string) {
        this.db.query(`UPDATE users SET nickname='${nickname}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setBirthday(uid: string, birthday: string) {
        this.db.query(`UPDATE users SET birthday='${birthday}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setProfileImage(uid: string, profileImage: string) {
        this.db.query(`UPDATE users SET profileImage='${profileImage}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setPenalty(uid: string, penalty: number) {
        this.db.query(`UPDATE users SET penalty=${penalty} WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        }); 
    }

    getPenalty(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT penalty FROM users WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let penalty: number = result[0].penalty;
                resolve(penalty);
            });
        });
    }

    addPenalty(uid: string) {
        this.getPenalty(uid).then((penalty: number) => {
            penalty++;
            this.setPenalty(uid, penalty);
        });
    }

    setRole(uid: string, role: string) {
        this.db.query(`UPDATE users SET role='${role}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

