import { isDate, isValid, parse } from 'date-fns';

export const getDateValue = (
    date: any,
    format?: string,
    defaultDate?: Date
) => {
    if (!date || isDate(date)) return date;
    if (format) {
        return parse(date, format, new Date());
    }

    if (!isValid(new Date(date))) return defaultDate;

    return new Date(date);
};
