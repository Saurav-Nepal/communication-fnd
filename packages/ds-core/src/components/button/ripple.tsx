import React, { useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Button } from './button';

interface RippleButtonProps extends React.ComponentProps<typeof Button> {
    children: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, ...props }) => {
    const [ripples, setRipples] = useState<
        Array<{ x: number; y: number; id: number }>
    >([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipples([...ripples, { x, y, id: Date.now() }]);
    };

    const removeRipple = (id: number) => {
        setRipples(ripples.filter((ripple) => ripple.id !== id));
    };

    return (
        <Button
            {...props}
            ref={buttonRef}
            onClick={(e) => {
                addRipple(e);
                props.onClick?.(e);
            }}
            className={`relative overflow-hidden ${props.className || ''}`}
        >
            {children}
            <TransitionGroup component={null}>
                {ripples.map((ripple) => (
                    <CSSTransition
                        key={ripple.id}
                        classNames='ripple'
                        timeout={750}
                        onEntered={() => removeRipple(ripple.id)}
                    >
                        <span
                            className='absolute rounded-full w-[120%] pb-[120%] -mt-[50%] -ml-[50%] bg-card/60'
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                            }}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Button>
    );
};

export default RippleButton;
