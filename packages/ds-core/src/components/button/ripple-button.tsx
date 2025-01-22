import React from 'react';

import { ButtonProps } from './button';
import Ripple from './ripple';

const RippleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, ...props }, ref) => {
        return (
            <Ripple onClick={onClick} ref={ref} {...props}>
                Button
            </Ripple>
        );
    }
);

export { RippleButton };
