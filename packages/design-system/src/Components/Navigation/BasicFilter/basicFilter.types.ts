export interface BasicFilterItem {
    label?: string | any; // The label of the filter item
    key: string | number; // The key of the filter item
    leftIcon?: string | (() => any); // An optional left icon for the filter item
    leftIconClass?: string; // An optional CSS class for the left icon
    visible?: boolean; // Determines if the filter item is visible or hidden
}

export interface BasicFilterButtonProps {
    containerClass?: string;
    active?: string | number; // The currently active filter item key
    filters: BasicFilterItem[]; // An array of filter items
    size?: 'md' | 'sm' | 'normal'; // The size of the button ('md' or 'sm')
    onFilterChange?: (_: string | number) => void; // Callback function for when the filter changes
    disableNav?: boolean; // Determines if navigation should be disabled when a filter is selected
    queryKey?: string; // The query key for the filter in the URL
    appearance?: keyof typeof BasicFilterButtonAppearance; // The appearance style of the button
    itemClassName?: string;
    disabledType?: boolean;
}

export const BasicFilterButtonAppearance = {
    primary: 'badge-primary text-primary-content', // CSS class for primary appearance style
    success: 'badge-success', // CSS class for success appearance style
    neutral: 'bg-neutral text-neutral-content border-neutral', // CSS class for neutral appearance style
};

export const BasicFilterContainerAppearance = {
    primary: 'border-primary', // CSS class for primary appearance style
    success: 'border-success', // CSS class for success appearance style
    neutral: 'border-neutral', // CSS class for neutral appearance style
};
