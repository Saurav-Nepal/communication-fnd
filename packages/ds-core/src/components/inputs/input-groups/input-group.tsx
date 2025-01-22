import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

import { cn } from '@slabs/ds-utils';

import { Button } from '../../button/button';
import { Input } from '../input/input';
import { InputProps, inputVariants } from '../input/input.types';

type InputGroupContextValue = VariantProps<typeof inputVariants>;

const InputGroupContext = React.createContext<InputGroupContextValue>({});

const InputGroup = React.forwardRef<
    HTMLDivElement,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> &
        VariantProps<typeof inputVariants>
>(
    (
        { className, color, size, radius, variant, shadow, hasError, ...props },
        ref
    ) => {
        const contextValue = React.useMemo(
            () => ({ color, size, radius, variant, shadow, hasError }),
            [color, size, radius, variant, shadow, hasError]
        );

        return (
            <InputGroupContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn(
                        inputVariants({
                            color,
                            size,
                            radius,
                            variant,
                            shadow,
                            hasError,
                        }),
                        'flex items-stretch w-full p-0 overflow-hidden',
                        { 'cursor-not-allowed select-none': props.disabled },
                        className
                    )}
                    aria-disabled={props.disabled}
                    {...props}
                />
            </InputGroupContext.Provider>
        );
    }
);
InputGroup.displayName = 'InputGroup';

const InputGroupInput = React.forwardRef<
    HTMLInputElement,
    Omit<InputProps, keyof InputGroupContextValue>
>(({ className, ...props }, ref) => {
    const context = React.useContext(InputGroupContext);
    return (
        <Input
            ref={ref}
            className={cn(
                'border-0 bg-transparent',
                'flex-grow',
                {
                    'focus-visible:ring-0 focus-visible:ring-offset-0 ':
                        context.variant !== 'underline',
                },
                className
            )}
            {...context}
            {...props}
        />
    );
});
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupElement = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        bordered?: boolean;
    }
>(({ className, bordered, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'flex items-center shrink-0 first:pl-3 last:pr-3',
                {
                    'px-3 border-inherit first:border-r last:border-l':
                        bordered,
                },
                className
            )}
            {...props}
        />
    );
});
InputGroupElement.displayName = 'InputGroupElement';

const InputGroupButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
    const { size } = React.useContext(InputGroupContext);
    return (
        <Button
            ref={ref}
            className={cn('h-full rounded-none', className)}
            size={size}
            {...props}
        />
    );
});
InputGroupButton.displayName = 'InputGroupButton';

export { InputGroup, InputGroupButton, InputGroupElement, InputGroupInput };
