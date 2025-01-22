import React, { useCallback } from 'react';

import { Input } from '../input/input';
import { InputProps } from '../input/input.types';
import { DateFormat, useDateMask } from './input-mask-convert';

interface MaskedInterface extends Omit<InputProps, 'onChange' | 'value'> {
    onChange?: (value: string) => void;
    value?: string;
    format?: DateFormat;
}

const DateInputMask = ({
    onChange: onChangeProp,
    format,
    ...props
}: MaskedInterface) => {
    const { value, onChange, formattedValue, placeholder } = useDateMask(
        format ?? 'YYYY-MM-DD',
        props.value
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
            onChangeProp?.(value);
        },
        [onChange, onChangeProp, value]
    );

    return (
        <Input
            type='text'
            onChange={handleChange}
            value={formattedValue}
            {...props}
            placeholder={placeholder}
        />
    );
};

export { DateInputMask };
