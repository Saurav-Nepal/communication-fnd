import { useCallback, useMemo } from 'react';

import { capitalize, isEmptyObject, ObjectDto } from '@slabs/ds-utils';

import { useDateRangeFilter } from './use-date-range-filter.hook';

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
            title: amountRangeName || `${capitalize(name ?? '')} Amount Range`,
            key,
            defaultValue: isEmptyObject(defaultRange)
                ? { range: { min: 0, max: 10000000 } }
                : defaultRange,
            type: 'amount_range',
        };
    }, [amountFilter, name]);

    //it contains all filters schema
    const listFilters = useMemo(() => {
        const newFilters = [];
        if (!isEmptyObject(dateListFilter)) newFilters.push(dateListFilter);
        if (!isEmptyObject(amountListFilter)) newFilters.push(amountListFilter);
        return [...newFilters, ...(filters !== false ? filters : [])];
    }, [amountListFilter, dateListFilter, filters]);

    // it helps to give default values or value
    const getDefaultValues = useCallback(
        (key?: string) => {
            const values = listFilters.reduce(
                (acc: ObjectDto, filter: ObjectDto) => {
                    if (filter?.groups) {
                        for (const group of filter.groups) {
                            if (!group?.defaultValue) continue;
                            acc[group?.key] = group?.defaultValue;
                        }
                    }
                    if (filter?.defaultValue)
                        acc[filter?.key] = filter?.defaultValue;
                    return acc;
                },
                {}
            );
            if (key) return (values as ObjectDto)[key];
            return values;
        },
        [listFilters]
    );

    return {
        listFilters,
        getDefaultValues,
    };
};
