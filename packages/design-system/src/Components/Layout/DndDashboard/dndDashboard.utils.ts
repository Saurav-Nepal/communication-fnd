import {
    IsEmptyArray,
    IsUndefinedOrNull,
    ObjectDto,
    shallowMerge,
} from '@finnoto/core';

import {
    DndBreakpoints,
    DndComponents,
    DndLayouts,
} from './dndDashboard.types';

export const getDefaultFinalLayouts = (
    components: DndComponents
): ReactGridLayout.Layouts => {
    return {
        lg: Object.keys(components).map((key) => ({
            i: key,
            x: 0,
            y: 0,
            w: components[key].defaultWidth || 2,
            h: components[key].defaultHeight || 4,
            isResizable: components[key].isResizable,
            static: components[key].isStatic,
            configs: components[key].defaultConfigs,
        })),
    };
};

export const transformDndLayoutsToReactGridLayouts = (
    layouts: DndLayouts,
    components?: DndComponents
): ReactGridLayout.Layouts => {
    if (!layouts) return;
    if (IsEmptyArray(layouts)) return;

    const gridLayouts = {};

    layouts.forEach((layout) => {
        const component = components?.[layout.identifier];
        if (!gridLayouts[layout.breakpoint])
            gridLayouts[layout.breakpoint] = [];

        gridLayouts[layout.breakpoint].push({
            id: layout.id,
            i: layout.identifier,
            x: layout.posX,
            y: layout.posY,
            w: layout.width,
            h: layout.height,
            minW: component?.minWidth,
            minH: component?.minHeight,
            maxW: component?.maxWidth,
            maxH: component?.maxHeight,
            isResizable: component?.isResizable,
            static: component?.isStatic,
            configs: layout.configs ?? component?.defaultConfigs,
        });
    });

    return gridLayouts;
};

export const transformReactGridLayoutsToDndLayouts = (
    layouts: ReactGridLayout.Layouts
): DndLayouts => {
    if (!layouts) return;

    let dndLayouts: DndLayouts = [];

    Object.keys(layouts).forEach((size: DndBreakpoints) => {
        layouts[size].forEach((layout) => {
            dndLayouts.push({
                id: (layout as any).id,
                identifier: layout.i,
                width: layout.w,
                height: layout.h,
                posX: layout.x,
                posY: layout.y,
                breakpoint: size,
                configs: (layout as any).configs,
            });
        });
    });

    return dndLayouts;
};

export const applyConfigs = (
    key: string,
    configs: ObjectDto,
    options: {
        layouts: ReactGridLayout.Layouts;
        components?: DndComponents;
    }
): ReactGridLayout.Layouts => {
    const { layouts, components } = options;

    const newLayouts = { ...layouts };

    Object.keys(layouts).forEach((size) => {
        newLayouts[size] = layouts[size].map((layout) => {
            if (layout.i !== key) return layout;

            const previousConfig =
                (layout as any).configs ?? components?.[key]?.defaultConfigs;

            return {
                ...layout,
                configs: shallowMerge(previousConfig, configs),
            };
        });
    });

    return newLayouts;
};

export const minMax = (value: number, min: number, max: number) => {
    const maxValue = !IsUndefinedOrNull(min) ? Math.max(value, min) : value;

    if (IsUndefinedOrNull(max)) return maxValue;

    return Math.min(maxValue, max);
};
