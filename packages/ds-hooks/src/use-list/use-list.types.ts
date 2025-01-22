import { IHookStateSetAction } from '../utils/misc/hook-state';

export interface ListAction<TList> {
    /**
     * @description Set new list instead old one
     */
    set: (newList: IHookStateSetAction<TList[]>) => void;
    /**
     * @description Add item(s) at the end of list
     */
    push: (...items: TList[]) => void;

    /**
     * @description Replace item at given position. If item at given position not exists it will be set.
     */

    updateAt: (index: number, item: TList) => void;

    /**
     * @description Insert item at given position, all items to the right will be shifted.
     */

    insertAt: (index: number, item: TList) => void;

    /**
     * @description Replace all items that matches predicate with given one.
     */
    update: (
        predicate: (a: TList, b: TList) => boolean,
        newItem: TList
    ) => void;
    /**
     * @description Replace first item matching predicate with given one.
     */
    updateFirst: (
        predicate: (a: TList, b: TList) => boolean,
        newItem: TList
    ) => void;
    /**
     * @description Like `updateFirst` bit in case of predicate miss - pushes item to the list
     */
    upsert: (
        predicate: (a: TList, b: TList) => boolean,
        newItem: TList
    ) => void;

    /**
     * @description Sort list with given sorting function
     */
    sort: (compareFn?: (a: TList, b: TList) => number) => void;
    /**
     * @description Same as native Array's method
     */
    filter: (
        callbackFn: (value: TList, index?: number, array?: TList[]) => boolean,
        thisArg?: any
    ) => void;

    /**
     * @description Removes item at given position. All items to the right from removed will be shifted.
     */
    removeAt: (index: number) => void;

    /**
     * @description Make the list empty
     */
    clear: () => void;
    /**
     * @description Reset list to initial value
     */
    reset: () => void;
}
