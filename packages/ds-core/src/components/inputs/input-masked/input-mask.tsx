import 'cleave.js/dist/addons/cleave-phone.us';

import * as React from 'react';
import { CleaveOptions } from 'cleave.js/options';
import Cleave from 'cleave.js/react';
import { ChangeEventHandler, InitHandler } from 'cleave.js/react/props';

import { cn } from '@slabs/ds-utils';

import { polymorphicFactory } from '../../polymorphic-component/polymorphic-component';
import { InputProps, inputVariants } from '../input/input.types';

export interface CleaveInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'color' | 'size'
    > {
    onInit?: InitHandler | undefined;
    options: CleaveOptions;
    htmlRef?: ((i: any) => void) | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    variant?: InputProps['variant'];
    color?: InputProps['color'];
    size?: InputProps['size'];
    radius?: InputProps['radius'];
}

const CleaveInput = polymorphicFactory<any, CleaveInputProps>(
    (
        {
            className,
            type,
            variant = 'bordered',
            color = 'primary',
            size = 'md',
            radius = 'md',
            ...props
        },
        ref
    ) => {
        const cleaveClassName = cn(
            inputVariants({
                variant,
                color,
                size,
                radius,
            }),
            className
        );
        return (
            <div className='flex-1 w-full'>
                <div className='relative'>
                    <Cleave
                        type={type}
                        className={cleaveClassName}
                        ref={ref}
                        aria-disabled={props.disabled}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);
CleaveInput.displayName = 'CleaveInput';

export { CleaveInput as InputMasked };
