import { ContentStatus } from "../util/content_status";

export class Comment {
    // uid, authorId, postId, author, like, dislike, createdAt, target, content, status
    private readonly uid: string;
    private authorId: string;
    private postId: string;
    private author: string;
    private like: number;
    private dislike: number;
    private createdAt: string;
    private target: string;
    private content: string;
    private status: ContentStatus;

    constructor(uid: string, authorId: string, postId: string, author: string, like: number, dislike: number, createdAt: string, target: string, content: string, status: ContentStatus) {
        this.uid = uid;
        this.authorId = authorId;
        this.postId = postId;
        this.author = author;
        this.like = like;
        this.dislike = dislike;
        this.createdAt = createdAt;
        this.target = target;
        this.content = content;
        this.status = status;
    }

    public getUid(): string {
        return this.uid;
    }

    public getAuthorId(): string {
        return this.authorId;
    }

    public getPostId(): string {
        return this.postId;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getLike(): number {
        return this.like;
    }

    public getDislike(): number {
        return this.dislike;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getTarget(): string {
        return this.target;
    }

    public getContent(): string {
        return this.content;
    }

    public getStatus(): ContentStatus {
        return this.status;
    }

    public setAuthorId(authorId: string): void {
        this.authorId = authorId;
    }

    public setPostId(postId: string): void {
        this.postId = postId;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public setLike(like: number): void {
        this.like = like;
    }

    public setDislike(dislike: number): void {
        this.dislike = dislike;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public setTarget(target: string): void {
        this.target = target;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public setStatus(status: ContentStatus): void {
        this.status = status;
    }

    public getJSON(): any {
        return {
            uid: this.uid,
            authorId: this.authorId,
            postId: this.postId,
            author: this.author,
            like: this.like,
            dislike: this.dislike,
            createdAt: this.createdAt,
            target: this.target,
            content: this.content,
            status: this.status
        };
    }

    public toObject(): any {
        return this.getJSON();
    }

    public static fromObject(obj: any): Comment {
        return new Comment(obj.uid, obj.authorId, obj.postId, obj.author, obj.like, obj.dislike, obj.createdAt, obj.target, obj.content, obj.status);
    }

    public static fromObjectString(objString: string): Comment {
        return Comment.fromObject(JSON.parse(objString));
    }

    public static fromObjectList(objList: any[]): Comment[] {
        let comments: Comment[] = [];
        if (objList == null) return comments;
        for (let obj of objList) {
            comments.push(Comment.fromObject(obj));
        }
        return comments;
    }
}