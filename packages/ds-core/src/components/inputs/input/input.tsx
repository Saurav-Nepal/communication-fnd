import * as React from 'react';

import { cn } from '@slabs/ds-utils';

import { polymorphicFactory } from '../../polymorphic-component/polymorphic-component';
import { InputProps, inputVariants } from './input.types';

const Input = polymorphicFactory<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            size,
            color,
            radius,
            variant,
            shadow,
            removeWrapper = false,
            hasError,
            ...props
        },
        ref
    ) => {
        return removeWrapper ? (
            <input
                type={type}
                className={cn(
                    inputVariants({
                        color,
                        size,
                        radius,
                        variant,
                        shadow,
                        hasError,
                    }),
                    className
                )}
                aria-disabled={props.disabled}
                ref={ref}
                {...props}
            />
        ) : (
            <div className='flex-1 w-full'>
                <input
                    type={type}
                    className={cn(
                        inputVariants({
                            color,
                            size,
                            radius,
                            variant,
                            shadow,
                            hasError,
                        }),
                        className
                    )}
                    aria-disabled={props.disabled}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
