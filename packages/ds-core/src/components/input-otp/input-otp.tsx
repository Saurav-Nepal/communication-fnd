import React from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { cn } from '@slabs/ds-utils';

import { CommonOTPInputProps } from './input-otp-types';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from './otp';

const OtpInput = ({
    length = 3,
    regex = REGEXP_ONLY_DIGITS_AND_CHARS,
    onOTPChange,
    shouldSeparate = true,
    separatorPosition,
    color,
    size,
    hasError,
}: CommonOTPInputProps) => {
    const isCenter = separatorPosition === 'center';
    const middleIndex = Math.round(length / 2);

    return (
        <InputOTP maxLength={length} pattern={regex} onChange={onOTPChange}>
            <InputOTPGroup
                className={cn('flex items-center', {
                    'gap-2 ': shouldSeparate && !separatorPosition,
                })}
            >
                {Array(length)
                    .fill('')
                    .map((_, index) => (
                        <React.Fragment key={index + length}>
                            <InputOTPSlot
                                index={index}
                                className={cn('', {
                                    'first:rounded-none last:rounded-none':
                                        shouldSeparate,
                                })}
                                color={color}
                                size={size}
                                hasError={hasError}
                            />
                            {shouldSeparate &&
                                separatorPosition === 'between' &&
                                index < length - 1 && <InputOTPSeparator />}
                            {shouldSeparate &&
                                isCenter &&
                                index === middleIndex - 1 && (
                                    <InputOTPSeparator />
                                )}
                        </React.Fragment>
                    ))}
            </InputOTPGroup>
        </InputOTP>
    );
};

export { OtpInput };
