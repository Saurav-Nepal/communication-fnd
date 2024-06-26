import { PasswordChangedImage } from '@Constants/imageMapping';
import {
    LOGIN_ROUTE,
    Navigation,
    useResetPassword,
    useUserLoggedInHandler,
} from '@finnoto/core';
import { Button, InputField } from '@finnoto/design-system';
import { InputPassword } from '@finnoto/design-system/src/Components/Inputs/InputField/input.password.component';
import Image from 'next/image';
import Link from 'next/link';
import LoginPageFrame from './Components/loginPageFrame.component';

export const LOGIN_LOADING_EVENT = 'login_page_loading';

const ResetPasswordPage = () => {
    useUserLoggedInHandler();

    const {
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
    } = useResetPassword();

    return (
        <LoginPageFrame>
            <div className='relative h-full p-5 overflow-auto lg:p-20 3xl:p-32'>
                <form onSubmit={handleSubmit} noValidate className='h-full'>
                    <div className='w-full h-full col-flex'>
                        <div className='h-full gap-8 col-flex'>
                            <div className='gap-8 col-flex'>
                                <div className='text-3xl lg:text-[42px] font-bold text-base-primary'>
                                    {success
                                        ? 'Password Changed !!'
                                        : 'Create New Password'}
                                </div>
                                {!success ? (
                                    <div className='text-base font-normal text-base-secondary'>
                                        Enter the email address associated with
                                        your account and we’ll send you a link
                                        to reset your password.
                                    </div>
                                ) : (
                                    <div className='text-base font-normal text-base-secondary'>
                                        Your password is successfully changed,
                                        you can click the button bellow to
                                        navigate to login page.
                                    </div>
                                )}
                            </div>
                            {success && (
                                <div className='w-full h-full centralize'>
                                    <Image
                                        src={PasswordChangedImage()}
                                        height={400}
                                        width={400}
                                        alt='Email Verified'
                                    />
                                </div>
                            )}
                            {!success ? (
                                <div className='flex-1 col-flex'>
                                    <div className='flex-1 gap-2 lg:gap-4 col-flex'>
                                        <InputField
                                            label='Email Address'
                                            name='email'
                                            value={email}
                                            disabled
                                            readOnly
                                        />
                                        <InputPassword
                                            label='Password'
                                            name='password'
                                            value={password}
                                            onChange={setPassword}
                                            autoFocus
                                            error={error.password}
                                            disabled={loading}
                                            required
                                            placeholder={'Enter new parssword'}
                                        />
                                        <InputPassword
                                            label='Confirm Password'
                                            name='confirm-password'
                                            value={reEnterPassword}
                                            onChange={setReEnterPassword}
                                            error={error.reEnterPassword}
                                            disabled={loading}
                                            placeholder={
                                                'Re-Enter New Password'
                                            }
                                            trimSpecialChar={false}
                                            required
                                        />
                                        <div className='text-sm font-light text-base-tertiary '>
                                            Already have an account?{' '}
                                            <Link href={LOGIN_ROUTE}>
                                                <a className='link link-hover'>
                                                    Sign In
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 col-flex'>
                                        <Button
                                            loading={loading}
                                            className='normal-case h-11'
                                            block
                                            appearance='primary'
                                        >
                                            Confirm &rarr;
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className='w-full gap-4 mt-auto'>
                                    <Button
                                        className='normal-case h-11'
                                        appearance='primary'
                                        block
                                        onClick={() =>
                                            Navigation.navigate({
                                                url: LOGIN_ROUTE,
                                            })
                                        }
                                    >
                                        Go to Login
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </LoginPageFrame>
    );
};

export default ResetPasswordPage;
