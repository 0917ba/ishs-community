export class CodeManager {
    public static CODE: IdentiFier;
}

export class IdentiFier {

    code: string;

    constructor(code: string) {
        this.code = code;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public equals(id: string): boolean {
        return this.code === id;
    }


}