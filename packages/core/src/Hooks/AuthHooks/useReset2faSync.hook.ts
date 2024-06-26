import { useMemo, useState } from 'react';

import { MetaUserController } from '../../backend/meta/controllers/meta.user.controller';
import { handleLoginNextScreen } from '../../Utils/login.utils';
import { Toast } from '../../Utils/toast.utils';
import { FetchData } from '../useFetchData.hook';
import { useFetchParams } from '../useFetchParams.hook';

export const useReset2faSync = () => {
    const { totp_seed, email } = useFetchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [totp, setTotp] = useState('');
    const [emailOtp, setEmailOtp] = useState('');

    const disableOtpBtn = useMemo(() => {
        return totp.length !== 6;
    }, [totp]);

    const handleSubmit = async () => {
        setLoading(true);
        const { success, response } = await FetchData({
            className: MetaUserController,
            method: 'resetTotp',
            classParams: { totp: +totp, token: +emailOtp },
        });

        if (!success) {
            Toast.error({
                description: response.message || 'Something Went Wrong..',
            });
            setLoading(false);
            return;
        }

        Toast.success({
            description: 'Your 2 step verification is Successfully Changed',
        });
        setLoading(false);
        await handleLoginNextScreen(response);
    };

    return {
        loading,
        disableOtpBtn,
        email,
        totp_seed,
        setTotp,
        setEmailOtp,
        handleSubmit,
    };
};
