export const now = (): string => {
    let time = new Date();
    let createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    return createdAt;
}