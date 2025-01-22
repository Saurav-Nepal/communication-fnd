import { useState } from 'react';

/**
 * Manage state of both controlled and uncontrolled components.
 * Returns a tuple containing the controlled/uncontrolled value, a function to update the value,
 * and a boolean indicating if the value is controlled or not.
 *
 * @param {TValue} params.value - The controlled value
 * @param {TValue} params.defaultValue - The default value
 * @param {TValue} params.finalValue - The final value
 * @param {(value: TValue, ...payload: unknown[]) => void} params.onChange - The change handler
 *
 * @return Tuple containing controlled value, function to update value, and boolean indicating if the value is controlled
 */
export function useUncontrolled<TValue>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {},
}: {
    value?: TValue;
    defaultValue?: TValue;
    finalValue?: TValue;
    onChange?: (value: TValue, ...payload: unknown[]) => void;
}): [TValue, (value: TValue, ...payload: unknown[]) => void, boolean] {
    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue !== undefined ? defaultValue : finalValue // ignore sonarlint issue since we  need also nullish value here
    );

    const handleUncontrolledChange = (val: TValue, ...payload: unknown[]) => {
        setUncontrolledValue(val);
        onChange?.(val, ...payload);
    };

    if (value !== undefined) {
        return [value as TValue, onChange, true];
    }

    return [uncontrolledValue as TValue, handleUncontrolledChange, false];
}
