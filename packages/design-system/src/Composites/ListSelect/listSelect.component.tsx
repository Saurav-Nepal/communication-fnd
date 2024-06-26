import React, {
    forwardRef,
    Fragment,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import {
    Debounce,
    FetchData,
    GENERIC_LIST_SELECT_REFETCH,
    IsEmptyArray,
    IsFunction,
    IsUndefined,
    IsValidString,
    ObjectDto,
    ParseToSelectBoxOption,
    SelectBoxOption,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@finnoto/core';

import { Loading } from '../../Components/Data-display/Loading/loading.component';
import { InlineModal } from '../../Components/Dialogs/InlineModal/inlineModal.component';
import { InputField } from '../../Components/Inputs/InputField/input.component';
import { cn } from '../../Utils/common.ui.utils';

export interface ListSelectProps {
    value?: string;
    name?: string;
    options?: SelectBoxOption[];
    disabled?: boolean;
    children: React.ReactElement;
    isAsync?: boolean;
    controller?: any;
    method?: string;
    methodParams?: any;
    searchKey?: string;
    valueKey?: string;
    labelKey?: string;
    sublabelKey?: string | ((item: ObjectDto) => any);
    minLength?: number;
    placeholder?: string;
    onSelect?: (option?: SelectBoxOption, index?: number) => void;
    renderItem?: (
        value: any,
        option: SelectBoxOption,
        onSelect: (option: SelectBoxOption) => void
    ) => React.ReactNode;
    onOptionLoad?: (options: SelectBoxOption[]) => void;
    prefixItem?: (item: ObjectDto) => ReactNode;
    noDataComponent?: (params: { search: string }) => void;
    searchDisabled?: boolean;
    searchByValue?: boolean;
    isLoading?: boolean;
    fullScreen?: boolean;
    filterClassParams?: any;
    closeIcon?: boolean;
    listClassName?: string;
    messageComponent?: React.ReactNode;
    autoSelectZeroth?: boolean;
    ignoreValues?: number[];
    ignoreKey?: string;
    activeKeys?: string[];
    label?: string;
    subLabelSearchEnabled?: boolean; //\
    refetchEnabled?: boolean;
    footerClick?(): void;
    footer?: string | ReactNode;
    className?: string;
}

export const ListSelect = forwardRef(
    (
        {
            name,
            value,
            options,
            children,
            disabled,
            onSelect = () => {},
            isAsync,
            controller,
            method = 'find',
            methodParams,
            minLength,
            searchKey = 'str',
            valueKey = 'id',
            labelKey = 'name',
            sublabelKey,
            placeholder,
            onOptionLoad = () => {},
            noDataComponent,
            renderItem,
            searchDisabled = false,
            isLoading,
            fullScreen,
            filterClassParams = {},
            closeIcon,
            listClassName,
            prefixItem,
            autoSelectZeroth,
            ignoreKey,
            ignoreValues,
            refetchEnabled,
            label,
            subLabelSearchEnabled,
            footer,
            footerClick,
            className,
            activeKeys,
        }: ListSelectProps,
        ref
    ) => {
        const modalRef = useRef(null);
        const [tempOptions, setTempOptions] = useState([]);

        const initRefetch = useCallback(() => {
            loadContent('').then((options) => {
                setTempOptions(options);
                onOptionLoad(options);
                if (!value && autoSelectZeroth && !IsEmptyArray(options))
                    onSelect(options[0]);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [autoSelectZeroth, onOptionLoad, onSelect, value]);

        useEffectOnce(() => {
            if (!refetchEnabled) return;
            SubscribeToEvent({
                eventName: GENERIC_LIST_SELECT_REFETCH,
                callback: initRefetch,
            });
            return () => {
                UnsubscribeEvent({
                    eventName: GENERIC_LIST_SELECT_REFETCH,
                    callback: initRefetch,
                });
            };
        });
        useEffect(() => {
            if (isAsync && !minLength && !disabled && IsEmptyArray(options)) {
                loadContent('').then((options) => {
                    setTempOptions(options);
                    onOptionLoad(options);
                    if (!value && autoSelectZeroth && !IsEmptyArray(options))
                        onSelect(options[0]);
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
                classParams: { [searchKey]: search, ...filterClassParams },
            });

            if (!success) return [];

            let filteredItems = [...response];

            if (!IsEmptyArray(ignoreValues)) {
                filteredItems = response.filter((item) => {
                    if (item[valueKey] === value) return true;
                    return !ignoreValues.includes(item[ignoreKey || valueKey]);
                });
            }

            return ParseToSelectBoxOption(filteredItems, valueKey, labelKey, {
                subLabel: sublabelKey,
                prefixItem,
                shouldShowValue: value,
                activeKeys,
            });
        };

        const handleOnSelect = useCallback(
            (option, index: number) => {
                onSelect(option, index);
                modalRef?.current?.toggleOpen(false);
            },
            [onSelect]
        );

        useImperativeHandle(
            ref,
            () => ({
                toggle: modalRef?.current?.toggleOpen,
                handleOnSelect,
            }),
            [handleOnSelect]
        );

        return (
            <InlineModal
                ref={modalRef}
                title={label || name}
                className={fullScreen ? className : undefined}
                size={fullScreen ? 'full' : undefined}
                disabled={disabled}
                closeIcon={closeIcon}
                component={() => (
                    <RenderListSelect
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
                        fullScreen={fullScreen}
                        listClassName={listClassName}
                        subLabelSearchEnabled={subLabelSearchEnabled}
                        {...{ footer, footerClick }}
                    />
                )}
            >
                {children || null}
            </InlineModal>
        );
    }
);

const RenderListSelect = ({
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
    fullScreen,
    listClassName,
    subLabelSearchEnabled,
    footerClick,
    footer,
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
                return (
                    option.label.toLowerCase().includes(search.toLowerCase()) ||
                    (subLabelSearchEnabled &&
                        option?.subLabel
                            ?.toLowerCase()
                            .includes(search.toLowerCase()))
                );
            });
        }
        return options;
    }, [asyncOptions, isAsync, options, search, subLabelSearchEnabled]);

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

    const renderFooter = useCallback(() => {
        if (!footer) return null;
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (IsFunction(footerClick)) footerClick();
                }}
                className='justify-center px-4 py-3 text-center border-t rounded text-info hover:bg-base-300/50 bg-base-100 row-flex'
            >
                {footer}
            </div>
        );
    }, [footer, footerClick]);

    return (
        <div
            className={cn(
                'col-flex bg-base-200 h-full w-full overflow-y-auto',
                {
                    'max-h-[70vh] sm:min-h-0 sm:max-h-full': !fullScreen,
                }
            )}
        >
            {!searchDisabled && (
                <div className='p-3'>
                    <InputField
                        value={search}
                        addonEnd={
                            isAsync &&
                            loading && (
                                <div className='!text-primary'>
                                    <Loading size='sm' />
                                </div>
                            )
                        }
                        name='select_search'
                        type='text'
                        onChange={handleSearch}
                        placeholder={placeholder || 'Search'}
                    />
                </div>
            )}
            <div
                className={cn(
                    'flex-1 gap-2 overflow-y-auto col-flex px-3 pb-3',
                    { 'pt-3': searchDisabled },
                    listClassName
                )}
            >
                {filteredOptions.map(
                    (option: SelectBoxOption, index: number) => {
                        if (renderItem) {
                            return (
                                <Fragment key={index}>
                                    {renderItem(value, option, (option) =>
                                        onSelect(option, index)
                                    )}
                                </Fragment>
                            );
                        }
                        return (
                            <ListSelectItem
                                key={index}
                                {...{
                                    value,
                                    option,
                                    onSelect: (option) =>
                                        onSelect(option, index),
                                }}
                            />
                        );
                    }
                )}

                {IsEmptyArray(filteredOptions) &&
                    (!noDataComponent || loading) && (
                        <div className='flex-1 py-2 text-sm text-center text-base-tertiary'>
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
            {renderFooter()}
        </div>
    );
};

export const ListSelectItem = ({
    option,
    value,
    onSelect = () => {},
    isActiveDefault,
}: {
    option: SelectBoxOption;
    value?: any;
    onSelect?: (_: SelectBoxOption) => void;
    isActiveDefault?: boolean; // this flag for only mobile date range picker list
}) => {
    if (!option.value) return null;

    return (
        <div
            className={cn(
                'px-4 py-3 hover:bg-base-300/50 rounded bg-base-100 row-flex',
                {
                    'bg-primary !text-primary-content':
                        isActiveDefault || value === option.value,
                }
            )}
            onClick={() => onSelect(option)}
        >
            {option.prefix ?? null}
            <div className='col-flex'>
                <div className='text-sm '>{option.label}</div>
                {option.subLabel && (
                    <div className='text-xs'>{option.subLabel} </div>
                )}
            </div>
        </div>
    );
};
