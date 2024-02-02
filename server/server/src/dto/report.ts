import { ReportStatus } from "../util/report_status";

export class Report {
    // uid, type, authorId, targetId, content, createdAt, status
    private readonly uid: string;
    private type: string;
    private authorId: string;
    private targetId: string;
    private content: string;
    private createdAt: string;
    private status: ReportStatus;

    constructor(uid: string, type: string, authorId: string, targetId: string, content: string, createdAt: string, status: ReportStatus) {
        this.uid = uid;
        this.type = type;
        this.authorId = authorId;
        this.targetId = targetId;
        this.content = content;
        this.createdAt = createdAt;
        this.status = status;
    }

    public getUid(): string {
        return this.uid;
    }

    public getType(): string {
        return this.type;
    }

    public getAuthorId(): string {
        return this.authorId;
    }

    public getTargetId(): string {
        return this.targetId;
    }

    public getContent(): string {
        return this.content;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: ReportStatus): void {
        this.status = status;
    }

    public toObject(): any {
        return {
            uid: this.uid,
            type: this.type,
            authorId: this.authorId,
            targetId: this.targetId,
            content: this.content,
            createdAt: this.createdAt,
            status: this.status
        };
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromObject(json: any): Report {
        return new Report(json.uid, json.type, json.authorId, json.targetId, json.content, json.createdAt, json.status);
    }

    public static fromObjectList(json: any): Report[] {
        let reports: Report[] = [];
        for (let i = 0; i < json.length; i++) {
            reports.push(Report.fromObject(json[i]));
        }
        return reports;
    }

    public static fromObjectString(jsonString: string): Report {
        return Report.fromObject(JSON.parse(jsonString));
    }
}