import { logger } from '../logging/central_log';
import { cf } from '../config/config';
import { UUID } from '../util/uuid_generator';
import { Role } from '../util/role';
import { PrivilegeEnum } from '../util/user_privilege';
import { CodeManager, IdentiFier } from '../util/identifier';

/*
uid int AI PK 
id varchar(45) 
password varchar(45) 
nickname varchar(45)
email varchar(45) 
profileImage varchar(45) 
studentName varchar(45) 
generation int 
classNumber int 
studentNumber int 
birthday datetime 
privilege int 
role enum('DEVELOPER','STUDENT','TEACHER','USER','ADMIN') 
penalty int
*/

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

    signUp(id: string, password: string, nickname: string, email: string, studentName: string, birthday: string): Promise<boolean> {
        let uid = new UUID().generateUUID();
        return new Promise<boolean>((resolve, reject) => {
            this.db.query(
                `INSERT INTO users (uid, id, password, nickname, email, profileImage, studentName, generation, classNumber, studentNumber, birthday, privilege, role, penalty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [uid, id, password, nickname, email, '', studentName, 0, 0, 0, birthday, PrivilegeEnum.DEFAULT, Role.ADMIN, 0],
                (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    logger.debug(`Created new user of uid ${res.insertId}`);
                    resolve(true);
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

    getUser(id: string) {
        this.db.query(`SELECT * FROM users WHERE id=${id}`, (err: any, result: any) => {
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

