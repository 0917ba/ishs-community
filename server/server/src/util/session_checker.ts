import { QueryChecker } from './query_checker';

export class SessionChecker {

    constructor() {
    }

    checkLogin(req: any) {
        let checker = new QueryChecker();
        if (checker.notNull(req.session.key, req.session.name, req.session.password)) {
            return true;
        } else {
            return false;
        }
    }

    checkPrivilege(req: any, privilege: number) {
        if (this.checkLogin(req)) {
            if (req.session.privilege >= privilege) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}