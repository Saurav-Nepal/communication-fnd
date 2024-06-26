import { ReactNode } from 'react';

// Represents the props for the Tabs component
export interface TabsProps {
    active?: string; // The currently active tab
    tabs?: TAB_ITEM[]; // An array of TAB_ITEM objects representing the tabs
    disableNav?: boolean; // Indicates whether the navigation should be disabled
    onTabChange?: (key: any) => void; // Callback function triggered when a tab is changed
    querykey?: string; // A string key used for querying purposes
}

// Represents an individual tab item
export interface TAB_ITEM {
    title: string | ReactNode; // The title of the tab, can be a string or ReactNode
    key?: string; // The key of the tab
    visible?: boolean; // Indicates whether the tab is visible
    icon?: any; // The icon associated with the tab
    component?: ReactNode; // The content component associated with the tab, can be a ReactNode
    className?: string;
}
