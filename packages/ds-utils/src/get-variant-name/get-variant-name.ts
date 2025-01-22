/**
 * Gives the variant name for a given quantity and unit
 *
 * @export
 * @param {number} quantity
 * @param {*} unit
 * @returns
 */

type Unit = {
    name: string;
};
export function getVariantName(quantity: number, unit: Unit) {
    return quantity + ' ' + unit.name;
}
