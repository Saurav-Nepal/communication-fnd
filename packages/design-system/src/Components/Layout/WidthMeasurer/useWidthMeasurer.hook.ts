import { useCallback, useMemo, useState } from 'react';

import { ObjectDto } from '@finnoto/core';

import { getVisibleAndHiddenItemIndices } from '../../Navigation/Tabs/PolarisTab/polarisTab.utils';
import { WidthMeasurements } from './widthMeasurer.types';

export const useWidthMeasurer = <TItems extends ObjectDto>(props: {
    items: TItems[];
    activeItemIndex: number;
}) => {
    const { items, activeItemIndex } = props;
    const [measurements, setMeasurements] = useState<{
        visibleItems: number[];
        hiddenItems: number[];
    }>({
        visibleItems: [],
        hiddenItems: [],
    });

    const handleMeasurement = useCallback(
        (measurements: WidthMeasurements) => {
            const {
                hiddenElementWidths: elementWidths,
                containerWidth,
                disclosureWidth,
            } = measurements;

            const { visibleItems, hiddenItems } =
                getVisibleAndHiddenItemIndices(
                    items,
                    activeItemIndex,
                    disclosureWidth,
                    elementWidths,
                    containerWidth
                );

            setMeasurements({
                visibleItems,
                hiddenItems,
            });
        },
        [activeItemIndex, items]
    );

    const visibleItems = useMemo(
        () =>
            items.filter((_, index) =>
                measurements.visibleItems?.includes(index)
            ) || [],
        [measurements.visibleItems, items]
    );

    const hiddenItems = useMemo(
        () =>
            items.filter((_, index) =>
                measurements.hiddenItems?.includes(index)
            ) || [],
        [measurements.hiddenItems, items]
    );

    return {
        visibleItems,
        hiddenItems,
        handleMeasurement,
    };
};
