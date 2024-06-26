import { useEffect, useRef } from 'react';

/**
 * A custom hook that performs a recursive fetch.
 *
 * @param {(...args: any) => void} fetch - The fetch function to be executed recursively.
 * @param {{ repeat?: number; delay?: number }} options - Optional object with configuration options.
 * @param {number} options.repeat - The number of times the fetch function should be repeated. Default is 3.
 * @param {number} options.delay - The delay in milliseconds between each fetch call. Default is 3000.
 * @return {Array<(...args: any) => void>} - An array containing the refetch function.
 */
export const useRecursiveFetch = (
    fetch: (...args: any) => void,
    options?: { repeat?: number; delay?: number }
) => {
    let times = 0;
    let timeoutRef = useRef(null);

    const { repeat = 3, delay = 3000 } = options || {};

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const refetch = (...args: any) => {
        clearTimeout(timeoutRef.current);
        fetch(...args);
        if (times >= repeat - 1) {
            times = 0;
            return;
        }
        timeoutRef.current = setTimeout(() => {
            times += 1;
            refetch(...args);
        }, delay + times * delay);
    };

    return [refetch];
};
