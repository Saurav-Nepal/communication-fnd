import Image from 'next/image';
import Link from 'next/link';

import { LOGIN_ROUTE, Navigation, useChangePassword } from '@finnoto/core';
import { Button, FormBuilder, Typography } from '@finnoto/design-system';

import { NewPasswordChangedImage } from '@Constants/imageMapping';

import LoginPageFrame, {
    AuthenticationUIWrapper,
} from './Components/loginPageFrame.component';

export const LOGIN_LOADING_EVENT = 'login_page_loading';

const ChangePasswordPage = () => {
    // useUserLoggedInHandler();

    const { success, formSchema, handleSubmit } = useChangePassword();

    return (
        <LoginPageFrame className='max-w-[514px]'>
            <AuthenticationUIWrapper
                title={success ? 'Password Changed!' : 'Create New Password'}
                subTitle={
                    success
                        ? 'Your password has been changed successfully, Please login to your email account again'
                        : 'Please enter a new password for your account.'
                }
            >
                {!success && (
                    <div className='flex-1 col-flex'>
                        <FormBuilder
                            className='flex-1 gap-2'
                            formSchema={formSchema}
                            onSubmit={handleSubmit}
                            footerClassName='flex-1'
                        >
                            {({ isSubmitting, handleSubmit }) => (
                                <div className='justify-between flex-1 gap-4 col-flex bg-base-100'>
                                    <Typography
                                        variant='p'
                                        className='flex items-center gap-1'
                                    >
                                        Not your account?{' '}
                                        <Link
                                            href={LOGIN_ROUTE}
                                            className='link link-hover'
                                        >
                                            Sign In
                                        </Link>
                                    </Typography>
                                    <div className='items-center gap-2 mt-auto col-flex'>
                                        <Button
                                            loading={isSubmitting}
                                            size='md'
                                            appearance='primary'
                                            onClick={handleSubmit}
                                            block
                                        >
                                            Submit &rarr;
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </FormBuilder>
                    </div>
                )}
                {success && (
                    <div className='flex-1 col-flex'>
                        <div className='justify-between flex-1 gap-4 col-flex'>
                            <div className='flex-1 w-full h-full centralize'>
                                <Image
                                    src={NewPasswordChangedImage()}
                                    height={132}
                                    width={132}
                                    alt='Password Changed'
                                />
                            </div>
                            <div className='gap-2 pt-6 border-t col-flex'>
                                <Button
                                    size='lg'
                                    appearance='primary'
                                    block
                                    onClick={() =>
                                        Navigation.navigate({
                                            url: LOGIN_ROUTE,
                                        })
                                    }
                                >
                                    Back To Sign In &rarr;
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticationUIWrapper>
        </LoginPageFrame>
    );
};

export default ChangePasswordPage;
