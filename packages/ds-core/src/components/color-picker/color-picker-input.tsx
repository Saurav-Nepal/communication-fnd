import React from 'react';

import {
    InputGroup,
    InputGroupElement,
    InputGroupInput,
} from '../inputs/input-groups/input-group';
import { InputProps } from '../inputs/input/input.types';
import { ColorPicker } from './color-picker';
import { ColorPickerProps } from './color-picker-types';

interface ColorPickerInputProps
    extends Omit<ColorPickerProps, 'children'>,
        Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'onChange'> {}

export const ColorPickerInput = ({
    value,
    defaultValue,
    onChange,
    withAlpha,
    align = 'center',
    side = 'bottom',
    offsetX,
    offsetY,
    color,
    variant = 'bordered',
    size,
    radius,
    shadow,
    hasError = false,
}: ColorPickerInputProps) => {
    return (
        <ColorPicker
            {...{
                value,
                defaultValue,
                onChange,
                align,
                side,
                offsetX,
                offsetY,
                withAlpha,
            }}
        >
            {(value: any, setValue: any) => (
                <InputGroup
                    color={color}
                    variant={variant}
                    size={size}
                    radius={radius}
                    shadow={shadow}
                    hasError={hasError}
                >
                    <InputGroupElement>
                        <div
                            className='border rounded shadow-md cursor-pointer'
                            style={{
                                height: '20px',
                                width: '20px',
                                background: value,
                            }}
                        ></div>
                    </InputGroupElement>
                    <InputGroupInput onChange={setValue} value={value} />
                </InputGroup>
            )}
        </ColorPicker>
    );
};
