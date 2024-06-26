'use client';

import { forwardRef, useMemo, useState } from 'react';
import { cn } from '../../../Utils/common.ui.utils';
import { InputField } from './input.component';
import { InputFieldProps } from './input.types';
import PasswordIcon from './password.icon.component';

interface InputPasswordProps extends Omit<InputFieldProps, 'type'> {
    hidePasswordToggle?: boolean;
}

export const InputPassword = forwardRef(
    ({ hidePasswordToggle, ...props }: InputPasswordProps, ref: any) => {
        const [visible, setVisible] = useState<boolean>(false);

        const inputProps = useMemo<InputPasswordProps>(
            () => ({
                ...props,
                ref,
                inputClassName: cn('input-password', props.inputClassName),
                addonEnd: !hidePasswordToggle ? (
                    <div
                        className='p-1 cursor-pointer text-base-primary hover:text-primary-focus'
                        onClick={() => setVisible((v) => !v)}
                    >
                        <PasswordIcon visible={visible} />
                    </div>
                ) : null,
                type: visible ? 'text' : 'password',
            }),
            [hidePasswordToggle, props, ref, visible]
        );

        return (
            <InputField
                type='password'
                trimSpecialChar={false}
                {...inputProps}
            />
        );
    }
);
