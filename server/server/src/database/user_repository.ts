import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { User } from '../dto/user';

export class UserDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.user
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(user)');
        });
        this.db.on('error', (err: any) => {});
    }

    signup(id: string, password: string, nickname: string, email: string, studentName: string, generation: number, classNumber: number, studentNumber: number, privilege: number, role: string, penalty: number): Promise<boolean> {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO user (uid, id, password, nickname, email, profileImage, studentName, generation, classNumber, studentNumber, birthday, privilege, role, penalty)
                VALUES (?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`, [uid, id, password, nickname, email, '', studentName, generation, classNumber, studentNumber, null, privilege, role, penalty],
                (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
        });
    }

    signin(id: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE id='${id}' AND password='${password}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result.length > 0);
            });
        });
    }
    
    getUserByUid(uid: string) {
        return new Promise<User>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let res = User.fromObject(result[0]);
                resolve(res);
            });
        });
    }

    getUserById(id: string) {
        return new Promise<User>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE id='${id}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(User.fromObject(result[0]));
            });
        });
    }

    setPassword(uid: string, password: string) {
        this.db.query(`UPDATE user SET password='${password}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setEmail(uid: string, email: string) {
        this.db.query(`UPDATE user SET email='${email}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setPrivilege(uid: string, privilege: number) {
        this.db.query(`UPDATE user SET privilege=${privilege} WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getPrivilege(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT privilege FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let privilege: number = result[0].privilege;
                resolve(privilege);
            });
        });
    }

    setNickname(uid: string, nickname: string) {
        this.db.query(`UPDATE user SET nickname='${nickname}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setBirthday(uid: string, birthday: string) {
        this.db.query(`UPDATE user SET birthday='${birthday}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setProfileImage(uid: string, profileImage: string) {
        this.db.query(`UPDATE user SET profileImage='${profileImage}' WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    setPenalty(uid: string, penalty: number) {
        this.db.query(`UPDATE user SET penalty=${penalty} WHERE uid='${uid}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        }); 
    }

    getPenalty(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT penalty FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
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
        this.db.query(`UPDATE user SET role='${role}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

export const userDatabase = new UserDatabase();