'use client';

import { useEffect, useRef, useState } from 'react';

import { cn, IsFunction, ParseInteger } from '../../../Utils/common.ui.utils';
import { TimerDto } from './countdownTimer.types';

/**
 * Represents a countdown timer component.
 *
 * @param className - Optional CSS class name for the component.
 * @param duration - The duration of the countdown in seconds or as a string.
 * @param callback - A callback function to be called when the countdown reaches 0.
 * @param countTime - A function to be called on each tick of the countdown timer.
 * @returns The CountdownTimer component.
 *
 * @author @rumeshudash
 */
export const CountdownTimer = ({
    className,
    duration = 30,
    callback = () => {},
    countTime = () => {},
}: TimerDto) => {
    // State to hold the remaining seconds of the countdown
    const [seconds, setSeconds] = useState(ParseInteger(duration + ''));

    // Reference to the countdown timer element
    const ref = useRef<any>();

    useEffect(() => {
        // Update the style attribute of the countdown timer element
        ref.current.setAttribute('style', `--value: ${seconds}`);

        // Start the countdown timer
        const timer = setInterval(() => {
            if (seconds > 0 && ref.current) {
                const newSec = seconds - 1;
                ref.current.setAttribute('style', `--value: ${newSec}`);
                setSeconds(newSec);
                countTime(newSec);
                if (seconds - 1 == 0 && IsFunction(callback)) {
                    callback(seconds);
                }
            }
        }, 1000);

        // Clean up the timer on component unmount
        return () => {
            clearInterval(timer);
        };
    }, [callback, countTime, seconds]);

    return (
        <span className={cn('countdown pt-1', className)}>
            <span ref={ref}></span>
        </span>
    );
};
