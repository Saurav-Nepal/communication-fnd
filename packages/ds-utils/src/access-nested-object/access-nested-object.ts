import { ObjectDto } from '../types';

/*
 * @param  {array} path
 * @param  {object} obj
 */
export function accessNestedObject<TObject extends ObjectDto>(
    obj: TObject,
    path: string | string[],
    valueNotFound: unknown = undefined
) {
    if (
        !(
            (Array.isArray(path) ||
                typeof path == 'string' ||
                typeof path == 'number') &&
            obj &&
            typeof obj == 'object'
        )
    ) {
        return valueNotFound;
    }

    if (typeof path == 'number') {
        path = String(path);
    }

    if (typeof path == 'string') {
        path = path.split('.');
    }

    return path.reduce(
        (xs: any, x: string) => (xs?.[x] != undefined ? xs[x] : valueNotFound),
        obj
    );
}
