import { isUndefinedOrNull } from '../is-undefined-or-null/is-undefined-or-null';
import { isUndefined } from '../is-undefined/is-undefined';

type PickKeys<TObject, TKeys extends keyof TObject> = {
    [P in TKeys]: TObject[P];
};

type NestedPick<
    TObject,
    TKeys extends keyof any,
> = TKeys extends `${infer P}.${infer R}`
    ? P extends keyof TObject
        ? { [PP in P]: NestedPick<TObject[P], R> }
        : never
    : PickKeys<TObject, TKeys & keyof TObject>;

/**
 * Picks specific keys from an object and returns a new object with only those keys.
 * @template TObject - The type of the input object.
 * @template TKeys - The type of the keys to pick from the object.
 * @param {TObject} obj - The input object from which to pick the keys.
 * @param {TKeys[]} keys - An array of keys to pick from the object.
 * @returns {NestedPick<TObject, TKeys>} - A new object with only the picked keys.
 */
export const pickKeys = <TObject, TKeys extends keyof any>(
    obj: TObject,
    keys: TKeys[]
): NestedPick<TObject, TKeys> => {
    const result = {} as any;

    if (isUndefinedOrNull(obj)) return result;

    keys.forEach((key) => {
        const keyParts = (key as string).split('.');
        let currentObj: any = obj;
        let currentResult: any = result;
        for (let i = 0; i < keyParts.length; i++) {
            const part = keyParts[i];

            if (isUndefined(part)) continue;

            if (part in currentObj) {
                if (i === keyParts.length - 1) {
                    currentResult[part] = currentObj[part];
                } else {
                    currentResult[part] = currentResult[part] || {};
                    currentObj = currentObj[part];
                    currentResult = currentResult[part];
                }
            } else {
                break;
            }
        }
    });

    return result;
};
