import { useState } from 'react';

import { MetaUserController } from '../../backend/meta/controllers/meta.user.controller';
import { VERIFY_EMAIL_ROUTE } from '../../Constants';
import { user } from '../../Models';
import { AuthUser } from '../../Models/User/auth.user';
import { Navigation } from '../../Utils/navigation.utils';
import { Toast } from '../../Utils/toast.utils';
import { FetchData } from '../useFetchData.hook';
import { useFetchParams } from '../useFetchParams.hook';

export const useVerifyEmail = () => {
    const { email } = useFetchParams();
    const [otp, setOtp] = useState('');
    const [countdownDone, setCountdownDone] = useState(false);
    const [countDownTime, setCountDownTime] = useState(100);

    const onCountdownComplete = () => {
        setCountdownDone(true);
    };

    const handleResendEmail = async () => {
        setCountdownDone(false);

        const { success } = await FetchData({
            className: AuthUser,
            method: 'resendEmail',
            classParams: { email },
        });
        if (success) {
            Toast.success({ description: 'Email Sent!!' });
        }
    };

    const handleOtp = async (otp: number) => {
        const { success, response } = await FetchData({
            className: MetaUserController,
            method: 'verifyEmail',
            classParams: { otp },
        });

        if (!success) {
            Toast.error({
                description: response.message || 'Something Went Wrong!!',
            });
        }

        if (success) {
            // user.updateUserData(response);
            Navigation.navigate({
                url: VERIFY_EMAIL_ROUTE,
                queryParam: {
                    email: email,
                    isVerified: true,
                },
                method: 'replace',
            });
        }
    };

    return {
        email,
        countdownDone,
        countDownTime,
        otp,
        setOtp,
        handleOtp,
        setCountDownTime,
        onCountdownComplete,
        handleResendEmail,
    };
};
