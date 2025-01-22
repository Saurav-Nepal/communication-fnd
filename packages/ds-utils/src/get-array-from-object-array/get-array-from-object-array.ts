/**
 *
 * @param arr
 * @param key
 * @returns
 */

export function getArrayFromObjArray<TObject>(arr: TObject[], key: string) {
    return arr.map((x: any) => x[key]);
}
