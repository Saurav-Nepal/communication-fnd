import { ObjectDto } from '../types';

/**
 * Returns an object containing arrays of visible and hidden item indices based on the given parameters.
 *
 * @param {TItem[]} items - An array of items.
 * @param {number} selected - The index of the selected item.
 * @param {number} disclosureWidth - The width of the disclosure.
 * @param {number[]} itemWidths - An array of item widths.
 * @param {number} containerWidth - The width of the container.
 * @return An object containing arrays of visible and hidden item indices.
 */
export function getVisibleAndHiddenItemIndices<TItem extends ObjectDto>(
    items: TItem[],
    selected: number,
    disclosureWidth: number,
    itemWidths: number[],
    containerWidth: number
): {
    visibleItems: number[];
    hiddenItems: number[];
} {
    const sumItemWidths = itemWidths.reduce((sum, width) => sum + width, 0);
    const arrayOfItemIndices = items.map((_, index) => {
        return index;
    });

    const visibleItems: number[] = [];
    const hiddenItems: number[] = [];

    if (containerWidth > sumItemWidths) {
        visibleItems.push(...arrayOfItemIndices);
    } else {
        let itemListWidth = itemWidths[selected] || 0;

        arrayOfItemIndices.forEach((currentItemIndex) => {
            if (currentItemIndex !== selected) {
                const currentItemWidth = itemWidths[currentItemIndex] || 0;

                if (
                    itemListWidth + currentItemWidth >=
                    containerWidth - disclosureWidth
                ) {
                    hiddenItems.push(currentItemIndex);
                    return;
                }

                visibleItems.push(currentItemIndex);
                itemListWidth += currentItemWidth;
            }
        });
        visibleItems.push(selected);
    }

    return {
        visibleItems,
        hiddenItems,
    };
}
