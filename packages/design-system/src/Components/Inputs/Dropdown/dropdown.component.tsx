import React, {
    forwardRef,
    Fragment,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useUpdateEffect } from 'react-use';

import {
    Debounce,
    FetchData,
    IsEmptyArray,
    IsUndefined,
    IsValidString,
    ParseToSelectBoxOption,
    SelectBoxOption,
    useApp,
} from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Loading } from '../../Data-display/Loading/loading.component';
import {
    CloseAllPopovers,
    Popover,
} from '../../Surfaces/Popover/popover.component';
import { PopoverProps } from '../../Surfaces/Popover/popover.types';
import { InputField } from '../InputField/input.component';
import { InputFieldProps } from '../InputField/input.types';

export interface DropdownProps {
    value: string;
    options?: SelectBoxOption[];
    trigger?: 'click' | 'manual';
    offsetY?: number;
    offsetX?: number;
    disabled?: boolean;
    children?: any;
    isAsync?: boolean;
    controller?: any;
    method?: string;
    methodParams?: any;
    searchKey?: string;
    valueKey?: string;
    labelKey?: string;
    sublabelKey?: string;
    minLength?: number;
    menuClassName?: string;
    placeholder?: string;
    onSelect?: (option: SelectBoxOption) => void;
    renderItem?: (
        value: any,
        option: SelectBoxOption,
        onSelect: (option: SelectBoxOption) => void
    ) => React.ReactNode;
    onOptionLoad?: (options: SelectBoxOption[]) => void;
    noDataComponent?: (params: { search: string }) => void;
    searchDisabled?: boolean;
    disableAutoWidth?: boolean;
    searchByValue?: boolean;
    isLoading?: boolean;
    activeKeys?: string[] | string;
    align?: PopoverProps['align'];
    side?: PopoverProps['side'];
    inputSize?: InputFieldProps['size'];
}

export const Dropdown = forwardRef(
    (
        {
            value,
            options,
            trigger = 'click',
            children,
            offsetY = -40,
            disabled,
            onSelect = () => {},
            isAsync,
            controller,
            method = 'find',
            methodParams,
            minLength,
            searchKey = 'search',
            valueKey = 'id',
            labelKey = 'name',
            sublabelKey = 'identifier',
            offsetX,
            menuClassName = '',
            placeholder,
            onOptionLoad = () => {},
            noDataComponent,
            renderItem,
            searchDisabled = false,
            disableAutoWidth = false,
            isLoading,
            activeKeys,
            align,
            side,
            inputSize,
        }: DropdownProps,
        ref
    ) => {
        const popperRef = useRef(null);

        const [tempOptions, setTempOptions] = useState([]);

        useEffect(() => {
            if (isAsync && !minLength && !disabled && IsEmptyArray(options)) {
                loadContent('').then((options) => {
                    setTempOptions(options);
                    onOptionLoad(options);
                });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [methodParams, method, disabled, isAsync, minLength, options]);

        const getOptions = (input: string, callback = (_: any) => {}) => {
            if (!IsValidString(input)) return callback([]);

            loadContent(input).then((options) => {
                callback(options);
            });
        };

        const loadContent = async (search: string) => {
            if (minLength && !IsValidString(search)) return [];
            if ((search + '').length < minLength) return [];
            const { success, response } = await FetchData({
                className: controller,
                method: method,
                methodParams: methodParams,
                classParams: { [searchKey]: search },
            });

            if (success) {
                return ParseToSelectBoxOption(response, valueKey, labelKey, {
                    subLabel: sublabelKey,
                    shouldShowValue: value,
                    activeKeys,
                });
            }

            return [];
        };

        const handleOnSelect = useCallback(
            (option) => {
                onSelect(option);
                CloseAllPopovers();
            },
            [onSelect]
        );

        useImperativeHandle(
            ref,
            () => ({
                toggle: popperRef?.current?.toggle,
                handleOnSelect,
            }),
            [handleOnSelect]
        );

        return (
            <Popover
                className={cn(menuClassName)}
                element={
                    <RenderDropdown
                        value={value}
                        options={[...(options || []), ...tempOptions]}
                        getOptions={getOptions}
                        onSelect={handleOnSelect}
                        isAsync={isAsync && !!controller}
                        placeholder={placeholder}
                        noDataComponent={noDataComponent}
                        renderItem={renderItem}
                        searchDisabled={searchDisabled}
                        isLoading={isLoading}
                        inputSize={inputSize}
                    />
                }
                autoWidth={!disableAutoWidth}
                trigger={trigger}
                offsetY={offsetY}
                offsetX={offsetX}
                ref={popperRef}
                disabled={disabled}
                align={align}
                side={side}
                noAutofocus
            >
                {children || null}
            </Popover>
        );
    }
);

const RenderDropdown = ({
    value,
    options = [],
    isAsync,
    onSelect = () => {},
    getOptions = () => {},
    placeholder,
    noDataComponent,
    renderItem,
    searchDisabled,
    isLoading,
    inputSize,
}: any) => {
    const [search, setSearch] = useState('');
    const [asyncOptions, setAsyncOptions] = useState<SelectBoxOption[]>([]);
    const [loading, setLoading] = useState(false);

    useUpdateEffect(() => {
        if (IsUndefined(isLoading)) return;
        setLoading(isLoading);
    }, [isLoading]);

    const filteredOptions = useMemo(() => {
        if (isAsync && IsValidString(search)) {
            return asyncOptions;
        }
        if (IsValidString(search) && !IsEmptyArray(options)) {
            return options.filter((option: SelectBoxOption) => {
                return option.label
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        }
        return options;
    }, [asyncOptions, isAsync, options, search]);

    const handleSearch = (input) => {
        setSearch(input);

        if (isAsync) {
            setLoading(true);
            const next = () => setLoading(false);

            const loadOption = () => {
                getOptions(input, (items: SelectBoxOption[]) => {
                    setAsyncOptions(items);
                    next();
                });
            };

            Debounce(loadOption, 200)();
        }
    };

    return (
        <div className='col-flex gap-2 p-2 max-h-[394px] w-full'>
            {!searchDisabled && (
                <InputField
                    value={search}
                    autoFocus
                    addonEnd={
                        isAsync &&
                        loading && (
                            <div className='!text-primary'>
                                <Loading size='sm' />
                            </div>
                        )
                    }
                    groupClassName='min-w-0'
                    onChange={handleSearch}
                    placeholder={placeholder || 'Search'}
                    size={inputSize}
                />
            )}
            <div className='gap-2 overflow-y-auto col-flex'>
                {filteredOptions.map(
                    (option: SelectBoxOption, index: number) => {
                        if (renderItem) {
                            return (
                                <Fragment key={index}>
                                    {renderItem(value, option, onSelect)}
                                </Fragment>
                            );
                        }
                        return (
                            <DropdownItem
                                key={index}
                                {...{ value, option, onSelect }}
                            />
                        );
                    }
                )}

                {IsEmptyArray(filteredOptions) &&
                    (!noDataComponent || loading) && (
                        <div className='py-2 text-sm text-center text-base-tertiary'>
                            {!loading ? 'No Options' : 'Loading...'}
                        </div>
                    )}
                {IsEmptyArray(filteredOptions) &&
                    !loading &&
                    noDataComponent && (
                        <div className='py-2'>
                            {noDataComponent({ search })}
                        </div>
                    )}
            </div>
        </div>
    );
};

export const DropdownItem = ({ value, option, onSelect }: any) => {
    const { isArc } = useApp();

    return (
        <div
            className={cn('col-flex cursor-pointer py-3 px-4 rounded', {
                'bg-base-100 hover:bg-base-200': value !== option.value,
                'bg-secondary text-secondary-content': value == option.value,
                'bg-polaris-bg-surface-tertiary text-polaris-text':
                    isArc && value == option.value,
            })}
            onClick={() => onSelect(option)}
        >
            <div className='text-sm font-medium'>{option.label}</div>
            {option.subLabel && (
                <div
                    className={cn('text-xs text-base-tertiary', {
                        '!text-secondary-content': value == option.value,
                        '!text-polaris-text-secondary':
                            isArc && value == option.value,
                    })}
                >
                    {option.subLabel}{' '}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
