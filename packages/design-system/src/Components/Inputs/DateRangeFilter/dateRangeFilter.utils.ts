import {
    differenceInDays,
    format,
    formatDistance,
    startOfDay,
    subDays,
} from 'date-fns';

import {
    convertGMTToUTCDateTime,
    GetDateValue,
    IsEmptyObject,
} from '@finnoto/core';

import {
    dateFilterTransformerType,
    dateRangeFilterType,
    dateRangesObject,
    DISPLAY_DATE_FILTER_FORMAT,
} from './dateRangeFilter.types';

//  date range filter utils
export class DateRangeFilterUtils {
    static getUtcDateRange(
        date: dateRangeFilterType,
        isTimePresent: boolean = true
    ) {
        const { min, max } = date || {};
        if (!min || !max) return date;
        if (!isTimePresent) {
            return {
                min: GetDateValue(min),
                max: GetDateValue(max),
            };
        }

        return {
            min: startOfDay(GetDateValue(min)),
            max: convertGMTToUTCDateTime(GetDateValue(max)),
        };
    }

    static absoluteValue(date: dateFilterTransformerType) {
        if (IsEmptyObject(date)) return date;
        const { range, ...relativeDate } = date || {};
        if (range?.min && range?.max) {
            const { min, max } = this.getUtcDateRange(range, true);
            return {
                startDate: min,
                endDate: max,
            };
        }
        for (const [key, value] of Object.entries(relativeDate || {})) {
            if (value) return dateRangesObject[key];
        }
    }
    static getUtcDisplayDateRange(
        date: dateFilterTransformerType,
        isTimePresent: boolean = true
    ) {
        if (IsEmptyObject(date)) return null;
        const { range, ...relativeDate } = date || {};

        if (range?.min && range?.max) {
            const { min: minDate, max: maxDate } = this.getUtcDateRange(
                range,
                isTimePresent
            );

            return {
                min: format(minDate, DISPLAY_DATE_FILTER_FORMAT),
                max: format(maxDate, DISPLAY_DATE_FILTER_FORMAT),
            };
        }

        for (const [key, value] of Object.entries(relativeDate || {})) {
            if (value) {
                const data = dateRangesObject[key];
                return data?.name;
            }
        }
    }

    static getPreviousPeriodDateRange(
        date: dateFilterTransformerType
    ): dateFilterTransformerType {
        const { startDate, endDate } = DateRangeFilterUtils.absoluteValue(date);

        const diffDays = differenceInDays(endDate, startDate);
        const newMaxDate = subDays(startDate, 1);

        return {
            range: {
                min: subDays(newMaxDate, diffDays).toISOString(),
                max: newMaxDate.toISOString(),
            },
        };
    }
}

export function formatDate(date: Date, addSuffix: boolean) {
    if (!date) return;

    return formatDistance(new Date(date), new Date(), { addSuffix: addSuffix });
}
