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

    public toJson(): any {
        return {
            uid: this.uid,
            type: this.type,
            userId: this.userId,
            targetId: this.targetId,
            status: this.status
        };
    }

    public toString(): string {
        return JSON.stringify(this.toJson());
    }

    public static fromJSON(json: any): Reaction {
        return new Reaction(json.uid, json.type, json.userId, json.targetId, json.status);
    }

    public static fromJSONString(jsonString: string): Reaction {
        return Reaction.fromJSON(JSON.parse(jsonString));
    }

    
}