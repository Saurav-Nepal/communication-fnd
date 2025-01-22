import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from './use-local-storage';

describe('@slabs/ds-hooks/use-local-storage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        // eslint-disable-next-line no-undef
        localStorage.clear();
    });

    it('returns correct initial state', () => {
        const hook = renderHook(() => useLocalStorage({ key: 'test' }));
        const [value] = hook.result.current;

        expect(value).toBeUndefined();
    });

    it('correctly sets value', () => {
        const hook = renderHook(() => useLocalStorage({ key: 'test' }));
        const [_, setValue] = hook.result.current;

        act(() => setValue('test'));
        expect(hook.result.current[0]).toBe('test');
    });

    it('correctly removes value', () => {
        const hook = renderHook(() => useLocalStorage({ key: 'testing' }));

        const [_, setValue, removeValue] = hook.result.current;

        act(() => setValue('slab-local-storage'));
        expect(hook.result.current[0]).toBe('slab-local-storage');

        act(() => removeValue());
        expect(hook.result.current[0]).toBeUndefined();
    });
});
