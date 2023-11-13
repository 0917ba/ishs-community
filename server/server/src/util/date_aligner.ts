export class dataAligner {
    notNull(...params: Date[]) {
        let result: Date[] = [];
        params.forEach((element: Date) => {
            if (element != null) {
                if(result.length == 0) {
                    result.push(element);
                }
                else {
                    var i: number = 0
                    result.forEach((element2: Date) => {
                        if(element2 <= element) {
                            i = result.indexOf(element2);
                        }
                    });
                    result.splice(i, 0, element);
                }
            }
        });
        return result;
    }
}