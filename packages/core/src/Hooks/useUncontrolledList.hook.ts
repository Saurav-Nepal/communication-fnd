import { useList, useUpdateEffect } from 'react-use';
import { ListActions } from 'react-use/lib/useList';

interface UseUncontrolledInput<T> {
    /** Value for controlled state */
    value?: T[];

    /** Initial value for uncontrolled state */
    defaultValue?: T[];

    /** Final value for uncontrolled state when value and defaultValue are not provided */
    finalValue?: T[];

    /** Controlled state onChange handler */
    onChange?: (value: T[]) => void;
}

export function useUncontrolledList<T>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {},
}: UseUncontrolledInput<T>): [T[], ListActions<T>, boolean] {
    const [uncontrolledValue, actions] = useList(
        defaultValue !== undefined ? defaultValue : finalValue
    );

    useUpdateEffect(() => {
        // deep equal of value and uncontrolledValue
        if (JSON.stringify(value) === JSON.stringify(uncontrolledValue)) return;

        onChange?.(uncontrolledValue);
    }, [uncontrolledValue]);

    useUpdateEffect(() => {
        if (value !== undefined) return;

        actions.set(value);
    }, [value]);

    if (value !== undefined) {
        return [value as T[], actions, true];
    }

    return [uncontrolledValue as T[], actions, false];
}
