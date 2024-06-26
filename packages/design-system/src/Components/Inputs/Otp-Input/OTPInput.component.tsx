'use client';

import React, {
    forwardRef,
    memo,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';

import { cn, IsFunction } from '../../../Utils/common.ui.utils';
import { OTPInputProps } from './otpInput.types';
import { SingleOTPInput } from './singleOTPInput.component';

/**
 * A component that renders a one-time password (OTP) input field with a specified length and allows the user to enter the OTP.
 *
 * @param {object} props - the props object containing the following properties:
 *  - {number} length - the number of digits in the OTP
 *  - {boolean} isNumberInput - whether the OTP should be numeric
 *  - {boolean} autoFocus - whether the OTP input should be automatically focused
 *  - {boolean} disabled - whether the OTP input is disabled
 *  - {function} onChangeOTP - a callback function called when the OTP input value changes
 *  - {string} inputClassName - the CSS class for the OTP input field
 *  - {object} inputStyle - the inline style for the OTP input field
 *  - {function} onEnterKeyPress - a callback function called when the Enter key is pressed
 * @param {ref} ref - a reference to the OTPInput component
 * @return {JSX.Element} the OTPInput component
 *
 * @author @rumeshudash
 */
export const OTPInput = memo(
    forwardRef((props: OTPInputProps, ref) => {
        const {
            length,
            isNumberInput,
            autoFocus,
            disabled,
            onChangeOTP,
            onBlur = () => {},
            inputClassName,
            inputStyle,
            onEnterKeyPress,
            hideOtp,
            showPlaceHolder,
            ...rest
        } = props;

        const [activeInput, setActiveInput] = useState(0);
        const [otpValues, setOTPValues] = useState(
            Array<string>(length).fill('')
        );

        // Helper to return OTP from inputs
        const handleOtpChange = useCallback(
            (otp: string[]) => {
                const otpValue = otp.join('');

                onChangeOTP(otpValue);
            },
            [onChangeOTP]
        );
        useImperativeHandle(
            ref,
            () => {
                return {
                    clearInput: () => {
                        let values: any = [];
                        values[length - 1] = '';

                        setOTPValues(values.map((el: any) => ''));
                    },
                };
            },
            [length]
        );

        // Helper to return value with the right type: 'text' or 'number'
        const getRightValue = useCallback(
            (str: string) => {
                let changedValue = str;
                if (!isNumberInput) {
                    return changedValue;
                }
                return !changedValue || /\d/.test(changedValue)
                    ? changedValue
                    : '';
            },
            [isNumberInput]
        );

        // Change OTP value at focussing input
        const changeCodeAtFocus = useCallback(
            (str: string) => {
                const updatedOTPValues = [...otpValues];
                updatedOTPValues[activeInput] = str[0] || '';
                setOTPValues(updatedOTPValues);
                handleOtpChange(updatedOTPValues);
            },
            [activeInput, handleOtpChange, otpValues]
        );

        // Focus `inputIndex` input
        const focusInput = useCallback(
            (inputIndex: number) => {
                const selectedIndex = Math.max(
                    Math.min(length - 1, inputIndex),
                    0
                );
                setActiveInput(selectedIndex);
            },
            [length]
        );

        const focusPrevInput = useCallback(() => {
            focusInput(activeInput - 1);
        }, [activeInput, focusInput]);

        const focusNextInput = useCallback(() => {
            focusInput(activeInput + 1);
        }, [activeInput, focusInput]);

        // Handle onFocus input
        const handleOnFocus = useCallback(
            (index: number) => () => {
                focusInput(index);
            },
            [focusInput]
        );

        // Handle onChange value for each input
        const handleOnChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const val = getRightValue(e.currentTarget.value);
                if (!val) {
                    e.preventDefault();
                    return;
                }
                changeCodeAtFocus(val);
                focusNextInput();
            },
            [changeCodeAtFocus, focusNextInput, getRightValue]
        );

        // Hanlde onBlur input
        const handleOnBlur = useCallback(() => {
            setActiveInput(-1);
            const otpValue = otpValues.join('');

            onBlur(otpValue);
        }, [onBlur, otpValues]);

        // Handle onKeyDown input
        const handleOnKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                switch (e.key) {
                    case 'Backspace':
                    case 'Delete': {
                        e.preventDefault();
                        if (otpValues[activeInput]) {
                            changeCodeAtFocus('');
                        } else {
                            focusPrevInput();
                        }
                        break;
                    }
                    case 'ArrowLeft': {
                        e.preventDefault();
                        focusPrevInput();
                        break;
                    }
                    case 'ArrowRight': {
                        e.preventDefault();
                        focusNextInput();
                        break;
                    }
                    case ' ': {
                        e.preventDefault();
                        break;
                    }
                    case 'Enter':
                        if (onEnterKeyPress && IsFunction(onEnterKeyPress)) {
                            onEnterKeyPress();
                        }
                        break;
                    default:
                        break;
                }
            },
            [
                activeInput,
                changeCodeAtFocus,
                focusNextInput,
                focusPrevInput,
                otpValues,
                onEnterKeyPress,
            ]
        );

        const handleOnPaste = useCallback(
            (e: React.ClipboardEvent<HTMLInputElement>) => {
                e.preventDefault();
                const pastedData = e.clipboardData
                    .getData('text/plain')
                    .trim()
                    .slice(0, length - activeInput)
                    .split('');
                if (pastedData) {
                    let nextFocusIndex = 0;
                    const updatedOTPValues = [...otpValues];
                    updatedOTPValues.forEach((val, index) => {
                        if (index >= activeInput) {
                            const changedValue = getRightValue(
                                pastedData.shift() || val
                            );
                            if (changedValue) {
                                updatedOTPValues[index] = changedValue;
                                nextFocusIndex = index;
                            }
                        }
                    });
                    setOTPValues(updatedOTPValues);
                    handleOtpChange(updatedOTPValues);
                    setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
                }
            },
            [activeInput, getRightValue, handleOtpChange, length, otpValues]
        );

        return (
            <div {...rest}>
                {Array(length)
                    .fill('')
                    .map((_, index) => (
                        <SingleOTPInput
                            key={`SingleInput-${index}`}
                            focus={activeInput === index}
                            value={otpValues && otpValues[index]}
                            autoFocus={autoFocus}
                            onFocus={handleOnFocus(index)}
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyDown}
                            onBlur={handleOnBlur}
                            onPaste={handleOnPaste}
                            style={inputStyle}
                            className={cn(inputClassName, {
                                border: otpValues[index],
                            })}
                            disabled={disabled}
                            type={hideOtp ? 'password' : 'number'}
                            showPlaceHolder={showPlaceHolder}
                        />
                    ))}
            </div>
        );
    })
);
