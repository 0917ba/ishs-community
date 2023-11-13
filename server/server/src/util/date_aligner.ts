export class dateAligner {
    dateAlign(...params: object[]) {
        let result = params;
        result.sort(function (x: any, y: any) {
            const a = x['date'];
            const b = y['date'];
            return a - b;
        })
        return result;
    }
}