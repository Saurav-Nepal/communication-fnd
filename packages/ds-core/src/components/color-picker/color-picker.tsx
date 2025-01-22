import React, { useCallback } from 'react';
import { ChromePicker } from 'react-color';

import { useUncontrolled } from '@slabs/ds-hooks';
import { cn, isFunction } from '@slabs/ds-utils';

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

import { Button } from '../button/button';
import { Popover } from '../popover/popover';

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
    disabled,
    children,
}: any) => {
    const [color, setColor] = useUncontrolled({
        value,
        defaultValue,
        finalValue: '',
        onChange,
    });

    const renderChildren = useCallback(() => {
        if (!children)
            return <Button style={{ background: color }}>{color}</Button>;

        if (isFunction(children)) {
            return children(color, setColor);
        }
        return children;
    }, [children, color, setColor]);

    return (
        <Popover>
            <PopoverTrigger>{renderChildren()}</PopoverTrigger>
            <PopoverContent
                className={cn(
                    'w-auto p-0 mt-1 overflow-hidden border rounded min-w-fit',
                    {
                        'mt-1': side === 'bottom',
                        'ml-1': side === 'left',
                        'mr-1': side === 'right',
                        'mb-1': side === 'top',
                    }
                )}
                align={align}
                alignOffset={offsetX}
                sideOffset={offsetY}
                aria-disabled={disabled}
                side={side}
            >
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
            </PopoverContent>
        </Popover>
    );
};
