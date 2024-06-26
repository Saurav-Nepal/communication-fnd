import { OTPInput, CountdownTimer } from '@finnoto/design-system';

const VerifyEmailOtp = ({
    handleResendVerification,
    handleVerifyOtp,
    otp,
    otpRef,
    setOtp,
    onCountdownComplete,
    countdownDone,
    email,
    optLength = 6,
}: any) => {
    return (
        <div className='gap-4 col-flex'>
            <div className='gap-4 text-sm col-flex'>
                <div className='font-normal'>
                    We already send a code to{' '}
                    <span className='font-bold'>{email}</span> , please check
                    your inbox and insert the code in form below to verify your
                    email{' '}
                </div>
                <div className='font-medium'>
                    To verify your email address, enter the 4-digit code sent to
                    your email.
                </div>
            </div>

            <OTPInput
                length={optLength}
                autoFocus
                isNumberInput
                inputClassName='otpInput !w-12'
                className='gap-4 row-flex'
                onEnterKeyPress={() => handleVerifyOtp(+otp)}
                onChangeOTP={(e) => setOtp(e)}
                ref={otpRef}
            />
            <div className='items-center justify-between row-flex '>
                {!countdownDone ? (
                    <span className='flex items-center gap-1 font-normal text-base-primary'>
                        <CountdownTimer
                            duration={60}
                            callback={onCountdownComplete}
                        />
                        Seconds
                    </span>
                ) : (
                    <a
                        className={`text-primary text-sm font-normal cursor-pointer`}
                        onClick={handleResendVerification}
                    >
                        Resend Verification Code
                    </a>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailOtp;
