import { v4 } from "uuid";

class UUIDManager {
    public static UUIDs: string[] = [];
}

class UUID {

    constructor() {
    }

    generateUUID(): string {
        let uuid: string;
        do {
            uuid = v4();
        } while (UUIDManager.UUIDs.includes(uuid));
        UUIDManager.UUIDs.push(uuid);
        return uuid;
    }

}