import React, { useEffect, useState } from 'react';
import { format, isValid, parse, setHours, setMinutes } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

import { getDateValue } from '@slabs/ds-utils';

import { CustomCalendar } from '../calendar/calendar';
import { DatePickerProps } from '../calendar/calendar.types';
import { Input } from '../core/input';
import {
    InputGroup,
    InputGroupElement,
} from '../inputs/input-groups/input-group';
import { DateInputMask } from '../inputs/input-masked/date-input-mask';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';

interface ExtendedDatePickerProps extends Omit<DatePickerProps, 'children'> {
    timePicker?: boolean;
}

export const DatePicker = ({
    value,
    minDate,
    maxDate,
    onChange,
    inputProps = {},
    disabled,
    timePicker = true,
}: ExtendedDatePickerProps) => {
    let initialDate: Date | undefined = value
        ? new Date(value as any)
        : undefined;

    if (initialDate && !isValid(initialDate)) {
        initialDate = undefined;
    }

    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [time, setTime] = useState(
        initialDate ? format(initialDate, 'HH:mm') : ''
    );
    const [displayTime, setDisplayTime] = useState(
        initialDate ? format(initialDate, 'hh:mm a') : ''
    );

    useEffect(() => {
        if (initialDate !== date) {
            setDate(initialDate);
            setTime(initialDate ? format(initialDate, 'HH:mm') : '');
            setDisplayTime(initialDate ? format(initialDate, 'hh:mm a') : '');
        }
    }, [value]);

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            const [hours, minutes] = time.split(':').map(Number);
            newDate = setHours(setMinutes(newDate, minutes || 0), hours || 0);
        }
        setDate(newDate);
        onChange?.(newDate as any);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;

        setTime(newTime);
        if (date && newTime) {
            const [hours, minutes] = newTime.split(':').map(Number);
            const newDate = setHours(
                setMinutes(date, minutes || 0),
                hours || 0
            );

            setDisplayTime(format(newDate, 'HH:mm a'));
            onChange?.(newDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger disabled={disabled}>
                <InputGroup {...inputProps} disabled={disabled}>
                    <InputGroupElement>
                        <Calendar className='w-4 h-4' />
                    </InputGroupElement>
                    <DateInputMask
                        className='border-0 aria-disabled:bg-transparent aria-disabled:opacity-100'
                        size={inputProps.size}
                        value={date ? format(date, 'yyyy-MM-dd') : ''}
                        onChange={(value) => {
                            if (value) {
                                const newDate = parse(
                                    value,
                                    'yyyy-MM-dd',
                                    new Date()
                                );
                                handleDateChange(newDate);
                            }
                        }}
                        {...inputProps}
                        disabled={disabled}
                    />
                    {timePicker && (
                        <InputGroupElement>
                            <div className='flex items-center gap-2'>
                                <Clock className='w-4 h-4' />
                                {displayTime}
                            </div>
                        </InputGroupElement>
                    )}
                </InputGroup>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 min-w-fit' align='center'>
                <div className='flex flex-col'>
                    <CustomCalendar
                        value={date}
                        onDateChange={handleDateChange}
                        minDate={getDateValue(minDate)}
                        maxDate={getDateValue(maxDate)}
                    />
                    {timePicker && (
                        <div className='p-2 '>
                            <Input
                                type='time'
                                value={time}
                                onChange={handleTimeChange}
                                disabled={disabled}
                            />
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
