import { useMemo, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { shallowMerge, StoreEvent } from '@finnoto/core';

import DndItem from './Components/dndItem.component';
import { DndDashboardProps } from './dndDashboard.types';
import { useDndDashboard } from './Hooks/useDndDashboard.hook';

export const DndDashboard = ({
    rowHeight = 22,
    gap = 12,
    onDelete,
    params,
    ...props
}: DndDashboardProps) => {
    const { mode = 'view', components } = props;

    const breakpointRef = useRef('lg');
    const { layouts, handleLayoutChange, handleConfigsChange } =
        useDndDashboard(props);

    const ReactGridLayout = useMemo(() => WidthProvider(Responsive), []);
    const memorizedChildren = useMemo(() => {
        if (!layouts) return null;

        return layouts[breakpointRef.current]?.map((layout) => {
            if (!layout) return null;

            if (!components[layout.i]?.component) return null;

            const layoutConfigs =
                (layout as any).configs ??
                components[layout.i]?.defaultConfigs ??
                {};

            const configs = shallowMerge(layoutConfigs, params ?? {});

            return (
                <DndItem
                    key={layout.i}
                    id={layout.i}
                    isEdit={mode === 'edit'}
                    layout={layout}
                    onDelete={onDelete}
                >
                    {components[layout.i]?.component(
                        configs,
                        handleConfigsChange(layout.i)
                    )}
                </DndItem>
            );
        });
    }, [components, handleConfigsChange, layouts, mode, onDelete, params]);

    return (
        <ReactGridLayout
            className='max-w-full -ml-[2px] min-h-full'
            rowHeight={rowHeight}
            layouts={layouts}
            isDraggable={mode === 'edit'}
            isResizable={mode === 'edit'}
            margin={[gap, gap]}
            containerPadding={[2, 0]}
            resizeHandles={['se']}
            breakpoints={{ lg: 768, sm: 480 }}
            cols={{ lg: 12, sm: 2 }}
            onBreakpointChange={(breakpoint) => {
                breakpointRef.current = breakpoint;
            }}
            onLayoutChange={(_, allLayouts) => {
                handleLayoutChange(allLayouts);
            }}
            useCSSTransforms={false}
        >
            {memorizedChildren}
        </ReactGridLayout>
    );
};

export const SetDraggingItem = (data: {
    component: string;
    width: number;
    height: number;
}) => {
    StoreEvent({
        eventName: 'DRAGGING_ITEM',
        data,
        isTemp: true,
        isMemoryStore: false,
    });
};
