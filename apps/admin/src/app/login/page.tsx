'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import {
    Button,
    Input,
    InputGroup,
    InputGroupElement,
    InputGroupInput,
    Label,
    Typography,
} from '@slabs/ds-core';
import {
    SelectBoxOptionType,
    SelectBoxValueType,
} from '@slabs/ds-core/lib/components/select-box/select-box.types';

import { GLOBAL } from '@/constants/global.constants';
import {
    BACKEND_URL,
    BUSINESS_API_HISTORY,
} from '@/constants/storage.constants';
import { useLogin } from '@/hooks/auth.hooks';
import { useFormBuilder } from '@/hooks/useFormBuilder.hook';
import { FormBuilderFormSchema, FormBuilderSubmitType } from '@/types';
import { GetItem } from '@/utils/localStorage.utils';

const LoginPage = () => {
    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const { login } = useLogin();

    const formSchema: FormBuilderFormSchema = {
        username: {
            type: 'email',
            label: 'Email',
            placeholder: 'Email Address',
            required: true,
        },
        password: {
            type: 'password',
            label: 'Password',
            placeholder: 'Password',
            required: true,
        },
    };

    const getCurrentBackendApiUrl = (): SelectBoxValueType | undefined => {
        const backend_url = GetItem(BACKEND_URL, true) ?? GLOBAL.ROUTE_URL;

        if (!backend_url) return undefined;

        return backend_url;
    };

    const getBackendApiUrlList = () => {
        const histories = GetItem(BUSINESS_API_HISTORY, true);
        const apiList = new Set<SelectBoxOptionType>(
            histories || [
                    {
                        label: GLOBAL.ORGANIZATION.name ?? 'communication',
                        value: getCurrentBackendApiUrl(),
                    },
                ] ||
                []
        );

        return Array.from(apiList).filter(Boolean);
    };

    const onSubmit: FormBuilderSubmitType = async (
        value: any,
        { setError }
    ) => {
        const { success, response } = await login(value);
        if (success) return;
        setError({ password: response });
    };

    const {
        getValues,
        isSubmitting,
        isValidating,
        disableSubmit,
        handleSubmit,
        handleFormData,
        hasError,
        errors,
    } = useFormBuilder({
        formSchema,
        onSubmit,
        initValues: {},
    });

    return (
        <div className='bg-login-background'>
            <title>Login</title>
            <div className='flex justify-center items-center w-full h-full'>
                <div className='p-12 w-full max-w-lg rounded-lg shadow-2xl bg-card'>
                    <Typography variant='title' className='mb-2 text-center'>
                        {GLOBAL.ORGANIZATION.name} Login
                    </Typography>
                    <Typography
                        variant='subHeading'
                        className='mb-6 text-center text-muted-foreground'
                    >
                        Welcome back! Please login to your account.
                    </Typography>

                    <form
                        className='space-y-5'
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className='mb-4'>
                            <Label label='Email' name='email' required />
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                value={getValues('username')}
                                placeholder='Email Address'
                                onChange={(e) =>
                                    handleFormData('username', e.target.value)
                                }
                                hasError={hasError('username')}
                            />
                            {hasError('username') && (
                                <Label
                                    label={errors['username']}
                                    name='email'
                                    error={errors['username']}
                                />
                            )}
                        </div>
                        <div className='relative mb-6'>
                            <Label label='Password' name='password' required />
                            <div className='relative'>
                                <InputGroup hasError={hasError('password')}>
                                    <InputGroupInput
                                        type={
                                            shouldShowPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        id='password'
                                        name='password'
                                        placeholder='Password'
                                        value={getValues('password')}
                                        onChange={(e) =>
                                            handleFormData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputGroupElement>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                setShouldShowPassword(
                                                    !shouldShowPassword
                                                )
                                            }
                                        >
                                            {shouldShowPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </InputGroupElement>
                                </InputGroup>

                                {hasError('password') && (
                                    <Label
                                        label={errors['password']}
                                        name='password'
                                        error={errors['password']}
                                    />
                                )}
                            </div>
                        </div>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={
                                disableSubmit || isSubmitting || isValidating
                            }
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
