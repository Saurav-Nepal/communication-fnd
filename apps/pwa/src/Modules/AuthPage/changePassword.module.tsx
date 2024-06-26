import { NewPasswordChangedImage } from '@Constants/imageMapping';
import {
    LOGIN_ROUTE,
    useChangePassword,
    useUserLoggedInHandler,
} from '@finnoto/core';
import { Button, FormBuilder, Typography } from '@finnoto/design-system';
import Image from 'next/image';
import LoginPageFrame, {
    AuthenticationUIWrapper,
} from './Components/loginPageFrame.component';

export const LOGIN_LOADING_EVENT = 'login_page_loading';

const ChangePasswordPage = () => {
    useUserLoggedInHandler();

    const { success, formSchema, handleSubmit } = useChangePassword();

    return (
        <LoginPageFrame>
            <AuthenticationUIWrapper
                title={success ? 'Password Changed!' : 'Create New Password'}
                subTitle={
                    success
                        ? 'Your password has been changed successfully, Please login to your email account again'
                        : 'Please enter a new password for your account.'
                }
            >
                {!success && (
                    <div className=' col-flex'>
                        <FormBuilder
                            className='flex-1 gap-2'
                            formSchema={formSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, handleSubmit }) => (
                                <div className='justify-between flex-1 gap-4 col-flex'>
                                    <Typography variant='p'>
                                        Not your account?{' '}
                                        <Typography link={LOGIN_ROUTE}>
                                            Sign In
                                        </Typography>
                                    </Typography>
                                    <div className='items-center gap-2 col-flex'>
                                        <Button
                                            loading={isSubmitting}
                                            size='lg'
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
                                <Typography link={LOGIN_ROUTE}>
                                    <Button
                                        size='lg'
                                        appearance='primary'
                                        block
                                    >
                                        Back To Sign In &rarr;
                                    </Button>
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticationUIWrapper>
        </LoginPageFrame>
    );
};

export default ChangePasswordPage;
