export interface BasicListFilterItem {
    title?: string | any; // The label of the filter item
    key?: string; // The key of the filter item
    leftIcon?: string | (() => any); // An optional left icon for the filter item
    leftIconClass?: string; // An optional CSS class for the left icon
    visible?: boolean; // Determines if the filter item is visible or hidden
}

export interface BasicListFilterButtonProps {
    active?: string | number; // The currently active filter item key
    filters: BasicListFilterItem[]; // An array of filter items
    onFilterChange?: (_: string | number) => void; // Callback function for when the filter changes
    disableNav?: boolean; // Determines if navigation should be disabled when a filter is selected
    queryKey?: string; // The query key for the filter in the URL
    name?: string; // The name of the menu
}
