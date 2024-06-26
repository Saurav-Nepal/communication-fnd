import { CSSProperties } from 'react';

export interface OTPInputProps {
    length: number;
    onChangeOTP: (otp: string) => any;
    onBlur?: (otp: string) => any;
    autoFocus?: boolean;
    isNumberInput?: boolean;
    disabled?: boolean;

    style?: CSSProperties;
    className?: string;

    inputStyle?: CSSProperties;
    inputClassName?: string;
    onEnterKeyPress?: Function;
    hideOtp?: boolean;
    showPlaceHolder?: boolean;
}

export interface SingleOTPInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    focus?: boolean;
    showPlaceHolder?: boolean;
}
