import { act, renderHook } from '@testing-library/react';

import { useUncontrolledList } from './use-uncontrolled-list';

describe('useUncontrolled List', () => {
    it('should initialize with defaultValue when provided', () => {
        const { result } = renderHook(() =>
            useUncontrolledList({ defaultValue: [1, 2, 3] })
        );

        const [value, , isControlled] = result.current;
        expect(value).toEqual([1, 2, 3]);
        expect(isControlled).toBe(false);
    });

    it('should initialize with finalValue when defaultValue is not provided', () => {
        const { result } = renderHook(() =>
            useUncontrolledList({ finalValue: [4, 5, 6] })
        );

        const [value, , isControlled] = result.current;
        expect(value).toEqual([4, 5, 6]);
        expect(isControlled).toBe(false);
    });

    it('should use controlled value when provided', () => {
        const { result } = renderHook(() =>
            useUncontrolledList({ value: [7, 8, 9] })
        );

        const [value, , isControlled] = result.current;
        expect(value).toEqual([7, 8, 9]);
        expect(isControlled).toBe(true);
    });

    it('should call onChange when uncontrolled value changes', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() =>
            useUncontrolledList({ onChange, defaultValue: ['initial'] })
        );

        act(() => {
            result.current[1].push('new');
        });

        expect(onChange).toHaveBeenCalledWith(['initial', 'new']);
    });

    it('should update list when controlled value changes', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useUncontrolledList({ value }),
            { initialProps: { value: ['initial'] } }
        );

        expect(result.current[0]).toEqual(['initial']);

        rerender({ value: ['updated'] });

        expect(result.current[0]).toEqual(['updated']);
    });

    it('should perform list actions correctly in uncontrolled mode', () => {
        const { result } = renderHook(() =>
            useUncontrolledList({ defaultValue: [1, 2, 3] })
        );

        act(() => {
            const [, actions] = result.current;
            actions.push(4);
            actions.insertAt(0, 0);
            actions.removeAt(2);
        });

        const [value] = result.current;
        expect(value).toEqual([0, 1, 3, 4]);
    });

    it('should not modify the list in controlled mode', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useUncontrolledList({ value }),
            { initialProps: { value: [1, 2, 3] } }
        );

        act(() => {
            const [, actions] = result.current;
            actions.push(4);
        });

        // Rerender to ensure the controlled value is maintained
        rerender({ value: [1, 2, 3] });

        const [value] = result.current;
        expect(value).toEqual([1, 2, 3]);
    });
});
