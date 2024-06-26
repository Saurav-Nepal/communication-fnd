import { useState } from 'react';

import { MetaUserController } from '../../backend/meta/controllers/meta.user.controller';
import { FormBuilderFormSchema, FormBuilderSubmitType } from '../../Types';
import { toastBackendError } from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';

export const useChangePassword = () => {
    const [success, setSuccess] = useState(false);

    const formSchema: FormBuilderFormSchema = {
        old_password: {
            type: 'password',
            label: 'Current Password',
            placeholder: 'Enter Current Password',
            required: true,
        },
        password: {
            type: 'password',
            label: 'New Password',
            placeholder: 'Enter New Password',
            required: true,
            notValidRefKey: 'old_password',
            customErrorMessage: `your new password can’t be same as your old password`,
        },
        confirm_password: {
            label: 'Confirm Password',
            placeholder: 'Re-Enter New Password',
            refKey: 'password',
            required: true,
            type: 'password',
        },
    };

    const handleSubmit: FormBuilderSubmitType = async (
        values,
        { setError }
    ) => {
        const { success, response } = await FetchData({
            className: MetaUserController,
            method: 'changePassword',
            classParams: values,
        });
        if (!success) {
            if (response?.columns) setError(response?.columns);
            else toastBackendError(response);
            return;
        }
        setSuccess(true);
    };

    return {
        success,
        formSchema,
        handleSubmit,
    };
};
