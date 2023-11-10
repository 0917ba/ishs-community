export enum PrivilegeEnum {
    CONNECT = 1 << 0,
    WRITE_POST = 1 << 1,
    WRITE_COMMENT = 1 << 2,
    UPDATE_POST = 1 << 3,
    DELETE_POST = 1 << 4,
    ALL = 0x111111,
    DEFAULT = CONNECT | WRITE_POST | WRITE_COMMENT
}

export class UserPrivilege {

    private privilege: number;

    constructor(privilege: number) {
        this.privilege = privilege;
    }

    public getPrivilege(): number {
        return this.privilege;
    }

    public setPrivilege(...privilege: PrivilegeEnum[]): void {
        this.privilege = 0;
        privilege.forEach((p: PrivilegeEnum) => {
            this.privilege |= p;
        });
    }

    public addPrivilege(privilege: PrivilegeEnum): void {
        this.privilege |= privilege;
    }

    public removePrivilege(privilege: PrivilegeEnum): void {
        this.privilege &= ~privilege;
    }

    public hasPrivilege(privilege: PrivilegeEnum): boolean {
        return (this.privilege & privilege) === privilege;
    }

    public hasPrivilegeAll(...privilege: PrivilegeEnum[]): boolean {
        let result: boolean = true;
        privilege.forEach((p: PrivilegeEnum) => {
            result = result && this.hasPrivilege(p);
        });
        return result;
    }

    public getPrivilegeList(): PrivilegeEnum[] {
        let result: PrivilegeEnum[] = [];
        for(let p in PrivilegeEnum) {
            if(!isNaN(Number(p))) {
                let n: number = Number(p);
                if(this.hasPrivilege(n)) {
                    result.push(n);
                }
            }
        }
        return result;
    }

    public getPrivilegeListString(): string[] {
        let result: string[] = [];
        for(let p in PrivilegeEnum) {
            if(!isNaN(Number(p))) {
                let n: number = Number(p);
                if(this.hasPrivilege(n)) {
                    result.push(PrivilegeEnum[n]);
                }
            }
        }
        return result;
    }
}