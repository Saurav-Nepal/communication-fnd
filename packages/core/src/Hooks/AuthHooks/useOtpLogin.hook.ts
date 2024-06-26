import { useState } from 'react';

import { DIGIT_REGEX } from '../../Constants';
import { AuthUser } from '../../Models/User/auth.user';
import { handleLoginNextScreen } from '../../Utils/login.utils';
import { Toast } from '../../Utils/toast.utils';
import { FetchData } from '../useFetchData.hook';

export function useOtpLogin() {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [resendbtn, setResendbtn] = useState(false);

    const handleSendMobileOtp = async (
        data: any,
        next = () => {},
        callback: any = () => {}
    ) => {
        const params = { mobile: parseInt(data?.mobile || 0, 10) };
        const { success } = await FetchData({
            className: AuthUser,
            method: 'sendLoginMobileOtp',
            classParams: params,
        });

        if (success) {
            callback(params);
        }
        setResendbtn(false);
        next();
    };

    const verifyOtp = async (data: any) => {
        if (loading) return;
        setLoading(true);

        /* Otp digits check */
        if (!DIGIT_REGEX.test(otp)) {
            Toast.warning({ description: 'Invalid OTP' });
            setLoading(false);
            return;
        }

        const params = {
            mobile: parseInt(data?.mobile || 0, 10),
            otp: parseInt(otp, 10),
        };

        const { success, response } = await FetchData({
            className: AuthUser,
            method: 'validateLoginMobileOtp',
            classParams: params,
        });

        if (!success) {
            Toast.error({ description: response.message });
            return setLoading(false);
        }
        handleLoginNextScreen(response);
        setLoading(false);
    };

    const resendOtp = handleSendMobileOtp;

    return {
        loading,
        otp,
        resendbtn,
        resendOtp,
        setOtp,
        verifyOtp,
        setResendbtn,
        handleSendMobileOtp,
    };
}
