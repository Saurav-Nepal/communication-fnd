export function shallowEqual<TValue>(a: TValue, b: unknown): boolean {
    if (a === b) {
        return true;
    }

    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false;
    }

    const keys = Object.keys(a) as (keyof TValue)[];

    if (keys.length !== Object.keys(b).length) {
        return false;
    }

    for (const element of keys) {
        const key = element;

        if (!(key in b)) {
            return false;
        }

        if (a[key] !== (b as any)[key]) {
            return false;
        }
    }

    return true;
}
