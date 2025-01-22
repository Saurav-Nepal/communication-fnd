import { useList } from '../use-list/use-list';
import { ListAction } from '../use-list/use-list.types';
import { useUpdateEffect } from '../use-update-effect/use-update-effect';

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

export function useUncontrolledList<TItem>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {},
}: UseUncontrolledInput<TItem>): [TItem[], ListAction<TItem>, boolean] {
    const [uncontrolledValue, actions] = useList(
        defaultValue !== undefined ? defaultValue : finalValue
    );

    useUpdateEffect(() => {
        // deep equal of value and uncontrolledValue
        if (JSON.stringify(value) === JSON.stringify(uncontrolledValue)) return;

        onChange?.(uncontrolledValue);
    }, [uncontrolledValue]);

    useUpdateEffect(() => {
        if (value === undefined) return;

        actions.set(value);
    }, [value]);

    if (value !== undefined) {
        return [value as TItem[], actions, true];
    }

    return [uncontrolledValue as TItem[], actions, false];
}
