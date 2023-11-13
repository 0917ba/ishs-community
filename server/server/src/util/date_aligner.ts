export class dateAligner {
    sortByDate(...params: Post[]) {
        return params.sort(function (x: Post, y: Post) {
            const a = x.getCreatedAt();
            const b = y.getCreatedAt();
            return a - b;
        })
    }
}
