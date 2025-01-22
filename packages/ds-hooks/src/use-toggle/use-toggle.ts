import { Reducer, useReducer } from 'react';

/**
 * Creates a toggle state and a function to toggle the state with the given options.
 * The hook takes an array of values for the toggle state and returns a tuple containing the current option and a function to toggle the state.
 * The function to toggle the state can optionally take a new value to set the state to.
 *
 * @param {readonly TValues[]} options - array of values for toggle state
 * @return tuple containing the current option and a function to toggle the state
 */
export const useToggle = <TValues = boolean>(
    options: readonly TValues[] = [false, true] as any
) => {
    const [[option], toggle] = useReducer<
        Reducer<TValues[], React.SetStateAction<TValues>>
    >((state, action) => {
        const value =
            action instanceof Function ? action(state[0] as TValues) : action;
        const index = Math.abs(state.indexOf(value));

        return state.slice(index).concat(state.slice(0, index));
    }, options as TValues[]);

    return [
        option,
        toggle as (value?: React.SetStateAction<TValues>) => void,
    ] as const;
};
