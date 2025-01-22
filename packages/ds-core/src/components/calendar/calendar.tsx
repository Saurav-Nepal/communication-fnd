import React from 'react';
import { format, isDate } from 'date-fns';
import { Calendar, ClassNames } from 'react-date-range';

import { Typography } from '../typography/typography';
import { RenderDateProps } from './calendar.types';

const CustomCalendar = ({
    value,
    onDateChange = () => {},
    dateDisplayFormat,
    ...props
}: RenderDateProps) => {
    const calendarClasses: ClassNames = {
        calendarWrapper: 'flex flex-1 !bg-card !text-card-forground',
        dateDisplayWrapper: '!bg-muted',
        dateDisplayItem: 'dark:bg-bg-muted',
        dateDisplayItemActive: 'dark:bg-muted dark:border-primary ',
        monthAndYearWrapper: 'h-auto !py-2',
        monthAndYearPickers:
            '[&_select]:!text-muted-foreground [&_select]:py-1',
        monthPicker: 'picker-month',
        yearPicker: 'picker-year',
        weekDays: 'bg-muted text-card-foreground',
        nextPrevButton: 'bg-muted text-foreground',
        selected: 'top-[3px] bottom-[3px] !text-primary',
        month: 'pb-0',
        day: 'h-8 ',
        dayPassive: '[&_.rdrDayNumber_span]:!text-muted-foreground/70',
        dayNumber:
            'picker-dayNumber after:!-top-[4px] after:!-bottom-[4px] [&_span]:text-card-foreground',
        dayHovered: '!text-primary',
    };

    return (
        <div className='flex flex-col'>
            <div className='p-2 px-5 text-sm border-b text-muted-foreground'>
                {isDate(value) ? (
                    format(value as Date, dateDisplayFormat || 'MMM d, yyyy')
                ) : (
                    <Typography>No Date</Typography>
                )}
            </div>

            <Calendar
                date={value as any}
                classNames={calendarClasses}
                scroll={{ enabled: true }}
                showPreview={false}
                onChange={(date) => {
                    onDateChange(date);
                }}
                {...props}
            />
        </div>
    );
};

export { CustomCalendar };
