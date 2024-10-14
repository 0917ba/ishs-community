import { ContentStatus } from "../util/content_status";
import { TargetBoard } from "../util/target_board";

export class Post {
    // uid, authorId, author, title, content, like, dislike, view, createdAt, comments, status
    private readonly uid: string;
    private authorId: string;
    private author: string;
    private title: string;
    private content: string;
    private like: number;
    private dislike: number;
    private view: number;
    private createdAt: string;
    private comments: number;
    private board: TargetBoard;
    private status: ContentStatus;

    constructor(uid: string, authorId: string, author: string, title: string, content: string, like: number, dislike: number, view: number, createdAt: string, comments: number, board: TargetBoard, status: ContentStatus) {
        this.uid = uid;
        this.authorId = authorId;
        this.author = author;
        this.title = title;
        this.content = content;
        this.like = like;
        this.dislike = dislike;
        this.view = view;
        this.createdAt = createdAt;
        this.comments = comments;
        this.board = board;
        this.status = status;
    }

    public getUid(): string {
        return this.uid;
    }

    public getAuthorId(): string {
        return this.authorId;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public getLike(): number {
        return this.like;
    }

    public getDislike(): number {
        return this.dislike;
    }

    public getView(): number {
        return this.view;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getComments(): number {
        return this.comments;
    }

    public getBoard(): TargetBoard {
        return this.board;
    }

    public getStatus(): string {
        return this.status;
    }

    public setAuthorId(authorId: string): void {
        this.authorId = authorId;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public setLike(like: number): void {
        this.like = like;
    }

    public setDislike(dislike: number): void {
        this.dislike = dislike;
    }

    public setView(view: number): void {
        this.view = view;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public setComments(comments: number): void {
        this.comments = comments;
    }

    public setBoard(board: TargetBoard): void {
        this.board = board;
    }

    public setStatus(status: ContentStatus): void {
        this.status = status;
    }

    public toObject(): any {
        return {
            uid: this.uid,
            authorId: this.authorId,
            author: this.author,
            title: this.title,
            content: this.content,
            like: this.like,
            dislike: this.dislike,
            view: this.view,
            createdAt: this.createdAt,
            comments: this.comments,
            board: this.board,
            status: this.status
        };
    }

    public toObjectString(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromObject(obj: any): Post {
        return new Post(obj.uid, obj.authorId, obj.author, obj.title, obj.content, obj.like, obj.dislike, obj.view, obj.createdAt, obj.comments, obj.board, obj.status);
    }

    public static fromObjectList(objList: any[]): Post[] {
        let posts: Post[] = [];
        if (objList == null) {
            return posts;
        }
        for (let obj of objList) {
            posts.push(this.fromObject(obj));
        }
        return posts;
    }

    public static fromObjectString(objString: string): Post {
        return this.fromObject(JSON.parse(objString));
    }
}

