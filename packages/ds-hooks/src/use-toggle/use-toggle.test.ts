import { act, renderHook } from '@testing-library/react';

import { useToggle } from './use-toggle';

describe('@slabs/ds-hooks/use-toggle', () => {
    it('returns correct initial state', () => {
        const hook = renderHook(() => useToggle(['dark', 'light'] as const));
        const [mode] = hook.result.current;

        expect(mode).toBe('dark');
    });

    it('correctly toggles value', () => {
        const hook = renderHook(() => useToggle(['dark', 'light'] as const));
        const [_, toggle] = hook.result.current;

        act(() => toggle());
        expect(hook.result.current[0]).toBe('light');

        act(() => toggle());
        expect(hook.result.current[0]).toBe('dark');
    });

    it('correctly toggles more than two values', () => {
        const hook = renderHook(() =>
            useToggle(['dark', 'light', 'normal'] as const)
        );

        const [_, toggle] = hook.result.current;

        act(() => toggle());
        expect(hook.result.current[0]).toBe('light');

        act(() => toggle());
        expect(hook.result.current[0]).toBe('normal');

        act(() => toggle());
        expect(hook.result.current[0]).toBe('dark');

        act(() => toggle('normal'));
        expect(hook.result.current[0]).toBe('normal');

        act(() => toggle());
        expect(hook.result.current[0]).toBe('dark');
    });

    it('allows to set value', () => {
        const hook = renderHook(() => useToggle(['dark', 'light'] as const));
        const [_, toggle] = hook.result.current;

        act(() => toggle('dark'));
        expect(hook.result.current[0]).toBe('dark');

        act(() => toggle('dark'));
        expect(hook.result.current[0]).toBe('dark');
    });

    it('allows to set value with callback function', () => {
        const hook = renderHook(() => useToggle(['dark', 'light'] as const));
        const [_, toggle] = hook.result.current;

        act(() => toggle((value) => value));
        expect(hook.result.current[0]).toBe('dark');
    });

    it('allows to use hook without options', () => {
        const hook = renderHook(() => useToggle());
        const [_isOpen, toggle] = hook.result.current;

        expect(hook.result.current[0]).toBe(false);
        act(() => toggle());
        expect(hook.result.current[0]).toBe(true);
    });
});
