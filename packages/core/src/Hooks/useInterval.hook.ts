import { useEffect, useRef, useState } from 'react';

export function useInterval(fn: (...args: any) => void, interval: number) {
    const [active, setActive] = useState(false);
    const intervalRef = useRef<number>();
    const fnRef = useRef<(...args: any) => void>();

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const start = (...args: any) => {
        setActive((old) => {
            if (!old && !intervalRef.current) {
                intervalRef.current = window.setInterval(
                    () => fnRef.current(...args),
                    interval
                );
            }
            return true;
        });
    };

    const stop = () => {
        setActive(false);
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    };

    const toggle = () => {
        if (active) {
            stop();
        } else {
            start();
        }
    };

    return { start, stop, toggle, active };
}
