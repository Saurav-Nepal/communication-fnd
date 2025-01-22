import {
    addMinutes,
    addMonths,
    differenceInMilliseconds,
    format,
    isBefore,
    startOfMinute,
} from 'date-fns';

import { GLOBAL } from '@/constants/global.constants';

export function GetTime({ dateTime = null, format: dateFormat = null } = {}) {
    const dt = dateTime ? new Date(dateTime) : new Date();
    return format(dt, dateFormat || GLOBAL.API_DATE_TIME_FORMAT);
}

export function ConvertLiteral(description) {
    // return eval(description); // NOSONAR
}

/**
 * Function to convert seconds to mm:ss format
 * @param  {number} secs
 */
export function ConvertToMMSS(secs) {
    let Seconds = secs;
    let minutes = Math.floor(Seconds / 60);
    Seconds = Seconds % 60;
    minutes = minutes % 60;
    return `${Padding(minutes)}:${Padding(Seconds)}`;
}

// export function GetRelativeTime(time) {
//     return moment(time).fromNow();
// }

/**
 * To get round off time from the current time
 * @param  {number} round_off_value
 */
export function GetRoundOffTime(
    starting_time: Date | number,
    round_off_value: number
) {
    let minutes_to_add = 0;
    const currentMinute = format(new Date(), 'mm');
    if (parseInt(currentMinute) < round_off_value) {
        minutes_to_add = round_off_value - parseInt(currentMinute);
    } else if (parseInt(currentMinute) > round_off_value) {
        minutes_to_add = 60 - parseInt(currentMinute);
    }
    return startOfMinute(addMinutes(starting_time, minutes_to_add));
    // return moment(starting_time)
    //     .add(minutes_to_add, 'minutes')
    //     .startOf('minute');
}

/**
 * Can Add or Subtract time from given time param
 * @param  {string} {time - base time to be added or subtracted
 * @param  {number} value - for e.x. if paramName is 'minutes' and 15 is value, means it would add or subtract 15 minutes
 * @param  {string} paramName - can be minutes, hours, seconds (default is minutes)
 * @param  {string} format} - default is API_DATE_TIME_FORMAT
 * @param  {string} method} -  can be add or subtract (default is add)
 */
export function CalculateTime({
    time,
    value,
    paramName,
    format: dateFormat,
    method,
}) {
    method = method || 'add';
    const newTime = time || GetTime({ format: dateFormat });
    // return moment(newTime)
    //     [method](value, paramName || 'minutes')
    //     .format(format || GLOBAL.API_DATE_TIME_FORMAT);
}

export function ConvertToDisplayformat(time: Date | number) {
    return format(time, GLOBAL.DISPLAY_DATE_FORMAT);
}

export function ReturnTimeObject(time: Date | number) {
    return {
        hour: format(time, 'hh'),
        minute: format(time, 'mm'),
        mode: format(time, 'a'),
    };
}

export function TimeOperation({
    method,
    parameter,
    value,
    format,
    time = null,
}) {
    // return time
    //     ? moment(time)[method](value, parameter).format(format)
    //     : moment()[method](value, parameter).format(format);
}

export function SetTimeInExistingDate(newDate, existingdateTime) {
    if (!newDate || !existingdateTime) return;
    return newDate.set({
        hour: existingdateTime.get('hour'),
        minute: existingdateTime.get('minute'),
        second: existingdateTime.get('second'),
    });
}
/**
 * Function to add Paddingding of 0 if number id sigle digit
 * @param  {number} num
 */
function Padding(num) {
    return `0${num}`.slice(-2);
}

export function TimeDifference(endTime, startTime) {
    const ms = differenceInMilliseconds(new Date(endTime), new Date(startTime));
    // const ms = moment(endTime).diff(moment(startTime));
    // const d = moment.duration(ms);
    // return Math.floor(d.asHours()) + 'h ' + Math.floor(d.minutes()) + 'm';
}

export function IsBefore(then, now) {
    now = now ? new Date(now) : format(new Date(), 'YYYY-MM-DD');
    isBefore(new Date(then), now);
    // return moment(then).isBefore(now);
}

export function DateMonthYearFormat(date: Date | number) {
    return format(date, 'DD-MMM-YYYY');
}

export function SecondsToHm(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);

    const hDisplay = h > 0 ? h + 'h' : '';
    const mDisplay = m > 0 ? m + 'm' : '';
    return hDisplay + ' ' + mDisplay;
}

export function MinutesToH(d) {
    d = Number(d);
    const h = Math.floor(d / 60);

    return h > 0 ? h + 'h' : '';
}

/**
   * @param  {string} value1
   * @param  {string} value2
     function use for getting diffrence between 2 date in minute
   */
export function timeDiffrenceInMinute(value1, value2) {
    const pickUpTime = new Date(value1);
    const checkListTime = new Date(value2);
    let diff = (pickUpTime.getTime() - checkListTime.getTime()) / 1000;
    diff /= 60;
    if (diff < 0) {
        return 0;
    } else {
        return Math.abs(Math.round(diff));
    }
}

/**
 * @param  {date} date
 * @param  {} => use for set default time of the day{12 AM} am in datetime picker
 */
export function getTimeFormat(date) {
    if (date) {
        return format(new Date(date), 'YYYY-MM-DD 12:00:00');
    }

    return null;
}

/*
 * getting the current time with this('YYYY-MM-DD HH:mm:ss') format
 */
export const GetFormatTime = () => {
    return format(new Date(), 'YYYY-MM-DD HH:mm:ss');
};

/**
 * @param  {number} {monthsRequired=12} no. of next months
 * This method help us to get next 12 months from current month
 *
 */
export function GetNextMonths({ monthsRequired = 12 }) {
    const months: {
        id: string;
        value: string;
        name: string;
        full_name: string;
    }[] = [];

    for (let i = 0; i < monthsRequired; i++) {
        const newDate = addMonths(new Date(), i);
        const month = {
            id: format(newDate, 'YYYYMM'),
            value: format(newDate, 'YYYYMM'),
            name: format(newDate, 'MMM-YYYY'),
            full_name: format(newDate, 'MMMM YYYY'),
        };
        months.push(month);
    }
    return months;
}
