import { renderHook } from '@testing-library/react';

import { useFirstMountState } from './use-first-mount-state';

describe('useFirstMountState hook', () => {
    it('should return true on first render', () => {
        const hooks = renderHook(() => useFirstMountState());

        expect(hooks.result.current).toBe(true);
    });

    it('should return false on second render', () => {
        const hooks = renderHook(() => useFirstMountState());

        hooks.rerender();

        expect(hooks.result.current).toBe(false);
    });
});
