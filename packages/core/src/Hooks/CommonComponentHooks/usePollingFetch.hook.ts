import { useCallback, useEffect, useRef } from 'react';
import { useToggle } from 'react-use';

import { IsFunction } from '../../Utils/common.utils';

/**
 * A custom hook that performs a polling fetch.
 *
 * @param {(...args: any) => void} fetch - The fetch function to be executed recursively.
 * @param {{ repeat?: number; delay?: number }} options - Optional object with configuration options.
 * @param {number} options.initialDelay - The initial delay in milliseconds before the first fetch call. Default is 3000.
 * @param {number} options.delay - The delay in milliseconds between each fetch call. Default is 3000.
 */
export const usePollingFetch = <TFetchParams extends any[]>(
    fetch: (...args: TFetchParams) => Promise<boolean> | boolean,
    options?: {
        initialDelay?: number;
        delay?: number;
        maxPollingTime?: number;
        onTimeElapsed?: () => void;
    }
): [boolean, (...args: TFetchParams) => void, () => void] => {
    let timeoutRef = useRef(null);
    let timeKeeperRef = useRef(null);

    const [isPolling, togglePolling] = useToggle(false);

    const {
        initialDelay = 3 * 1000,
        delay = 3 * 1000,
        maxPollingTime,
        onTimeElapsed,
    } = options || {};

    const refetch = async (timeout: number = delay, ...args: TFetchParams) => {
        togglePolling(true);
        clearTimeout(timeoutRef.current);

        if (await fetch(...args)) {
            timeKeeperRef.current = null;

            return togglePolling(false);
        }

        timeoutRef.current = setTimeout(() => {
            refetch(timeout, ...args);
        }, timeout);

        checkTimeElapsed();
    };

    const checkTimeElapsed = () => {
        const timeElapsed = Date.now() - timeKeeperRef.current;

        if (!maxPollingTime) return;

        if (timeElapsed > maxPollingTime) {
            stop(true);
        }
    };

    const stop = useCallback(
        (timeElapsed?: boolean) => {
            togglePolling(false);
            clearTimeout(timeoutRef.current);

            if (timeElapsed && IsFunction(onTimeElapsed)) {
                onTimeElapsed();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [togglePolling]
    );

    const start = (...args: TFetchParams) => {
        timeKeeperRef.current = Date.now();
        refetch(initialDelay, ...args);
    };

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return [isPolling, start, stop];
};
