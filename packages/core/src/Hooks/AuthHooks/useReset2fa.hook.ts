import { useMemo, useState } from 'react';

import { OTP_LENGTH } from '../../Constants';
import { AuthUser } from '../../Models/User/auth.user';
import { FetchData } from '../useFetchData.hook';
import { useFetchParams } from '../useFetchParams.hook';

export const useReset2fa = () => {
    const { email, token, totp_seed } = useFetchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);
    const [totp, setTotp] = useState('');

    const msg = 'Your password changed successfully.';

    const disableOtpBtn = useMemo(() => {
        return totp.length !== OTP_LENGTH;
    }, [totp]);

    const handleSubmit = async () => {
        if (disableOtpBtn) return;

        setLoading(true);

        const param = {
            code: totp,
            credential: token,
        };
        const { success } = await FetchData({
            className: AuthUser,
            method: 'reset2fa',
            classParams: param,
        });
        if (success) {
            setSuccess(true);
        }

        setLoading(false);
    };

    return {
        success,
        loading,
        disableOtpBtn,
        msg,
        email,
        totp_seed,
        setTotp,
        handleSubmit,
    };
};
