import { Dispatch } from 'react';

import { ObjectDto } from '@finnoto/core';

export interface DndComponents {
    [key: string]: DndComponent;
}

export interface DndComponent {
    component: (
        configs: ObjectDto,
        setConfigs: (config: ObjectDto) => void
    ) => React.ReactNode;
    defaultWidth: number;
    defaultHeight: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    isStatic?: boolean;
    isResizable?: false;
    imageUrl?: string;
    defaultConfigs?: ObjectDto;
}

export type DndBreakpoints = 'lg' | 'md' | 'sm';

export interface DndLayout {
    /**
     * The ID of the layout.
     */
    id?: number;

    /**
     * A string corresponding to the component key.
     */
    identifier: string;

    /**
     * X position in grid units.
     */
    posX: number;

    /**
     * Y position in grid units.
     */
    posY: number;

    /**
     * Width in grid units.
     */
    width: number;

    /**
     * Height in grid units.
     */
    height: number;

    /**
     * responsive breakpoint
     */
    breakpoint: DndBreakpoints;

    /**
     * active or not
     */
    active?: boolean;

    /**
     * Configuration data for the component.
     *
     * @deprecated
     */
    configs?: ObjectDto;
}

export type DndLayouts = DndLayout[];
export type DndDefaultLayouts = Pick<
    DndLayout,
    | 'identifier'
    | 'posX'
    | 'posY'
    | 'width'
    | 'height'
    | 'breakpoint'
    | 'configs'
>[];

export interface DndDashboardProps {
    layouts?: DndLayouts;
    defaultLayouts?: DndLayouts;
    components: DndComponents;
    mode?: 'edit' | 'view';
    rowHeight?: number;
    gap?: number;
    onLayoutChange?: Dispatch<DndLayouts>;
    onDelete?: (identifier: string) => void;
    params?: ObjectDto;
    debug?: boolean;
}
