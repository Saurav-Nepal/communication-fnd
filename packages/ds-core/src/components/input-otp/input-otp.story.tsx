import React from 'react';

import { Meta } from '@storybook/react';

import { OtpInput } from './input-otp';
import { InputOTP } from './otp';

const meta: Meta<typeof InputOTP> = {
    title: 'Component/Otp-input',
    component: InputOTP,
};

export default meta;

export function InputOTPPattern() {
    return <OtpInput length={4} />;
}
