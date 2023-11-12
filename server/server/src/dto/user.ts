type UserType = {
    uid: string;
    id: string;
    password: string;
    nickname: string;
    email: string;
    profileImage: string;
    studentName: string;
    generation: number;
    classNumber: number;
    studentNumber: number;
    birthday: string;
    privilege: number;
    role: string;
    penalty: number;
};

export class User {
    
    private readonly uid: string;
    private id: string;
    private password: string;
    private nickname: string;
    private email: string;
    private profileImage: string;
    private readonly studentName: string;
    private generation: number;
    private classNumber: number;
    private studentNumber: number;
    private birthday: string;
    private privilege: number;
    private role: string;
    private penalty: number;

    constructor(uid: string, id: string, password: string, nickname: string, email: string, profileImage: string, studentName: string, generation: number, classNumber: number, studentNumber: number, birthday: string, privilege: number, role: string, penalty: number) {
        this.uid = uid;
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.profileImage = profileImage;
        this.studentName = studentName;
        this.generation = generation;
        this.classNumber = classNumber;
        this.studentNumber = studentNumber;
        this.birthday = birthday;
        this.privilege = privilege;
        this.role = role;
        this.penalty = penalty;
    }

    public getUid(): string {
        return this.uid;
    }

    public getId(): string {
        return this.id;
    }

    public getPassword(): string {
        return this.password;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public getEmail(): string {
        return this.email;
    }

    public getProfileImage(): string {
        return this.profileImage;
    }

    public getStudentName(): string {
        return this.studentName;
    }

    public getGeneration(): number {
        return this.generation;
    }

    public getClassNumber(): number {
        return this.classNumber;
    }

    public getStudentNumber(): number {
        return this.studentNumber;
    }

    public getBirthday(): string {
        return this.birthday;
    }

    public getPrivilege(): number {
        return this.privilege;
    }

    public getRole(): string {
        return this.role;
    }

    public getPenalty(): number {
        return this.penalty;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public setNickname(nickname: string) {
        this.nickname = nickname;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public setProfileImage(profileImage: string) {
        this.profileImage = profileImage;
    }

    public setGeneration(generation: number) {
        this.generation = generation;
    }

    public setClassNumber(classNumber: number) {
        this.classNumber = classNumber;
    }

    public setStudentNumber(studentNumber: number) {
        this.studentNumber = studentNumber;
    }

    public setBirthday(birthday: string) {
        this.birthday = birthday;
    }

    public setPrivilege(privilege: number) {
        this.privilege = privilege;
    }

    public setRole(role: string) {
        this.role = role;
    }

    public setPenalty(penalty: number) {
        this.penalty = penalty;
    }

    public toObject(): UserType {
        return {
            uid: this.uid,
            id: this.id,
            password: this.password,
            nickname: this.nickname,
            email: this.email,
            profileImage: this.profileImage,
            studentName: this.studentName,
            generation: this.generation,
            classNumber: this.classNumber,
            studentNumber: this.studentNumber,
            birthday: this.birthday,
            privilege: this.privilege,
            role: this.role,
            penalty: this.penalty
        };
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromObject(obj: any): User {
        return new User(obj.uid, obj.id, obj.password, obj.nickname, obj.email, obj.profileImage, obj.studentName, obj.generation, obj.classNumber, obj.studentNumber, obj.birthday, obj.privilege, obj.role, obj.penalty);
    }

    public static fromString(str: string): User {
        return User.fromObject(JSON.parse(str));
    }
}