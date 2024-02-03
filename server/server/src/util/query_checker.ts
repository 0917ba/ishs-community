import { Type } from "typescript";

export class QueryChecker {
    
    notNull(...params: any[]) {
        let result = true;
        params.forEach((element: any) => {
            if (element == null || element == undefined || element == "") {
                result = false;
            }
            console.log(element);
        });
        return result;
    }

    hasInvalidString(...params: string[]) {
        let injectionRegex = new RegExp(/#|-|\/|\\|\"|\'|;/g);
        let result = false;
        params.forEach((element: string) => {
            if (injectionRegex.test(element)) {
                result = true;
            }
        });  
        return result;
    }

    checkNumber(...params: any[]) {
        let result = true;
        params.forEach((element: any) => {
            if (isNaN(element)) {
                result = false;
            }
        });
        return result;
    }
}
        