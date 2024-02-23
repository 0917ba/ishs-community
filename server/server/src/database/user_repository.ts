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
    constructor() {}

    connect() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            logger.info('Connected to database(user)');
        });
    }

    signup(id: string, password: string, nickname: string, email: string, studentName: string, generation: number, classNumber: number, studentNumber: number, privilege: number, role: string, penalty: number): Promise<boolean> {
        let uid = new UUID().generateUUID();
        this.connect();
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
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }

    signin(id: string, password: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE id='${id}' AND password='${password}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(result.length > 0);
            });
        }).then((result: boolean) => {
            this.close();
            return result;
        });
    }
    
    getUserByUid(uid: string) {
        this.connect();
        return new Promise<User>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let res = User.fromObject(result[0]);
                resolve(res);
            });
        }).then((result: User) => {
            this.close();
            return result;
        });
    }

    getUserById(id: string) {
        this.connect();
        return new Promise<User>((resolve, reject) => {
            this.db.query(`SELECT * FROM user WHERE id='${id}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(User.fromObject(result[0]));
            });
        }).then((result: User) => {
            this.close();
            return result;
        });
    }

    setPassword(uid: string, password: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET password='${password}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setEmail(uid: string, email: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET email='${email}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setPrivilege(uid: string, privilege: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET privilege=${privilege} WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getPrivilege(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT privilege FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let privilege: number = result[0].privilege;
                resolve(privilege);
            });
        }).then((result: number) => {
            this.close();
            return result;
        });
    }

    setNickname(uid: string, nickname: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET nickname='${nickname}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setBirthday(uid: string, birthday: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET birthday='${birthday}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setProfileImage(uid: string, profileImage: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET profileImage='${profileImage}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    setPenalty(uid: string, penalty: number) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET penalty=${penalty} WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getPenalty(uid: string) {
        this.connect();
        return new Promise<number>((resolve, reject) => {
            this.db.query(`SELECT penalty FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let penalty: number = result[0].penalty;
                resolve(penalty);
            });
        }).then((result: number) => {
            this.close();
            return result;
        });
    }

    addPenalty(uid: string) {
        this.getPenalty(uid).then((penalty: number) => {
            penalty++;
            this.setPenalty(uid, penalty);
        });
    }

    setRole(uid: string, role: string) {
        this.connect();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(`UPDATE user SET role='${role}' WHERE uid='${uid}'`, (err: any, result: any) => {
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

    getRole(uid: string) {
        this.connect();
        return new Promise<string>((resolve, reject) => {
            this.db.query(`SELECT role FROM user WHERE uid='${uid}'`, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }
                let role: string = result[0].role;
                resolve(role);
            });
        }).then((result: string) => {
            this.close();
            return result;
        });
    }

    close() {
        this.db.end();
    }
}

export const userDatabase = new UserDatabase();