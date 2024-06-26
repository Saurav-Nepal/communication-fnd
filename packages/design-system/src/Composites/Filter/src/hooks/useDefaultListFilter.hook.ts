import { useCallback, useMemo } from 'react';

import { useDateRangeFilter } from './useDateRangeFilter.hook';
import { ObjectDto, Capitalize, IsEmptyObject } from '@finnoto/core';

export const useDefaultListFilter = ({
    filters = [],
    dateFilter,
    amountFilter,
    name,
}: {
    filters?: false | ObjectDto[];
    dateFilter?: ObjectDto | boolean;
    amountFilter?: ObjectDto | boolean;
    name?: string;
}) => {
    const { defaultDateRange } = useDateRangeFilter(
        {
            defaultDateRange:
                dateFilter !== false ? (dateFilter as any)?.defaultRange : null,
        },
        dateFilter !== false
    );

    // make default date  filter schema
    const dateListFilter = useMemo(() => {
        if (dateFilter === false) return {};
        const {
            name: dateRangeName,
            key = 'date',
            isClearable,
        } = (dateFilter as any) || {};

        return {
            title: dateRangeName || `Date Range`,
            key,
            defaultValue: defaultDateRange,
            type: 'date_range',
            isClearable,
        };
    }, [dateFilter, defaultDateRange]);

    // make default amount  filter schema
    const amountListFilter = useMemo(() => {
        if (amountFilter === false) return {};

        const {
            defaultRange,
            name: amountRangeName,
            key = 'amount',
        } = (amountFilter as any) || {};
        return {
            title: amountRangeName || `${Capitalize(name)} Amount Range`,
            key,
            defaultValue: IsEmptyObject(defaultRange)
                ? { range: { min: 0, max: 10000000 } }
                : defaultRange,
            type: 'amount_range',
        };
    }, [amountFilter, name]);

    //it contains all filters schema
    const listFilters = useMemo(() => {
        const newFilters = [];
        if (!IsEmptyObject(dateListFilter)) newFilters.push(dateListFilter);
        if (!IsEmptyObject(amountListFilter)) newFilters.push(amountListFilter);
        return [...newFilters, ...(filters !== false ? filters : [])];
    }, [amountListFilter, dateListFilter, filters]);

    // it helps to give default values or value
    const getDefaultValues = useCallback(
        (key?: string) => {
            const values = listFilters.reduce((acc, filter) => {
                if (filter?.groups) {
                    for (const group of filter.groups) {
                        if (!group?.defaultValue) continue;
                        acc[group?.key] = group?.defaultValue;
                    }
                }
                if (filter?.defaultValue)
                    acc[filter?.key] = filter?.defaultValue;
                return acc;
            }, {});
            if (key) return values[key];
            return values;
        },
        [listFilters]
    );

    return {
        listFilters,
        getDefaultValues,
    };
};
