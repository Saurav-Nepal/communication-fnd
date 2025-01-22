import { useCallback, useState } from 'react';

import { SelectBoxProps, SelectBoxValueType } from './select-box.types';

const useStateManager = ({
    defaultValue,
    value: propsValue,
    onSearchValue: propsOnInputChange,
    onChange: propsOnChange,
    searchValue: propsInputValue,

    ...restSelect
}: SelectBoxProps) => {
    const [stateInputValue, setStateInputValue] = useState(
        propsInputValue !== undefined ? propsInputValue : ''
    );

    const [stateValue, setStateValue] = useState<
        SelectBoxValueType | undefined
    >(propsValue !== undefined ? propsValue : defaultValue);

    const onChange = useCallback(
        (value: SelectBoxValueType | SelectBoxValueType[] | undefined) => {
            if (typeof propsOnChange === 'function') {
                propsOnChange(value as any);
            }
            setStateValue(value as any);
        },
        [propsOnChange]
    );
    const onInputChange = useCallback(
        (value: any) => {
            let newValue;
            if (typeof propsOnInputChange === 'function') {
                newValue = propsOnInputChange(value);
            }
            setStateInputValue(newValue !== undefined ? newValue : value);
        },
        [propsOnInputChange]
    );

    const value = propsValue !== undefined ? propsValue : stateValue;

    return {
        ...restSelect,
        value,
        onChange,
        onSearchValue: onInputChange,
        searchValue:
            propsInputValue !== undefined ? propsInputValue : stateInputValue,
    };
};

export { useStateManager };
