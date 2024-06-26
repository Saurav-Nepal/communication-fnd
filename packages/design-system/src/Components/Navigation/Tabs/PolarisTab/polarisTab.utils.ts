import { ObjectDto } from '@finnoto/core';

export function getVisibleAndHiddenItemIndices<TItem extends ObjectDto>(
    items: TItem[],
    selected: number,
    disclosureWidth: number,
    itemWidths: number[],
    containerWidth: number
) {
    const sumItemWidths = itemWidths.reduce((sum, width) => sum + width, 0);
    const arrayOfItemIndices = items.map((_, index) => {
        return index;
    });

    const visibleItems: number[] = [];
    const hiddenItems: number[] = [];

    if (containerWidth > sumItemWidths) {
        visibleItems.push(...arrayOfItemIndices);
    } else {
        let itemListWidth = itemWidths[selected];

        arrayOfItemIndices.forEach((currentItemIndex) => {
            if (currentItemIndex !== selected) {
                const currentItemWidth = itemWidths[currentItemIndex];

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
