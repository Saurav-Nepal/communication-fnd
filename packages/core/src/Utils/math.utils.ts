import { ObjectDto } from '../backend/Dtos';

/**
 * Finds the group and item index of a given index in a list of groups.
 *
 * @param {ObjectDto[]} groups - List of groups to search within.
 * @param {number} index - Index to find the group and item index for.
 * @param {string} [groupItemKey='options'] - Key of the group item array.
 * @returns {Object} - Object with group and item indices.
 */
export const findGroupAndItemIndex = (
    groups: ObjectDto[],
    index: number,
    groupItemKey: string = 'options'
): { groupIndex: number; itemIndex: number } => {
    let groupIndex = 0;
    let itemIndex = index;

    // Iterate over each group in the list.
    for (const group of groups) {
        // If the itemIndex is less than the length of the group item array,
        // then the groupIndex and itemIndex have been found.
        if (itemIndex < group[groupItemKey].length) {
            return { groupIndex, itemIndex };
        }

        itemIndex -= group[groupItemKey].length;
        groupIndex++;
    }

    return { groupIndex: -1, itemIndex: -1 };
};

/**
 * Calculate the index in a list of groups based on the group index and item index.
 *
 * @param {ObjectDto[]} groups - The list of groups to search within.
 * @param {number} groupIndex - The index of the group.
 * @param {number} itemIndex - The index of the item within the group.
 * @param {string} [groupItemKey='options'] - The key of the group item array.
 * @returns The index in the list of groups.
 */
export const calculateIndexFromGroupAndItemIndex = (
    groups: ObjectDto[],
    groupIndex: number,
    itemIndex: number,
    groupItemKey: string = 'options'
) => {
    let index = 0;

    // Iterate over the groups up to the groupIndex provided
    for (let i = 0; i < groupIndex; i++) {
        // For each group, add the length of the group item array to the index
        index += groups[i][groupItemKey].length;
    }

    // Add the itemIndex to the calculated index
    return index + itemIndex;
};
