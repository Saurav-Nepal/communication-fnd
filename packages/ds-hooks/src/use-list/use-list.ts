import { useMemo, useRef } from 'react';

import { useUpdate } from '../use-update/use-update';
import {
    IHookStateInitAction,
    IHookStateSetAction,
    resolveHookState,
} from '../utils/misc/hook-state';
import { ListAction } from './use-list.types';

export function useList<TList>(
    initialList: IHookStateInitAction<TList[]> = []
): [TList[], ListAction<TList>] {
    const list = useRef(resolveHookState(initialList));
    const update = useUpdate();

    const actions = useMemo<ListAction<TList>>(() => {
        const a = {
            set: (newList: IHookStateSetAction<TList[]>) => {
                list.current = resolveHookState(newList, list.current);
                update();
            },

            push: (...items: TList[]) => {
                items.length &&
                    actions.set((curr: TList[]) => curr.concat(items));
            },

            updateAt: (index: number, item: TList) => {
                actions.set((curr: TList[]) => {
                    const arr = curr.slice();

                    arr[index] = item;

                    return arr;
                });
            },
            insertAt: (index: number, item: TList) => {
                actions.set((curr: TList[]) => {
                    const arr = curr.slice();

                    index > arr.length
                        ? (arr[index] = item)
                        : arr.splice(index, 0, item);

                    return arr;
                });
            },

            update: (
                predicate: (a: TList, b: TList) => boolean,
                newItem: TList
            ) => {
                actions.set((curr: TList[]) =>
                    curr.map((item) =>
                        predicate(item, newItem) ? newItem : item
                    )
                );
            },

            updateFirst: (
                predicate: (a: TList, b: TList) => boolean,
                newItem: TList
            ) => {
                const index = list.current.findIndex((item) =>
                    predicate(item, newItem)
                );

                index >= 0 && actions.updateAt(index, newItem);
            },

            upsert: (
                predicate: (a: TList, b: TList) => boolean,
                newItem: TList
            ) => {
                const index = list.current.findIndex((item) =>
                    predicate(item, newItem)
                );

                index >= 0
                    ? actions.updateAt(index, newItem)
                    : actions.push(newItem);
            },

            sort: (compareFn?: (a: TList, b: TList) => number) => {
                actions.set((curr: TList[]) => curr.slice().sort(compareFn));
            },

            filter: <TValue extends TList>(
                callbackFn: (
                    value: TList,
                    index: number,
                    array: TList[]
                ) => value is TValue,
                thisArg?: any
            ) => {
                actions.set((curr: TList[]) =>
                    curr.slice().filter(callbackFn, thisArg)
                );
            },

            removeAt: (index: number) => {
                actions.set((curr: TList[]) => {
                    const arr = curr.slice();

                    arr.splice(index, 1);

                    return arr;
                });
            },

            clear: () => {
                actions.set([]);
            },

            reset: () => {
                actions.set(resolveHookState(initialList).slice());
            },
        };

        return a as ListAction<TList>;
    }, []);

    return [list.current, actions];
}
