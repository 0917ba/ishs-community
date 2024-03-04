export class Base64Encoder {
    static encode(input: string) {
        return Buffer.from(input).toString('base64');
    }

    static decode(input: string) {
        return Buffer.from(input, 'base64').toString('utf-8');
    }
}