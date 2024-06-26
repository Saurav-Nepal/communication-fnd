// Import necessary dependencies
import { ObjectDto } from '@finnoto/core';
import { ReactNode } from 'react';

// Props interface for the SplitView component
export interface SplitViewProps {
    className?: string;
    listViewClassName?: string;
    data?: ObjectDto[]; // Array of ObjectDto
    dataKey?: string; // Key used to access data property in the ObjectDto
    renderList?: SplitViewRenderListFnType; // Custom render function for each item in the list view
    viewChangeHandler?: SplitViewViewChangeFunction; // Callback function for view change
    renderListView?: (props: {
        active?: SplitViewSelectedKeyType;
        onViewChange: SplitViewViewChangeFunction;
    }) => ReactNode; // Custom render function for the list view
    children: (props: {
        active: SplitViewSelectedKeyType;
        data: ObjectDto;
        onResetView: () => void;
    }) => ReactNode; // Render function for the child component
    listHeaderView?: ReactNode; // Custom header view for the list view
    listFooterView?: ReactNode; // Custom footer view for the list view

    defaultActive?: SplitViewSelectedKeyType; // default active
}

// Props interface for the ListView component
export interface ListViewProps {
    className?: string;
    active?: SplitViewSelectedKeyType; // Active key in the list view
    data?: ObjectDto[]; // Array of ObjectDto
    dataKey?: string; // Key used to access data property in the ObjectDto
    renderList?: SplitViewRenderListFnType; // Custom render function for each item in the list view
    onViewChange: SplitViewViewChangeFunction; // Callback function for view change
    listHeaderView?: ReactNode; // Custom header view for the list view
    listFooterView?: ReactNode; // Custom footer view for the list view
}

// Type for the custom render function for each item in the list view
export type SplitViewRenderListFnType = (
    item: ObjectDto,
    options: {
        index: SplitViewSelectedKeyType;
        active: boolean;
        activeKey?: SplitViewSelectedKeyType;
        onSelect: () => void;
    }
) => ReactNode;

// Type for the selected key in the SplitView component
export type SplitViewSelectedKeyType = string | number;

// Type for the view change function in the SplitView component
export type SplitViewViewChangeFunction = (
    key: SplitViewSelectedKeyType
) => void;
