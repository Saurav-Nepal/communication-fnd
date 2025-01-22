import { renderHook } from '@testing-library/react';

import { useThrottledEffect } from './use-throttled-effect';

describe('@slabs/hooks/use-throttled-effect', () => {
    it('should call the callback after the delay', () => {
        const callback = jest.fn();
        const delay = 1000;

        jest.useFakeTimers();

        renderHook(() => useThrottledEffect(callback, delay, []));

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(delay);

        expect(callback).toHaveBeenCalled();
    });

    it('should call the callback only once after the delay', () => {
        const callback = jest.fn();
        const delay = 1000;

        jest.useFakeTimers();

        renderHook(() => useThrottledEffect(callback, delay, []));

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(delay);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call the callback with the latest dependencies', () => {
        const callback = jest.fn();
        const delay = 1000;

        jest.useFakeTimers();

        const { rerender } = renderHook(
            ({ deps }) => useThrottledEffect(callback, delay, deps),
            {
                initialProps: { deps: [1] },
            }
        );

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(delay);

        expect(callback).toHaveBeenCalledTimes(1);

        rerender({ deps: [2] }); // Simulate a re-render with updated dependencies

        jest.advanceTimersByTime(delay);

        expect(callback).toHaveBeenCalledTimes(2); // Should be called again with updated dependencies
    });
});
