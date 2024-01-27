import { Type } from "typescript";

export class QueryChecker {
    
    notNull(...params: any[]) {
        let result = true;
        params.forEach((element: any) => {
            if (element == null) {
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

    typeCheck<Type>(type: Type, ...params: any[]) {
        let result = true;
        params.forEach((element: any) => {
            if (typeof element != type) {
                result = false;
            }
        });
        return result;
    }
}
        