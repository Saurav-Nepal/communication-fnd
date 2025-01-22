type ObjectDto = {
    [x: string]: any;
    [x: number]: any;
};

/**
 * Transform any given array to key value pair object array.
 *
 * @param arr Array of object.
 * @param label Label Key
 * @param value Value Key
 * @returns object array
 */
export const transformArrayObjectToKeyValueObject = (
    arr: ObjectDto[],
    key: string = 'key',
    value: string = 'name'
) => {
    const obj: ObjectDto = {};
    arr.forEach((str) => {
        if (!str[key]) return;
        obj[str[key]] = str[value] || null;
    });
    return obj;
};
