import {
    LOGIN_ROUTE,
    Navigation,
    useReset2faSync,
    useUserLoggedInHandler,
} from '@finnoto/core';
import { Button, OTPInput, Typography } from '@finnoto/design-system';
import LoginPageFrame, {
    AuthenticationUIFooter,
    AuthenticationUIWrapper,
} from './Components/loginPageFrame.component';

const Reset2FASyncModule = () => {
    useUserLoggedInHandler();

    const {
        loading,
        disableOtpBtn,
        email,
        totp_seed,
        setTotp,
        setEmailOtp,
        handleSubmit,
    } = useReset2faSync();

    return (
        <LoginPageFrame>
            <AuthenticationUIWrapper
                title='Reset Two-Factor Authentication'
                subTitle='To set up two-factor authentication, scan this QR code'
            >
                <div className='gap-6 col-flex'>
                    <div className='justify-center row-flex'>
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
                        <Typography variant='span' size='large' weight='bold'>
                            {totp_seed}
                        </Typography>
                    </Typography>
                    <div className='flex-1 gap-6 col-flex'>
                        <Typography size='large' className='text-center'>
                            To confirm the secret, enter the 6-digits code from
                            the app
                        </Typography>
                        <OTPInput
                            length={6}
                            autoFocus
                            isNumberInput
                            inputClassName='otpInput !w-12 '
                            className='gap-3 row-flex'
                            onChangeOTP={(otp) => setTotp(otp)}
                            disabled={loading}
                        />
                    </div>
                    <div className='flex-1 gap-6 col-flex'>
                        <Typography size='large' className='text-center'>
                            To verify your email address, enter the 6-digit code
                            sent to your email
                            <Typography
                                variant='span'
                                size='large'
                                weight='bold'
                            >
                                {' '}
                                {email}
                            </Typography>
                        </Typography>
                        <div className='centralize'>
                            <OTPInput
                                length={6}
                                autoFocus
                                isNumberInput
                                inputClassName='otpInput !w-12 '
                                className='gap-3 row-flex'
                                onChangeOTP={(otp) => setEmailOtp(otp)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className='gap-6 col-flex'>
                        <div className='border'></div>
                        <div className='grid gap-6 md:grid-cols-2'>
                            <Button
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
            </AuthenticationUIWrapper>
        </LoginPageFrame>
    );
};

export default Reset2FASyncModule;
