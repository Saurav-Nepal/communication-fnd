import { OTPInput, CountdownTimer } from '@finnoto/design-system';

const VerifyMobileOtp = ({
    mobile_number,
    handleVerifyOtp,
    setOtp,
    otpRef,
    otp,
    countdownDone,
    onCountdownComplete,
    handleResendVerification,
}: any) => {
    return (
        <div className='gap-4 col-flex'>
            <div className='gap-4 text-sm col-flex'>
                <div className='font-normal'>
                    We have sent a code to this number, please enter the code to
                    verify your mobile number.
                </div>
                <div className='font-medium'>
                    To verify your mobile number, enter the 4-digit code sent to
                    your phone.
                </div>
            </div>

            <OTPInput
                length={4}
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
                )}{' '}
            </div>
        </div>
    );
};

export default VerifyMobileOtp;
