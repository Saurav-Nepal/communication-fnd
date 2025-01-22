import React, { FormEventHandler, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '../button/button';
import {
    InputGroup,
    InputGroupElement,
    InputGroupInput,
} from '../inputs/input-groups/input-group';
import { Input } from '../inputs/input/input';
import { SelectBox } from '../select-box/select-box';
import { Typography } from '../typography/typography';

const LoginPage = () => {
    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-background'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <div className='flex justify-center mb-6'>
                    <div className='flex items-center justify-center w-12 h-12 text-2xl font-bold rounded-full text-background bg-primary'>
                        T
                    </div>
                </div>
                <Typography variant='title' className='mb-2 text-center'>
                    Introducing ERP Panel
                </Typography>
                <Typography
                    variant='subHeading'
                    className='mb-6 text-center text-muted-foreground'
                >
                    Welcome back! Please login to your account.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <Typography
                            as='label'
                            variant='info'
                            className='block mb-2'
                        >
                            Backend
                        </Typography>
                        <SelectBox
                            options={[
                                {
                                    label: 'Finnoto Expense',
                                    value: 'fn_expense',
                                },
                            ]}
                            onCreateNew={() =>
                                console.debug('Create new backend')
                            }
                        />
                    </div>
                    <div className='mb-4'>
                        <Typography
                            as='label'
                            variant='info'
                            className='block mb-2'
                        >
                            Email
                        </Typography>
                        <Input
                            type='email'
                            id='email'
                            placeholder='Email Address'
                            required
                        />
                    </div>
                    <div className='relative mb-6'>
                        <Typography
                            as='label'
                            variant='info'
                            className='block mb-2'
                        >
                            Password
                        </Typography>
                        <div className='relative'>
                            <InputGroup>
                                <InputGroupInput
                                    type={
                                        shouldShowPassword ? 'text' : 'password'
                                    }
                                    placeholder='Password'
                                    required
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
                        </div>
                    </div>
                    <Button type='submit' className='w-full'>
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
