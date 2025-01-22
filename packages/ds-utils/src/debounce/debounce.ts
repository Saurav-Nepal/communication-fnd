/**
 * Debounce
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
export function debounce<T extends (...args: unknown[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
): (...args: Parameters<T>) => void {
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout | undefined;

    return function debouncedFunction(
        this: ThisParameterType<T>,
        ...args: Parameters<T>
    ) {
        const context = this;

        const later = () => {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };

        const isCallNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (isCallNow) func.apply(context, args);
    };
}
