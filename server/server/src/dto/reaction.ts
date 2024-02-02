import { ReactionStatus } from "../util/reaction_status";

export class Reaction {
    // uid, type, userId, targetId, status
    private readonly uid: string;
    private type: string;
    private userId: string;
    private targetId: string;
    private status: ReactionStatus;

    constructor(uid: string, type: string, userId: string, targetId: string, status: ReactionStatus) {
        this.uid = uid;
        this.type = type;
        this.userId = userId;
        this.targetId = targetId;
        this.status = status;
    }

    public getUid(): string {
        return this.uid;
    }

    public getType(): string {
        return this.type;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getTargetId(): string {
        return this.targetId;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: ReactionStatus): void {
        this.status = status;
    }

    public toObject(): any {
        return {
            uid: this.uid,
            type: this.type,
            userId: this.userId,
            targetId: this.targetId,
            status: this.status
        };
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromObject(obj: any): Reaction {
        return new Reaction(obj.uid, obj.type, obj.userId, obj.targetId, obj.status);
    }

    public static fromObjectString(objString: string): Reaction {
        return Reaction.fromObject(JSON.parse(objString));
    }

    public static fromObjectList(objList: any[]): Reaction[] {
        let reactions: Reaction[] = [];
        if (objList == null) return reactions;
        for (let obj of objList) {
            reactions.push(Reaction.fromObject(obj));
        }
        return reactions;
    }

    
}