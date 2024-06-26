import { useCallback } from 'react';
import { ChromePicker } from 'react-color';

import { IsFunction, useUncontrolled } from '@finnoto/core';

import { Popover } from '../../Surfaces/Popover/popover.component';
import { Button } from '../Button/button.component';
import { ColorPickerProps } from './color.picker.types';

/**
 * ColorPicker
 *
 * @see https://casesandberg.github.io/react-color/
 *
 * @returns {JSX.Element}
 */
export const ColorPicker = ({
    value,
    defaultValue,
    className,
    onChange,
    withAlpha,
    align,
    side,
    offsetX,
    offsetY,
    autoWidth,
    children,
}: ColorPickerProps) => {
    const [color, setColor] = useUncontrolled({
        value,
        defaultValue,
        finalValue: '',
        onChange,
    });

    const renderChildren = useCallback(() => {
        if (!children)
            return <Button style={{ background: color }}>{color}</Button>;

        if (IsFunction(children)) {
            return children(color, setColor);
        }
        return children;
    }, [children, color, setColor]);

    return (
        <Popover
            className='overflow-hidden border rounded'
            element={
                <ChromePicker
                    color={color ?? ''}
                    className={className}
                    styles={{
                        default: {
                            picker: {
                                boxShadow: 'unset',
                                background: 'unset',
                                borderRadius: 'unset',
                            },
                        },
                    }}
                    onChange={(color) => setColor(color?.hex, color)}
                    disableAlpha={!withAlpha}
                />
            }
            {...{ align, side, offsetX, offsetY, autoWidth }}
            noAutofocus
        >
            {renderChildren()}
        </Popover>
    );
};
