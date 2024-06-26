import { forwardRef } from 'react';
import { cn } from '../../../Utils/common.ui.utils';
import { FormControlInterface } from './input.types';

export const FormControl = forwardRef(
    (
        { children, containerClass, className }: FormControlInterface,
        ref: any
    ) => {
        return (
            <div
                ref={ref}
                className={cn('form-control', containerClass, className)}
            >
                {children}
            </div>
        );
    }
);
