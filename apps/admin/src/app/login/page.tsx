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
    SelectBox,
    Typography,
} from '@slabs/ds-core';
import {
    SelectBoxOptionType,
    SelectBoxValueType,
} from '@slabs/ds-core/lib/components/select-box/select-box.types';
import { Modal } from '@slabs/ds-dialog';
import { getObjectFromArrayByValue } from '@slabs/ds-utils';

import AskBackendURL from '@/components/askBackendURL/askBackendURL.component';
import { GLOBAL, setRouteUrl } from '@/constants/global.constants';
import {
    BACKEND_URL,
    BUSINESS_API_HISTORY,
    ORGANIZATION_NAME,
} from '@/constants/storage.constants';
import { useLogin } from '@/hooks/auth.hooks';
import { useFormBuilder } from '@/hooks/useFormBuilder.hook';
import { FormBuilderFormSchema, FormBuilderSubmitType } from '@/types';
import { GetItem, SetItem } from '@/utils/localStorage.utils';

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
                        label: GLOBAL.ORGANIZATION.name ?? 'Admin',
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
        <div className='flex justify-center items-center min-h-screen bg-background'>
            <title>{GLOBAL.ORGANIZATION.name}</title>
            <div className='p-8 w-full max-w-md rounded-lg shadow-lg bg-card'>
                <Typography variant='title' className='mb-2 text-center'>
                    {GLOBAL.ORGANIZATION.name} Admin Panel
                </Typography>
                <Typography
                    variant='subHeading'
                    className='mb-6 text-center text-muted-foreground'
                >
                    Welcome back! Please login to your account.
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                    {GLOBAL.ALLOW_SET_BACKEND && (
                        <div className='mb-4'>
                            <Label label='Backend' name='backend' required />
                            <SelectBox
                                defaultValue={getCurrentBackendApiUrl()}
                                placeholder='Backend'
                                options={getBackendApiUrlList()}
                                onChange={(value) => {
                                    if (!value) return;

                                    const label = getObjectFromArrayByValue(
                                        getBackendApiUrlList(),
                                        'value',
                                        value
                                    )?.label;

                                    SetItem(BACKEND_URL, value, {
                                        isNonVolatile: true,
                                    });
                                    SetItem(ORGANIZATION_NAME, label, {
                                        isNonVolatile: true,
                                    });
                                    setRouteUrl(
                                        value as string,
                                        label ?? 'Admin'
                                    );
                                }}
                                createNewLabel='Create New Backend'
                                onCreateNew={() => {
                                    Modal.open({
                                        component: AskBackendURL,
                                    });
                                }}
                            />
                        </div>
                    )}
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
                                        shouldShowPassword ? 'text' : 'password'
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
                        disabled={disableSubmit || isSubmitting || isValidating}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
