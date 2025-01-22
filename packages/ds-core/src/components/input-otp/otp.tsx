import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@slabs/ds-utils';

import { DashIcon } from '@radix-ui/react-icons';

import { InputSlotProps, InputSlotVariants } from './input-otp-types';

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            'flex items-center gap-2 has-[:disabled]:opacity-50',
            containerClassName
        )}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
    />
));
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<React.ElementRef<'div'>, InputSlotProps>(
    ({ index, className, color, size, hasError, ...props }, ref) => {
        const inputOTPContext = React.useContext(OTPInputContext);
        const { char, hasFakeCaret, isActive } = inputOTPContext.slots[
            index
        ] ?? { char: '', hasFakeCaret: false, isActive: false };
        const SlotClassNames = InputSlotVariants({
            color: isActive ? color : 'default',
            size,
            hasError,
        });

        return (
            <div
                ref={ref}
                className={cn(
                    SlotClassNames,
                    { 'ring-1 ring-error z-10 text-error': hasError },
                    className
                )}
                {...props}
            >
                {char}
                {hasFakeCaret && (
                    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                        <div className='w-px h-4 duration-1000 animate-caret-blink bg-foreground' />
                    </div>
                )}
            </div>
        );
    }
);
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
    <div ref={ref} role='separator' {...props}>
        <DashIcon />
    </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
