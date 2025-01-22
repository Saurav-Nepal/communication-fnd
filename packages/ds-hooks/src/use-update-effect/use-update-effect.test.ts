import { act, renderHook } from '@testing-library/react';

import { useUpdateEffect } from './use-update-effect';

describe('useUpdateEffect hook', () => {
    it('should run effect only on update when dependencies change', () => {
        const effect = jest.fn();
        let dependency = 0;

        const { rerender } = renderHook(() =>
            useUpdateEffect(effect, [dependency])
        );

        // Initially, the effect should not be called
        expect(effect).toHaveBeenCalledTimes(0);

        // Update the dependency and rerender the hook
        act(() => {
            dependency = 1;
            rerender();
        });

        // The effect should be called once since the dependency changed
        expect(effect).toHaveBeenCalledTimes(1);

        // Update the dependency again and rerender the hook
        act(() => {
            dependency = 2;
            rerender();
        });

        // The effect should be called again due to the dependency change
        expect(effect).toHaveBeenCalledTimes(2);

        // Rerender without changing the dependency
        act(() => {
            rerender();
        });

        // The effect should not be called again since the dependency didn't change
        expect(effect).toHaveBeenCalledTimes(2);
    });
});
