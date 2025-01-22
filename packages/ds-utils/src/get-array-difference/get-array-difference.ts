/**
 *
 * @param arr : Array to be compared
 * @param values : Values to be compared with
 * @returns : Returns the difference between the array and the values
 */

export function getArrayDifference<TData>(arr: TData[], ...values: TData[][]) {
    return arr.filter((x) => !values.flat().includes(x));
}
