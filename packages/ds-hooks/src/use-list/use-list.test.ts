import { act, renderHook } from '@testing-library/react';

import { useList } from './use-list';

describe('useList hook', () => {
    it('should update item at given index to the list', () => {
        const hooks = renderHook(() =>
            useList<{
                id: number;
                name: string;
            }>([
                { id: 1, name: 'item1' },
                { id: 2, name: 'item2' },
            ])
        );
        const [, actions] = hooks.result.current;
        const newList = [
            { id: 1, name: 'item3' },
            { id: 2, name: 'item2' },
        ];

        act(() => {
            actions.updateAt(0, { id: 1, name: 'item3' });
        });

        expect(hooks.result.current[0]).toEqual(newList);
    });

    it('should insert item at given index to the list', () => {
        const hooks = renderHook(() =>
            useList<{
                id: number;
                name: string;
            }>([
                { id: 1, name: 'item1' },
                { id: 2, name: 'item2' },
            ])
        );
        const [, actions] = hooks.result.current;
        const newList = [
            { id: 1, name: 'item1' },
            { id: 3, name: 'item3' },
            { id: 2, name: 'item2' },
        ];

        act(() => {
            actions.insertAt(1, { id: 3, name: 'item3' });
        });

        expect(hooks.result.current[0]).toEqual(newList);
    });
});
