import { forwardRef, useImperativeHandle } from 'react';

import {
    DndComponents,
    DndDashboard,
    DndDashboardProps,
    DndDefaultLayouts,
    DndLayout,
    DndLayouts,
} from '@finnoto/design-system';

import { configurableDashboardComponents } from '@Utils/configurableComponents.utils';

import { useConfigurableDashboard } from './useConfigurableDashboard.hook';

export interface ConfigurableDashboardProps
    extends Partial<
        Pick<DndDashboardProps, 'rowHeight' | 'gap' | 'params' | 'components'>
    > {
    identifier: string;
    defaultLayouts?: DndDefaultLayouts;
    isEditing?: boolean;
    debug?: boolean;
}

export interface ConfigurableDashboardRef {
    layouts: DndLayouts;
    components: DndComponents;
    saveLayouts: () => Promise<boolean>;
    resetLayouts: () => void;
    cancelLayoutChanges: () => void;
    addLayouts: (newLayouts: DndLayouts | DndLayout) => void;
}

const ConfigurableDashboard = forwardRef<
    ConfigurableDashboardRef,
    ConfigurableDashboardProps
>(
    (
        {
            identifier,
            defaultLayouts,
            isEditing,
            debug,
            components: propComponents,
            ...props
        },
        ref
    ) => {
        const {
            isLoading,
            components,
            layouts,
            setLayouts,
            saveLayouts,
            addLayouts,
            resetLayouts,
            cancelLayoutChanges,
            deleteLayout,
        } = useConfigurableDashboard({
            identifier,
            defaultLayouts,
            components: propComponents ?? configurableDashboardComponents,
        });

        if (debug) {
            console.debug('debug', { layouts, components });
        }

        useImperativeHandle(
            ref,
            () => ({
                saveLayouts,
                addLayouts,
                resetLayouts,
                cancelLayoutChanges,
                components,
                layouts,
            }),
            [
                saveLayouts,
                addLayouts,
                resetLayouts,
                cancelLayoutChanges,
                components,
                layouts,
            ]
        );

        if (isLoading) return null;

        return (
            <DndDashboard
                mode={isEditing ? 'edit' : 'view'}
                layouts={layouts}
                components={components}
                onLayoutChange={setLayouts}
                onDelete={deleteLayout}
                debug={debug}
                {...props}
            />
        );
    }
);

export default ConfigurableDashboard;
