import { ObjectDto } from '../types';
import { getVisibleAndHiddenItemIndices } from './get-visible-and-hidden-item-indices';

describe('getVisibleAndHiddenItemIndices', () => {
    // Mock ObjectDto type
    interface MockItem extends ObjectDto {
        id: number;
    }

    const createMockItems = (count: number): MockItem[] =>
        Array.from({ length: count }, (_, i) => ({ id: i }));

    it('should return all items as visible when container width is greater than sum of item widths', () => {
        const items = createMockItems(5);
        const selected = 2;
        const disclosureWidth = 50;
        const itemWidths = [100, 100, 100, 100, 100];
        const containerWidth = 600;

        const result = getVisibleAndHiddenItemIndices(
            items,
            selected,
            disclosureWidth,
            itemWidths,
            containerWidth
        );

        expect(result.visibleItems).toEqual([0, 1, 2, 3, 4]);
        expect(result.hiddenItems).toEqual([]);
    });

    it('should handle hiding items when container width is less than sum of item widths', () => {
        const items = createMockItems(5);
        const selected = 2;
        const disclosureWidth = 50;
        const itemWidths = [100, 100, 100, 100, 100];
        const containerWidth = 250;

        const result = getVisibleAndHiddenItemIndices(
            items,
            selected,
            disclosureWidth,
            itemWidths,
            containerWidth
        );

        expect(result.visibleItems).toEqual([2]);
        expect(result.hiddenItems).toEqual([0, 1, 3, 4]);
    });

    it('should always include the selected item in visible items', () => {
        const items = createMockItems(5);
        const selected = 4;
        const disclosureWidth = 50;
        const itemWidths = [100, 100, 100, 100, 100];
        const containerWidth = 250;

        const result = getVisibleAndHiddenItemIndices(
            items,
            selected,
            disclosureWidth,
            itemWidths,
            containerWidth
        );

        expect(result.visibleItems).toContain(selected);
    });

    it('should handle edge case with very small container width', () => {
        const items = createMockItems(3);
        const selected = 1;
        const disclosureWidth = 50;
        const itemWidths = [100, 100, 100];
        const containerWidth = 120;

        const result = getVisibleAndHiddenItemIndices(
            items,
            selected,
            disclosureWidth,
            itemWidths,
            containerWidth
        );

        expect(result.visibleItems).toEqual([1]);
        expect(result.hiddenItems).toEqual([0, 2]);
    });

    it('should handle case where only selected item fits', () => {
        const items = createMockItems(3);
        const selected = 1;
        const disclosureWidth = 50;
        const itemWidths = [200, 200, 200];
        const containerWidth = 220;

        const result = getVisibleAndHiddenItemIndices(
            items,
            selected,
            disclosureWidth,
            itemWidths,
            containerWidth
        );

        expect(result.visibleItems).toEqual([1]);
        expect(result.hiddenItems).toEqual([0, 2]);
    });
});
