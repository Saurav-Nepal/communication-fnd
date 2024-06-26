'use client';

import { Layers } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import {
    IsValidString,
    Navigation,
    ParseToSelectBoxOption,
    useFetchParams,
} from '@finnoto/core';

import { ListSelect } from '../../../Composites';
import { IsFunction, IsNumber } from '../../../Utils/common.ui.utils';
import { Button } from '../../Inputs/Button/button.component';
import { BasicListFilterButtonProps } from './basicListFilter.types';

/**
 *
 * @description Basic Filter.
 *
 * @author Saurav Nepal
 *
 * @returns
 */
export const BasicListFilterButton = ({
    active, // Currently active filter
    filters, // Array of available filters
    onFilterChange, // Callback function for when the filter changes
    disableNav = false, // Disable navigation when a filter is selected
    queryKey = 'tab', // Query key for the filter in the URL
    name = 'List Items',
}: BasicListFilterButtonProps) => {
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

    const getFilterValue = useCallback(() => {
        if (!filterBy) return null;
        if (IsValidString(filterBy)) return filterBy;

        if (IsNumber(filterBy)) return filters[filterBy]?.key;
        return null;
    }, [filterBy, filters]);

    return (
        <ListSelect
            name={name}
            value={getFilterValue()}
            options={ParseToSelectBoxOption(filters, 'key', 'title', {
                activeKeys: 'visible',
            })}
            onSelect={(option, index) =>
                handleFilterSelect(option.value || index)
            }
            listClassName='p-3'
            searchDisabled
        >
            <Button appearance='plain' shape='square' className='tab-btn'>
                <Layers className='text-primary' />
            </Button>
        </ListSelect>
    );
};
