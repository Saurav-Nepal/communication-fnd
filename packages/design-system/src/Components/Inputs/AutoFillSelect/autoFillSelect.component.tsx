import { forwardRef, useEffect, useRef, useState } from 'react';

import {
    EmptyFunction,
    FetchData,
    IsEmptyArray,
    IsValidString,
    ObjectDto,
    ParseToSelectBoxOption,
} from '@finnoto/core';

import { Dropdown, DropdownProps } from '../Dropdown/dropdown.component';
import { InputField } from '../InputField/input.component';

interface AutoFillSelectInterface extends Omit<DropdownProps, 'children'> {
    onChange?: (value) => void;
    onBlur?: (value) => void;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    error?: string;
    name?: string;
    groupClassName?: string;
    filterClassParams?: ObjectDto;
}

const AutoFillSelect = forwardRef<any, AutoFillSelectInterface>(
    (
        {
            value,
            options,
            trigger = 'click',
            disabled,
            onSelect = () => {},
            isAsync,
            controller,
            method = 'find',
            methodParams,
            minLength = 0,
            searchKey = 'str',
            valueKey = 'id',
            labelKey = 'name',
            sublabelKey = 'identifier',
            offsetX,
            menuClassName = '',
            placeholder,
            onOptionLoad = () => {},
            searchDisabled = false,
            disableAutoWidth = false,
            onChange = EmptyFunction,
            filterClassParams,
            ...rest
        },
        ref
    ) => {
        const dropRef = useRef<any>();

        const [tempOptions, setTempOptions] = useState(options || []);
        const [option, setOptions] = useState(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [touched, setTouched] = useState<boolean>(false);

        useEffect(() => {
            if (!minLength && !disabled && IsEmptyArray(options)) {
                loadContent('').then((options) => {
                    setTempOptions(options);
                    onOptionLoad(options);
                });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [methodParams, method, disabled, isAsync, minLength, options]);

        const getOptions = (input: string, callback = (_: any) => {}) => {
            if (!IsValidString(input)) return callback(null);

            loadContent(input).then((options) => {
                callback(options);
            });
        };

        const loadContent = async (search: string) => {
            setLoading(true);
            setTouched(true);
            if (!controller) return [];
            if (minLength && !IsValidString(search)) return [];
            if ((search + '').length < minLength) return [];

            const { success, response } = await FetchData({
                className: controller,
                method: method,
                methodParams: methodParams,
                classParams: { [searchKey]: search, ...filterClassParams },
            });
            setLoading(false);

            if (success) {
                if (dropRef?.current && touched) {
                    if (!IsEmptyArray(response)) dropRef?.current?.toggle(true);
                    if (IsEmptyArray(response)) dropRef?.current?.toggle(false);
                }
                return ParseToSelectBoxOption(response, valueKey, labelKey, {
                    subLabel: sublabelKey,
                });
            }

            return [];
        };

        const handleSearch = (value) => {
            getOptions(value, (data) => {
                setOptions(data);
            });
            onChange(value);
        };

        return (
            <Dropdown
                ref={dropRef}
                offsetY={5}
                options={option || tempOptions}
                value={value}
                isAsync={false}
                onSelect={onSelect}
                isLoading={loading}
                searchDisabled
                {...rest}
            >
                <InputField
                    {...{ onDebounceChange: handleSearch, disabled }}
                    value={value}
                    placeholder={placeholder}
                    trimSpecialChar={false}
                    autoComplete={false}
                    {...rest}
                    ref={ref}
                />
            </Dropdown>
        );
    }
);

export default AutoFillSelect;
