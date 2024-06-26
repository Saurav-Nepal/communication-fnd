'use client';

import { useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { Navigation, useFetchParams } from '@finnoto/core';

import { cn, IsEmptyArray, IsFunction } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    BasicFilterButtonAppearance,
    BasicFilterButtonProps,
    BasicFilterContainerAppearance,
} from './basicFilter.types';

/**
 *
 * @description Basic Filter.
 *
 * @author Saurav Nepal
 *
 * @returns
 */
export const BasicFilterButton = ({
    active, // Currently active filter
    filters, // Array of available filters
    size = 'md', // Size of the button ('md' or 'sm')
    onFilterChange, // Callback function for when the filter changes
    disableNav = false, // Disable navigation when a filter is selected
    queryKey = 'basicfilter', // Query key for the filter in the URL
    appearance = 'neutral', // Appearance style of the button
    itemClassName,
    disabledType,
    containerClass,
}: BasicFilterButtonProps) => {
    const { [queryKey]: selectQuery } = useFetchParams();

    const [filterBy, setFilterBy] = useState<string | number>();

    const inactiveClass =
        'badge-outline border-neutral bg-base-100 text-base-primary m-bg-base-200 ';
    const activeClass = BasicFilterButtonAppearance[appearance];

    const classes = cn({
        'h-10': size === 'md',
        'h-[28px]': size === 'sm',
        'h-[32px]': size === 'normal',
    });

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

    return (
        <div
            className={cn(
                'overflow-hidden rounded row-flex',
                containerClass,
                BasicFilterContainerAppearance[appearance]
            )}
        >
            {!IsEmptyArray(filters) &&
                filters.map((filter) => {
                    if (filter?.visible === false && disabledType !== true)
                        return null;
                    return (
                        <div
                            key={filter.key}
                            className={cn(
                                'px-3 cursor-pointer  select-none  flex items-center justify-center first-of-type:rounded-l last-of-type:rounded-r border first-of-type:border-r-0 last-of-type:border-l-0 text-xs',
                                itemClassName,
                                classes,
                                filterBy === filter?.key
                                    ? activeClass
                                    : inactiveClass,
                                {
                                    'm-basic-filter': filter?.visible === false,
                                }
                            )}
                            onClick={() => {
                                if (filter?.visible === false) return;
                                handleFilterSelect(filter.key);
                            }}
                        >
                            <span className='flex items-center gap-1 text-sm'>
                                {filter.leftIcon && (
                                    <Icon
                                        size={16}
                                        isSvg
                                        source={filter.leftIcon}
                                        iconClass={cn(filter.leftIconClass, {
                                            [BasicFilterButtonAppearance[
                                                appearance
                                            ]]: filterBy === filter.key,
                                            'text-base-tertiary':
                                                filter?.visible === false,
                                        })}
                                    />
                                )}
                                {filter.label}
                            </span>
                        </div>
                    );
                })}
        </div>
    );
};
