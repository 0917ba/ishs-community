import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { User } from '../dto/user';

export class UserDatabase {
    mysql = require('mysql');
    db = this.mysql.createPool({
        host: cf.database.host,
        user: cf.database.user,
        password: cf.database.password,
        database: cf.database.database.user
    });   
    constructor() {
    }

    signup(id: string, password: string, nickname: string, email: string, studentName: string, generation: number, classNumber: number, studentNumber: number, privilege: number, role: string, penalty: number, atp: number): Promise<boolean> {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(
                    `INSERT INTO user (uid, id, password, nickname, email, profileImage, studentName, generation, classNumber, studentNumber, birthday, privilege, role, penalty, atp)
                    VALUES (?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?)`, [uid, id, password, nickname, email, '', studentName, generation, classNumber, studentNumber, null, privilege, role, penalty, atp],
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

    signin(id: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM user WHERE id='${id}' AND password='${password}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result.length > 0);
                });
                connection.release();
            });
        });
    }
    
    getUserByUid(uid: string) {
        return new Promise<User>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let res = User.fromObject(result[0]);
                    resolve(res);
                });
                connection.release();
            });
        });
    }

    getUserById(id: string) {
        return new Promise<User>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM user WHERE id='${id}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let res = User.fromObject(result[0]);
                    resolve(res);
                });
                connection.release();
            });
        });
    }

    setPassword(uid: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET password='${password}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setEmail(uid: string, email: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET email='${email}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setPrivilege(uid: string, privilege: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET privilege=${privilege} WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPrivilege(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT privilege FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let privilege: number = result[0].privilege;
                    resolve(privilege);
                });
                connection.release();
            });
        });
    }

    setNickname(uid: string, nickname: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET nickname='${nickname}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setBirthday(uid: string, birthday: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET birthday='${birthday}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setProfileImage(uid: string, profileImage: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET profileImage='${profileImage}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    setPenalty(uid: string, penalty: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET penalty=${penalty} WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getPenalty(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT penalty FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let penalty: number = result[0].penalty;
                    resolve(penalty);
                });
                connection.release();
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
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET role='${role}' WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getRole(uid: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT role FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let role: string = result[0].role;
                    resolve(role);
                });
                connection.release();
            });
        });
    }

    setAtp(uid: string, atp: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE user SET atp=${atp} WHERE uid='${uid}'`, (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
                connection.release();
            });
        });
    }

    getAtp(uid: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.getConnection((err: any, connection: any) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT atp FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    let atp: number = result[0].atp;
                    resolve(atp);
                });
                connection.release();
            });
        });
    }
}

export const userDatabase = new UserDatabase();