import { useCallback, useState } from 'react';

import { GetObjectFromArray, ObjectDto, useUncontrolled } from '@finnoto/core';

import { DndDashboardProps } from '../dndDashboard.types';
import {
    applyConfigs,
    getDefaultFinalLayouts,
    minMax,
    transformDndLayoutsToReactGridLayouts,
    transformReactGridLayoutsToDndLayouts,
} from '../dndDashboard.utils';

export const useDndDashboard = ({
    layouts,
    defaultLayouts,
    components,
    onLayoutChange,
    debug,
}: Pick<
    DndDashboardProps,
    'layouts' | 'defaultLayouts' | 'onLayoutChange' | 'components' | 'debug'
>) => {
    const [layoutValue, onChange] = useUncontrolled({
        value: transformDndLayoutsToReactGridLayouts(layouts, components),
        defaultValue: transformDndLayoutsToReactGridLayouts(
            defaultLayouts,
            components
        ),
        finalValue: debug ? getDefaultFinalLayouts(components) : undefined,
        onChange: onChangeHandler(onLayoutChange),
    });

    const handleLayoutChange = (layouts: ReactGridLayout.Layouts) => {
        const newLayout = { ...layouts };

        Object.keys(layouts).forEach((size) => {
            newLayout[size] = layouts[size].map<ReactGridLayout.Layout>(
                (layout) => {
                    const prevLayout = GetObjectFromArray(
                        layoutValue[size],
                        'i',
                        layout.i
                    );
                    const component = components[layout.i];
                    if (!component) return layout;

                    return {
                        ...prevLayout,
                        ...layout,
                        w: minMax(
                            layout.w,
                            component.minWidth,
                            component.maxWidth
                        ),
                        h: minMax(
                            layout.h,
                            component.minHeight,
                            component.maxHeight
                        ),
                        minW: component.minWidth,
                        minH: component.minHeight,
                        maxW: component.maxWidth,
                        maxH: component.maxHeight,
                        isResizable: component.isResizable,
                        static: component.isStatic,
                    };
                }
            );
        });

        onChange(newLayout);
    };

    const handleConfigsChange = useCallback(
        (key: string) => {
            return (configs: ObjectDto) => {
                onChange(
                    applyConfigs(key, configs, {
                        layouts: layoutValue,
                        components,
                    })
                );
            };
        },
        [components, layoutValue, onChange]
    );

    return {
        layouts: layoutValue,
        handleLayoutChange,
        handleConfigsChange,
    };
};

const onChangeHandler = (
    onLayoutChange: DndDashboardProps['onLayoutChange']
) => {
    return (layouts: ReactGridLayout.Layouts) => {
        onLayoutChange?.(transformReactGridLayoutsToDndLayouts(layouts));
    };
};
