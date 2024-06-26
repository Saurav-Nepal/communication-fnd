import {
    addMinutes,
    differenceInCalendarDays,
    differenceInHours,
    differenceInMinutes,
    differenceInWeeks,
    format,
    format as Format,
    getHours,
    getMinutes,
    isAfter,
    isBefore,
    isToday,
} from 'date-fns';

import { SelectBoxOption } from '../Types';
import { IsUndefinedOrNull, ParseInteger } from './common.utils';
import { convertToPluralDigit } from './function.utils';

const DISPLAY_DATE_FORMAT = 'dd/MM/yyyy';
const API_DATE_FORMAT = 'yyyy-MM-dd';
const DISPLAY_DATE_TIME_FORMAT = "d MMM''yy hh:mm a";

export const API_DATE_TIME_FORMAT = `yyyy-MM-dd'T'HH:mm:ss.SSS'Z`;
export const TIME_FORMAT = 'hh:mm';

export function GetCurrentTimestamp() {
    return new Date().valueOf();
}

export function GetTimezoneOffset() {
    return new Date().getTimezoneOffset();
}

/**
 * @param  {object} date datetime
 * @param  {string} format
 */
export function DisplayDateFormat({
    date = new Date(),
    format = DISPLAY_DATE_FORMAT,
}) {
    return Format(date, format);
}

/**
 * @param  {object} date datetime
 * @param  {string} format
 */
export function DisplayDateTimeFormat({
    date = new Date(),
    format = DISPLAY_DATE_TIME_FORMAT,
}) {
    return Format(date, format);
}

/**
 * @param  {object} date datetime
 * @param  {string} format
 */
export function APIDateFormat({ date = new Date(), format = API_DATE_FORMAT }) {
    return Format(date, format);
}

/**
 * @param  {number} apiTime  time in minutes
 * @param  {boolean} isAmpm
 * To get 24 hour format send isAmpm = false
 */
export function DisplayTimeFormat({ apiTime, isAmpm = true }) {
    const hours = ParseInteger(apiTime / 60); // hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const mm = apiTime % 60; // minutes
    let hh = hours % 12;
    hh = hh ?? 12;
    const formattedHour = hh < 10 ? `0${hh}` : hh;
    const formattedMin = mm < 10 ? `0${mm}` : mm;
    return isAmpm
        ? `${formattedHour}:${formattedMin} ${ampm}`
        : `${hours}:${formattedMin}`;
}

/**
 * @param  {date} time Time object
 * it will return time in Minutes in string
 */
export function APITimeFormat({ time = new Date() }) {
    const hour = getHours(time);
    const minutes = getMinutes(time);
    const apiTime = hour * 60 + minutes + ''; // converts into string
    return apiTime;
}

//it helps to convert gmt time format to Utc time format
export const convertGMTToUTCDateTime = (date: Date) => {
    return addMinutes(date, date.getTimezoneOffset());
};

export const isIsoDate = (str: unknown): str is Date => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str as string))
        return false;
    return new Date(str as string).toISOString() === str;
};

/**
 * Calculates the time gap from today to the provided date.
 * @param {string | Date} date - The date to calculate the time gap from today.
 * @returns {string}  - The time gap from today.
 */
export const getTimeGapFromToday = (date: string | Date) => {
    if (IsUndefinedOrNull(date))
        return {
            beforeToday: null,
            date: null,
        };
    if (new Date(date).toString() === 'Invalid Date')
        return { beforeToday: false, date: 'Invalid Date' };

    const isDateBeforeToday = isToday(new Date(date))
        ? false
        : isBefore(new Date(date), new Date());

    const dateLeft = isDateBeforeToday ? new Date() : new Date(date);
    const dateRight = isDateBeforeToday ? new Date(date) : new Date();

    const hours = differenceInHours(dateLeft, dateRight);
    const minutes = differenceInMinutes(dateLeft, dateRight);
    const days = differenceInCalendarDays(dateLeft, dateRight);
    const weeks = differenceInWeeks(dateLeft, dateRight);

    if (hours < 1)
        return {
            beforeToday: isDateBeforeToday,
            date: `${minutes} mins`,
        };
    if (days < 1)
        return {
            beforeToday: isDateBeforeToday,
            date: `${hours} hour(s)`,
        };
    if (weeks < 1)
        return {
            beforeToday: isDateBeforeToday,
            date: `${days} day(s)`,
        };
    if (weeks < 4)
        return {
            beforeToday: isDateBeforeToday,
            date: `${weeks} week(s)`,
        };

    const formattedDate = format(new Date(date), 'd MMM, yyyy');

    return {
        beforeToday: isDateBeforeToday,
        date: formattedDate,
        isFullDate: true,
    };
};

export const getMonthsInYear = (monthFormat: string = 'MMM') => {
    return Array.from({ length: 12 }).map((_, index) =>
        format(new Date(convertToPluralDigit(index + 1)), monthFormat)
    );
};

export const getMonthOptions = ({
    startMonth = 0,
    endMonth = 11,
    monthFormat = 'MMMM',
}: {
    startMonth?: number;
    endMonth?: number;
    monthFormat?: string;
}): SelectBoxOption[] => {
    const options = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months = getMonthsInYear(monthFormat);

    if (currentMonth > endMonth) {
        let start = startMonth;
        let end = currentMonth;

        for (let month = start; month <= end; month++) {
            const date = new Date(
                `${currentYear}-${convertToPluralDigit(month + 1)}`
            );
            options.push({
                label: months[month] + ' ' + currentYear,
                value: Number(format(date, 'yyyyMM')),
                data: { date },
            });
        }
    } else {
        const prevYear = currentYear - 1;
        for (let year = currentYear - 1; year <= currentYear; year++) {
            let start = year === prevYear ? startMonth : 0;
            let end = year === currentYear ? currentMonth : 11;

            for (let month = start; month <= end; month++) {
                const date = new Date(
                    `${year}-${convertToPluralDigit(month + 1)}`
                );
                options.push({
                    label: months[month] + ' ' + year,
                    value: Number(format(date, 'yyyyMM')),
                    data: { date },
                });
            }
        }
    }

    return options;
};
