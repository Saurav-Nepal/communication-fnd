import Joi from 'joi';
import { useState } from 'react';
import { AuthUser } from '../../Models/User/auth.user';
import {
    getJoiValidationOptions,
    formatJoiErrorMessages,
    IsEmptyObject,
} from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';
import { useFetchParams } from '../useFetchParams.hook';

export const useResetPassword = () => {
    const { email, token } = useFetchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [error, setError] = useState<any>({});

    const msg = 'Your password changed successfully.';

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label('Email Address'),
        password: Joi.string().empty('').required().label('Password'),
        reEnterPassword: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .label('Re-enter Password')
            .options({
                messages: {
                    'any.only': '{{#label}} does not match with password',
                },
            }),
    });

    const validateFields = (key?: string, data?: any) => {
        const { error: err } = schema.validate(
            data || { email, password, reEnterPassword },
            {
                ...getJoiValidationOptions(),
            }
        );
        const newError = formatJoiErrorMessages(err);
        if (key) {
            setError((prev: any) => {
                const currentError = { ...prev };
                if (newError[key]) {
                    currentError[key] = newError[key];
                } else {
                    delete currentError[key];
                }
                return currentError;
            });
            return true;
        }

        setError(newError);

        if (!IsEmptyObject(newError)) return false;
        return true;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (validateFields()) {
            const param = {
                email,
                password,
                token,
            };
            const { success } = await FetchData({
                className: AuthUser,
                method: 'resetPassword',
                classParams: param,
            });
            if (success) {
                setSuccess(true);
            }
        }

        setLoading(false);
    };

    return {
        loading,
        success,
        msg,
        email,
        password,
        reEnterPassword,
        error,
        setPassword,
        setReEnterPassword,
        handleSubmit,
    };
};
