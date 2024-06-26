'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
    authenticateBusiness,
    Authentication,
    GetSessionItem,
    LOGIN_ROUTE,
    Navigation,
    REFERRER_STORE,
    useFetchParams,
    useVerifyEmail,
    VENDOR_REGISTER_ROUTE,
} from '@finnoto/core';
import {
    Button,
    cn,
    CountdownTimer,
    CountDownTimerProgress,
    Icon,
    OTPInput,
    Toast,
    Typography,
} from '@finnoto/design-system';

import { EmailSentImage } from '@Constants/imageMapping';
import { openOnboarding } from '@Utils/functions.utils';

import LoginPageFrame, {
    AuthenticationUIWrapper,
} from './Components/loginPageFrame.component';

import { VerifyEmailSvgIcon } from 'assets';

const VerifyEmail = () => {
    const { token, isVerified, email, completeSignup } = useFetchParams();

    if (completeSignup) {
        return '';
        // return <VendorSignOut />; // TODO
    }

    return (
        <LoginPageFrame>
            {isVerified && email && <EmailVerified />}
            {!token && !isVerified && <ResendVerifyEmail />}
        </LoginPageFrame>
    );
};

const ResendVerifyEmail = () => {
    const {
        email,
        countdownDone,
        countDownTime,
        otp,
        setOtp,
        handleOtp,
        setCountDownTime,
        onCountdownComplete,
        handleResendEmail,
    } = useVerifyEmail();

    return (
        <AuthenticationUIWrapper
            title='Verify Your Email'
            subTitle={
                <>
                    Please check your inbox and enter the 6-digit code below to
                    verify your email.
                    <br />
                    Email:{' '}
                    <Typography variant='span' weight='bold'>
                        {email}
                    </Typography>
                </>
            }
        >
            <div className='flex-1 gap-6 col-flex '>
                <div className='centralize'>
                    <OTPInput
                        length={6}
                        autoFocus
                        isNumberInput
                        inputClassName='otpInput !w-12'
                        className='gap-3 row-flex'
                        onEnterKeyPress={() => handleOtp(+otp)}
                        onChangeOTP={(e) => setOtp(e)}
                    />
                </div>
                <div className='flex items-center justify-center gap-1 text-sm '>
                    <Typography variant='span' color='text-tertiary'>
                        Didn’t get an OTP?{' '}
                    </Typography>
                    <Typography
                        variant='span'
                        className={cn('text-base-tertiary', {
                            'cursor-pointer text-info': countdownDone,
                        })}
                        onClick={() => {
                            if (!countdownDone) {
                                Toast.error({
                                    description: 'Wait For timer to complete!!',
                                });
                                return;
                            }
                            handleResendEmail();
                        }}
                    >
                        Resend
                    </Typography>{' '}
                    <span className='flex items-center gap-2 text-base-primary'>
                        {!countdownDone ? (
                            <>
                                in
                                <CountDownTimerProgress
                                    countDownTime={countDownTime}
                                />
                                <div>
                                    00:{' '}
                                    <CountdownTimer
                                        countTime={(time: any) =>
                                            setCountDownTime((time / 60) * 100)
                                        }
                                        duration={60}
                                        callback={onCountdownComplete}
                                    />
                                </div>
                            </>
                        ) : null}
                    </span>
                </div>

                <div className='w-full h-full centralize'>
                    <Image
                        src={EmailSentImage()}
                        height={300}
                        width={300}
                        alt='Email Verified'
                    />
                </div>

                <div className='grid grid-cols-2 gap-4 mt-auto'>
                    <Button
                        className='normal-case h-11'
                        appearance='primary'
                        outline
                        block
                        onClick={() => Navigation.back()}
                    >
                        Back
                    </Button>
                    <Button
                        className='normal-case h-11'
                        appearance='primary'
                        block
                        onClick={() => handleOtp(+otp)}
                    >
                        Verify &rarr;
                    </Button>
                </div>
            </div>
        </AuthenticationUIWrapper>
    );
};

const EmailVerified = () => {
    const { email } = useFetchParams();
    const [showCountDown, setShowCountDown] = useState(true);
    const [countDownTime, setCountDownTime] = useState(0);

    const handleOnBoarding = () => {
        Authentication.loginCheck(false, true).then((data) => {
            if (!data || !data?.id)
                return Navigation.navigate({ url: LOGIN_ROUTE });

            const referrer = GetSessionItem(REFERRER_STORE);
            if (referrer?.url === VENDOR_REGISTER_ROUTE) {
                Navigation.navigate({
                    url: referrer.url,
                    queryParam: referrer.params,
                });
                return;
            }
            setShowCountDown(false);

            // Navigation.search({ completeSignup: true });
            // return;

            openOnboarding(authenticateBusiness);
        });
    };

    return (
        <AuthenticationUIWrapper
            title='Email Verified'
            subTitle={
                <div className='text-sm font-normal text-base-secondary'>
                    Your email address{' '}
                    <span className='font-semibold text-base-primary'>
                        {email}
                    </span>{' '}
                    <br />
                    has been successfully verified. Press continue to start your
                    journey with us!
                </div>
            }
        >
            <div className='gap-4 col-flex'>
                <div className='flex items-center justify-center my-auto '>
                    <Icon
                        iconClass='flex items-center justify-center text-base-100'
                        source={VerifyEmailSvgIcon}
                        isSvg
                        size={300}
                    />
                </div>

                <div className='text-center'>
                    {showCountDown && (
                        <p className='items-center justify-center gap-2 font-normaltext-center text-base-primary row-flex'>
                            <span>
                                <CountDownTimerProgress
                                    countDownTime={countDownTime}
                                />
                            </span>
                            <span>
                                <CountdownTimer
                                    duration={10}
                                    callback={handleOnBoarding}
                                    countTime={(time: any) =>
                                        setCountDownTime((prev) => prev - 10)
                                    }
                                />{' '}
                                Seconds
                            </span>
                        </p>
                    )}
                </div>

                <div className='gap-4 mt-auto row-flex'>
                    <Button
                        className='normal-case h-11'
                        appearance='primary'
                        block
                        onClick={handleOnBoarding}
                    >
                        Continue &rarr;
                    </Button>
                </div>
            </div>
        </AuthenticationUIWrapper>
    );
};

export default VerifyEmail;
