import { act, renderHook } from '@testing-library/react';

import { useBoolean } from './use-boolean';

describe('@slabs/ds-hooks/use-boolean', () => {
    it('returns correct initial state', () => {
        const hook = renderHook(() => useBoolean(false));
        const [isOpen] = hook.result.current;

        expect(isOpen).toBeFalsy();
    });

    it('correctly toggles value', () => {
        const hook = renderHook(() => useBoolean());
        const [_isOpen, toggle] = hook.result.current;

        act(() => toggle());
        expect(hook.result.current[0]).toBeTruthy();

        act(() => toggle());
        expect(hook.result.current[0]).toBeFalsy();
    });

    it('allows to set value', () => {
        const hook = renderHook(() => useBoolean());
        const [_isOpen, toggle] = hook.result.current;

        act(() => toggle(false));
        expect(hook.result.current[0]).toBeFalsy();

        act(() => toggle(true));
        expect(hook.result.current[0]).toBeTruthy();
    });
});
