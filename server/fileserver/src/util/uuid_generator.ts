import { v4 } from "uuid";

class UUIDManager {
    public static UUIDs: string[] = [];
}

export class UUID {

    constructor() {
    }

    public generateUUID(): string {
        let uuid: string;
        do {
            uuid = v4();
        } while (UUIDManager.UUIDs.includes(uuid));
        UUIDManager.UUIDs.push(uuid);
        return uuid;
    }

}