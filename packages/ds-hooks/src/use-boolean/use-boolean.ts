import { useReducer } from 'react';

/**
 * Creates a boolean state and a function to toggle the state. The function takes an optional
 * initial value for the boolean state and returns a tuple containing the boolean state and a
 * function to toggle the state. The function to toggle the state can optionally take a new boolean
 * value to set the state to.
 *
 * @param {boolean} initialValue - `(optional)` The initial value of the boolean state
 * @return The boolean state and a function to toggle the state
 */
export const useBoolean = (
    initialValue: boolean = false
): [boolean, (nextValue?: boolean) => void] => {
    return useReducer(
        (state: boolean, nextValue?: boolean) =>
            typeof nextValue === 'boolean' ? nextValue : !state,
        initialValue
    );
};
