import { ChevronDown, X } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import {
    FetchData,
    GetObjectFromArray,
    IsArray,
    IsEmptyArray,
    IsFunction,
    IsObject,
    ParseInteger,
    ParseToSelectBoxOption,
    SelectBoxOption,
} from '@finnoto/core';

import { InputField } from '../../Components/Inputs/InputField/input.component';
import { InputFieldProps } from '../../Components/Inputs/InputField/input.types';
import { ListSelect, ListSelectProps } from './listSelect.component';

export interface ListSelectInputProps
    extends Omit<ListSelectProps, 'children' | 'onSelect'> {
    initMethod?: string;
    initMethodSearchParam?: any;
    size?: InputFieldProps['size'];
    isRequired?: boolean;
    error?: string;
    label?: string;
    onSelect?: (option: SelectBoxOption) => void;
    idsKey?: string;
    type?: string;
}

export const ListSelectInput = forwardRef(
    (
        {
            initMethod = 'show',
            initMethodSearchParam,
            size = 'md',
            isRequired,
            onSelect = () => {},
            idsKey = 'ids',

            ...rest
        }: ListSelectInputProps,
        ref
    ) => {
        const [tempOptions, setTempOptions] = useState([]);

        const valueIds = useMemo(() => {
            if (!rest?.value || !idsKey || initMethod === 'show') return {};

            if (IsArray(rest?.value)) {
                return {
                    [idsKey]: rest?.value
                        .map((value) => Number(value))
                        .filter(Boolean),
                };
            }
            return {
                [idsKey]: [Number(rest?.value)].filter(Boolean),
            };
        }, [idsKey, initMethod, rest?.value]);
        const getMethodParams = useCallback(
            (value) => {
                if (initMethodSearchParam) {
                    return IsFunction(initMethodSearchParam)
                        ? initMethodSearchParam(value)
                        : initMethodSearchParam;
                }
                return value;
            },
            [initMethodSearchParam]
        );
        const loadContent = async (value: string) => {
            if (!rest?.controller) return [];
            const { success, response } = await FetchData({
                className: rest.controller,
                method: initMethod,
                methodParams: getMethodParams(ParseInteger(value)),
                classParams: {
                    ...valueIds,
                },
            });

            if (!success) return [];

            return ParseToSelectBoxOption(
                !Array.isArray(response) ? [response] : response,
                rest.valueKey || 'id',
                rest.labelKey || 'name',
                {
                    subLabel: rest.sublabelKey,
                    shouldShowValue: rest?.value,
                    activeKeys: rest?.activeKeys,
                }
            );
        };

        const IsValueExist = useMemo(() => {
            if (!valueIds[idsKey]) return false;

            return valueIds[idsKey].every((id) =>
                tempOptions.flatMap((item) => item?.value).includes(id)
            );
        }, [idsKey, tempOptions, valueIds]);
        useEffect(() => {
            if (!initMethod) return;
            if (IsValueExist) return;
            if (!rest.value || IsObject(rest.value)) return;
            loadContent(rest.value).then((valueOptions) => {
                if (!IsEmptyArray(valueOptions)) setTempOptions(valueOptions);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [initMethod, rest.value, IsValueExist]);

        const value = useMemo(() => {
            if (!IsEmptyArray(tempOptions)) {
                const value =
                    GetObjectFromArray(tempOptions, 'value', rest?.value)
                        ?.label || '';
                if (value) return value;
            }

            if (!IsEmptyArray(rest?.options) && rest?.value)
                return (
                    GetObjectFromArray(rest?.options, 'value', rest?.value)
                        ?.label || ''
                );
            return rest.value || '';
        }, [rest, tempOptions]);

        return (
            <ListSelect
                onSelect={(option) => {
                    setTempOptions([option]);
                    onSelect(option);
                }}
                onOptionLoad={(options) => {
                    if (initMethod) return;
                    setTempOptions(options);
                }}
                fullScreen
                {...rest}
            >
                <InputField
                    name={rest?.name}
                    placeholder={rest.placeholder}
                    label={rest.label || rest.name}
                    error={rest.error}
                    disabled={rest.disabled}
                    value={value}
                    size={size}
                    required={isRequired}
                    type={rest?.type}
                    addonEnd={
                        <div className='gap-3 row-flex text-base-300'>
                            {!!value && !isRequired && (
                                <X
                                    size={16}
                                    strokeWidth={4}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTempOptions([]);
                                        onSelect(null);
                                    }}
                                />
                            )}
                            <ChevronDown size={18} strokeWidth={4} />
                        </div>
                    }
                    messageComponent={rest?.messageComponent}
                    ref={ref}
                    readOnly
                />
            </ListSelect>
        );
    }
);
