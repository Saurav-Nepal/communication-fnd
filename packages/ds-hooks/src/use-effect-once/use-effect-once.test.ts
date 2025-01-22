import { act, renderHook } from '@testing-library/react';

import { useEffectOnce } from './use-effect-once';

describe('useEffectOnce hook', () => {
    it('should run effect only once', () => {
        const effect = jest.fn();
        const hooks = renderHook(() => useEffectOnce(effect));

        expect(effect).toHaveBeenCalledTimes(1);

        act(() => {
            hooks.unmount();
        });

        expect(effect).toHaveBeenCalledTimes(1);
    });
});
