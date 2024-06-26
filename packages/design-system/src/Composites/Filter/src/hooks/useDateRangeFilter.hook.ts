import { endOfDay, startOfDay } from 'date-fns';
import { useMemo } from 'react';

import {
    API_DATE_TIME_FORMAT,
    APIDateFormat,
    IsEmptyObject,
    useFetchParams,
} from '@finnoto/core';

type dateRangeType = {
    min: Date;
    max: Date;
};
export const useDateRangeFilter = (
    {
        defaultDateRange,
        format = API_DATE_TIME_FORMAT,
    }: {
        defaultDateRange?: dateRangeType;
        format?: string;
    },
    isEnableDate: boolean = true
) => {
    const { filter } = useFetchParams();

    const parseDefaultDate = useMemo(() => {
        if (!isEnableDate) return {};
        if (defaultDateRange) {
            return {
                range: {
                    min: APIDateFormat({
                        date: startOfDay(defaultDateRange?.min),
                        format,
                    }),
                    max: APIDateFormat({
                        date: endOfDay(defaultDateRange?.max),
                        format,
                    }),
                },
            };
        }
    }, [defaultDateRange, format, isEnableDate]);

    const filterData = useMemo(() => {
        if (!filter) return {};
        return JSON.parse(filter);
    }, [filter]);
    const defaultNavigationDate = useMemo(
        () => filterData?.date,
        [filterData?.date]
    );

    const date = useMemo(() => {
        return !IsEmptyObject(defaultNavigationDate)
            ? defaultNavigationDate
            : parseDefaultDate;
    }, [defaultNavigationDate, parseDefaultDate]);

    if (!isEnableDate) return {};
    return {
        date,
        defaultDateRange: parseDefaultDate,
    };
};
