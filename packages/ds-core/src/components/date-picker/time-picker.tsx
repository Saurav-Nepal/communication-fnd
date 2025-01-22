import React, { useEffect, useState } from 'react';
import { format, isValid, parse } from 'date-fns';
import { Clock } from 'lucide-react';

import {
    InputGroup,
    InputGroupElement,
} from '../inputs/input-groups/input-group';
import { Input } from '../inputs/input/input';
import { InputProps } from '../inputs/input/input.types';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';

interface TimePickerProps {
    value?: string;
    onChange?: (time: string) => void;
    inputProps?: InputProps;
    disabled?: boolean;
}

export const TimePicker = ({
    value,
    onChange,
    inputProps = {},
    disabled,
}: TimePickerProps) => {
    const [time, setTime] = useState(value ?? format(new Date(), 'HH:mm'));
    const [displayTime, setDisplayTime] = useState(() => {
        if (value) {
            const parsedDate = parse(value, 'HH:mm', new Date());
            return format(parsedDate, 'hh:mm a');
        }
        return format(new Date(), 'hh:mm a');
    });

    useEffect(() => {
        if (value !== time) {
            setTime(value || '');
            updateDisplayTime(value || '');
        }
    }, [value]);

    const updateDisplayTime = (timeString: string) => {
        if (timeString) {
            const date = parse(timeString, 'HH:mm', new Date());
            if (isValid(date)) {
                setDisplayTime(format(date, 'hh:mm a'));
            } else {
                setDisplayTime('');
            }
        } else {
            setDisplayTime('');
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        updateDisplayTime(newTime);
        onChange?.(newTime);
    };

    return (
        <Popover>
            <PopoverTrigger disabled={disabled}>
                <InputGroup {...inputProps} disabled={disabled}>
                    <InputGroupElement>
                        <div className='flex items-center gap-2'>
                            <Clock className='w-4 h-4' />
                            {displayTime || 'Select time'}
                        </div>
                    </InputGroupElement>
                </InputGroup>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 min-w-fit' align='center'>
                <div className='p-2'>
                    <Input
                        type='time'
                        value={time}
                        onChange={handleTimeChange}
                        disabled={disabled}
                        color='default'
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};
