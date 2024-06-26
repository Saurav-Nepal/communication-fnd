import React from 'react';

/**
 * Renders a circular progress bar with the value and size indicating the current count down time.
 *
 * @param {number} countDownTime - the remaining time in seconds for the count down
 * @return {JSX.Element} The HTML element representing the circular progress bar.
 *
 * @author @rumeshudash
 */
export const CountDownTimerProgress = ({
    countDownTime,
}: {
    countDownTime: number;
}) => {
    const styleProgress = {
        '--value': Math.abs(countDownTime || 100),
        '--size': '16px',
        '--thickness': '2px',
    } as React.CSSProperties;

    return (
        <div
            className='before:transition-all radial-progress text-success '
            style={styleProgress}
        ></div>
    );
};
