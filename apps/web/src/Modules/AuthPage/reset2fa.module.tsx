import {
    LOGIN_ROUTE,
    Navigation,
    OTP_LENGTH,
    useReset2fa,
    useUserLoggedInHandler,
} from '@finnoto/core';
import { Button, OTPInput, Typography } from '@finnoto/design-system';
import Link from 'next/link';
import LoginPageFrame, {
    AuthenticationUIFooter,
    AuthenticationUIWrapper,
} from './Components/loginPageFrame.component';

export const LOGIN_LOADING_EVENT = 'login_page_loading';

const Reset2faPage = () => {
    useUserLoggedInHandler();

    const {
        success,
        loading,
        disableOtpBtn,
        msg,
        email,
        totp_seed,
        setTotp,
        handleSubmit,
    } = useReset2fa();

    return (
        <LoginPageFrame className='w-[500px]'>
            <AuthenticationUIWrapper
                title='Two-Factor Authentication'
                subTitle='  To set up two-factor authentication, scan this
                                QR code'
            >
                {success && (
                    <div className='alert alert-success'>
                        <span className='inline'>
                            {msg} <Link href={LOGIN_ROUTE}>Go to Sign in</Link>
                        </span>
                    </div>
                )}
                {!success && (
                    <div className='flex-1 gap-6 col-flex'>
                        <div className='centralize '>
                            {/*  eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/Finnoto:${email}?secret=${totp_seed}&issuer=Finnoto`}
                                height={200}
                                width={200}
                                alt='OTP qr code'
                                className='border'
                            />
                        </div>
                        <Typography size='large' className='text-center'>
                            If your app dosn’t recognize the QR code, enter the
                            following key manually :{' '}
                            <Typography
                                variant='span'
                                size='large'
                                weight='bold'
                            >
                                {totp_seed}
                            </Typography>
                        </Typography>
                        <div className='flex-1 gap-6 col-flex'>
                            <Typography size='large' className='text-center'>
                                To confirm the secret, enter the 6-digits code
                                from the app
                            </Typography>
                            <div className='centralize'>
                                <OTPInput
                                    length={OTP_LENGTH}
                                    autoFocus
                                    isNumberInput
                                    inputClassName='otpInput !w-12 '
                                    className='gap-3 row-flex'
                                    onEnterKeyPress={handleSubmit}
                                    onChangeOTP={(otp) => setTotp(otp)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className='gap-6 col-flex'>
                            <div className='border'></div>
                            <div className='grid gap-6 md:grid-cols-2'>
                                <Button
                                    className='normal-case h-11 '
                                    outline
                                    appearance='primary'
                                    onClick={() => Navigation.back()}
                                >
                                    Back
                                </Button>
                                <Button
                                    loading={loading}
                                    block
                                    disabled={disableOtpBtn}
                                    onClick={handleSubmit}
                                    className='normal-case h-11 '
                                    appearance='primary'
                                >
                                    Next &rarr;
                                </Button>
                            </div>
                            <AuthenticationUIFooter
                                route={LOGIN_ROUTE}
                                link='Login with diffrent User'
                            />
                        </div>
                    </div>
                )}
            </AuthenticationUIWrapper>
        </LoginPageFrame>
    );
};

export default Reset2faPage;
