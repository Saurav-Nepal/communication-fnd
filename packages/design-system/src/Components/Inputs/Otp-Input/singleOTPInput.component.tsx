'use client';

import { memo, useEffect, useRef } from 'react';
import { usePrevious } from 'react-use';

import { SingleOTPInputProps } from './otpInput.types';

/**
 * A wrapper component for a single input field in an OTP input.
 *
 * @param {object} props - the props object containing the following properties:
 *  - {boolean} focus - whether the input field is currently focused
 *  - {boolean} autoFocus - whether the input field should be automatically focused
 *  - {string} value - the value of the input field
 *  - {function} onFocus - a callback function to be called when the input field is focused
 *  - {function} onChange - a callback function to be called when the input field value changes
 *  - {function} onKeyDown - a callback function to be called when a key is pressed down while the input field is focused
 *  - {function} onBlur - a callback function to be called when the input field loses focus
 *  - {function} onPaste - a callback function to be called when text is pasted into the input field
 *  - {object} style - the inline style for the input field
 *  - {string} className - the CSS class for the input field
 *  - {boolean} disabled - whether the input field is disabled
 * @return {JSX.Element} the SingleOTPInput component
 *
 * @author @rumeshudash
 */
export const SingleOTPInput = memo((props: SingleOTPInputProps) => {
    const { focus, autoFocus, showPlaceHolder, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const prevFocus = usePrevious(!!focus);

    useEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus) {
                inputRef.current.focus();
            }
            if (focus && focus !== prevFocus) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [autoFocus, focus, prevFocus]);

    return (
        <input
            ref={inputRef}
            inputMode='numeric'
            pattern='[0-9]*'
            type='number'
            autoComplete='one-time-code'
            placeholder={showPlaceHolder ? '-' : ''}
            {...rest}
        />
    );
});
