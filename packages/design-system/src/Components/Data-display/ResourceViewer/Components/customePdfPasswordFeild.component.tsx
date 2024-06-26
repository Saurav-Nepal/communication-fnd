import { useState } from 'react';

import { Button } from '../../../Inputs/Button/button.component';
import { InputPassword } from '../../../Inputs/InputField/input.password.component';
import { Icon } from '../../Icon/icon.component';

import { LockIcon } from 'assets';

export function CustomPasswordInput({ onPasswordEntered, error }) {
    const [password, setPassword] = useState('');
    const [emptyPassword, setEmptyPassword] = useState(false);

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleEnterClick = () => {
        if (password.length === 0) {
            setEmptyPassword(true);
            return;
        }
        onPasswordEntered(password);
    };

    return (
        <div className='flex-col justify-between mx-auto rounded-md w-[43vh] bg-base-100 p-5'>
            <div className='flex items-center justify-center mb-4'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-error/25'>
                    <Icon source={LockIcon} isSvg size={32} />
                </div>
            </div>

            <div className='font-medium text-center text-md'>
                This file is password protected
            </div>

            <div className='mx-auto mt-1 text-sm font-normal text-center text-base-secondary'>
                {`Please enter this document's password to view it`}
            </div>
            <div className='flex flex-col gap-2 my-6'>
                {error && password.length === 0 && (
                    <span className='text-xs text-center text-error '>
                        Incorrect password. Please try again.
                    </span>
                )}
                {emptyPassword && password.length === 0 && (
                    <span className='text-xs text-center text-error '>
                        Please enter password.
                    </span>
                )}
                <InputPassword
                    name='protected-password'
                    placeholder={`Enter document's password`}
                    value={password}
                    required
                    className='w-[100%] mx-auto'
                    onChange={handlePasswordChange}
                />
            </div>
            <div className='flex flex-1 w-full gap-4 mt-3 mb-3 '>
                <Button
                    key={23}
                    appearance='success'
                    onClick={() => {
                        handleEnterClick();
                    }}
                    size='md'
                    className='w-full mx-auto'
                    progress={password.length > 0}
                >
                    <span className=''>{`Submit`}</span>
                </Button>
            </div>
        </div>
    );
}

export default CustomPasswordInput;
