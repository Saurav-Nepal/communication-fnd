import { useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import {
    IsEmptyArray,
    IsFunction,
    Navigation,
    useFetchParams,
} from '@finnoto/core';
import { cn, Icon, Swipper } from '@finnoto/design-system';
import { SwipperPropsSetting } from '@finnoto/design-system/src/Components/Navigation/Swipper/swipper.types';

export interface FilterItem {
    label?: string | any; // The label of the filter item
    key: string | number; // The key of the filter item
    leftIcon?: string | (() => any); // An optional left icon for the filter item
    leftIconClass?: string; // An optional CSS class for the left icon
    visible?: boolean; // Determines if the filter item is visible or hidden
}

export interface FilterButtonGroupProps {
    active?: string | number; // The currently active filter item key
    filters: FilterItem[]; // An array of filter items
    size?: keyof typeof sizeProps; // The size of the button ('md' or 'sm')
    onFilterChange?: (_: string | number) => void; // Callback function for when the filter changes
    disableNav?: boolean; // Determines if navigation should be disabled when a filter is selected
    queryKey?: string; // The query key for the filter in the URL
    appearance?: keyof typeof BasicFilterButtonAppearance; // The appearance style of the button
    slidesToShow?: number;
}

export const BasicFilterButtonAppearance = {
    primary: 'bg-primary text-primary-content', // CSS class for primary appearance style
    success: 'bg-success text-success-content', // CSS class for success appearance style
    neutral: 'bg-neutral text-neutral-content', // CSS class for neutral appearance style
};

export const sizeProps = {
    xs: 'px-1',
    sm: 'p-2',
    md: 'px-4 py-2',
    lg: 'p-4',
};

const FilterButtonGroup = ({
    active, // Currently active filter
    filters, // Array of available filters
    size = 'md', // Size of the button ('md' or 'sm')
    onFilterChange, // Callback function for when the filter changes
    disableNav = false, // Disable navigation when a filter is selected
    queryKey = 'filter-button', // Query key for the filter in the URL
    appearance = 'neutral', // Appearance style of the button
    slidesToShow = 2,
}: FilterButtonGroupProps) => {
    const { [queryKey]: selectQuery } = useFetchParams();

    const [filterBy, setFilterBy] = useState<string | number>();

    useEffectOnce(() => {
        // Set the initial filter value based on the selected query in the URL or the active filter prop
        setFilterBy(selectQuery || active || filters[0]?.key);

        if (!selectQuery) return;
        if (onFilterChange && IsFunction(onFilterChange))
            onFilterChange(selectQuery);
    });

    useUpdateEffect(() => {
        // Update the filter value when the active filter prop changes
        if (!active) {
            setFilterBy(
                filters.find((item) => item?.visible !== false)?.key || 0
            );
            return;
        }

        setFilterBy(active);
    }, [active]);

    useUpdateEffect(() => {
        // Update the filter value when the selectQuery (from URL) changes
        if (!active && !selectQuery) return setFilterBy(filters[0]?.key);

        setFilterBy(selectQuery || active);
        if (onFilterChange && IsFunction(onFilterChange))
            onFilterChange(selectQuery || active);
    }, [selectQuery]);

    const handleFilterSelect = (key: string | number) => {
        // Update the selected filter and invoke the onFilterChange callback
        setFilterBy(key);
        if (onFilterChange && IsFunction(onFilterChange)) onFilterChange(key);

        if (disableNav) return;

        // Update the URL query with the selected filter
        Navigation.search({
            [queryKey]: key,
        });
    };

    const swipperSettings: SwipperPropsSetting = {
        arrows: false,
        dots: false,
        infinite: false,
        autoplay: false,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow / 2,
    };

    return (
        <div className='w-full gap-2 px-3 py-2 overflow-hidden rounded bg-base-100'>
            <Swipper className='filter_button_group' settings={swipperSettings}>
                {!IsEmptyArray(filters) &&
                    filters.map((filter) => {
                        if (filter?.visible === false) return null;
                        return (
                            <div
                                key={filter.key}
                                className={cn(
                                    'cursor-pointer whitespace-nowrap overflow-hidden bg-base-200  text-base-secondary transition-all  rounded',
                                    sizeProps[size],
                                    {
                                        [BasicFilterButtonAppearance[
                                            appearance
                                        ]]: filterBy === filter?.key,
                                    }
                                )}
                                onClick={() => handleFilterSelect(filter.key)}
                            >
                                <span className='flex items-center justify-center gap-1 text-sm'>
                                    {filter.leftIcon && (
                                        <Icon
                                            size={18}
                                            isSvg
                                            source={filter.leftIcon}
                                            iconClass={cn(
                                                filter.leftIconClass,
                                                {
                                                    [BasicFilterButtonAppearance[
                                                        appearance
                                                    ]]: filterBy === filter.key,
                                                }
                                            )}
                                        />
                                    )}
                                    {filter.label}
                                </span>
                            </div>
                        );
                    })}
            </Swipper>
        </div>
    );
};

export default FilterButtonGroup;
