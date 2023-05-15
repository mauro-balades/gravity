export function omitKeys(obj: any, keys: string[]) {
    var dup: any = {};
    for (var key in obj) {
        if (keys.indexOf(key) == -1) {
            dup[key] = obj[key];
        }
    }
    return dup;
}

export function normalizeObject(x: any) {
    return JSON.parse(JSON.stringify(x));
}
