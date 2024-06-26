import { SearchIcon } from 'lucide-react';
import React from 'react';
import { useUpdateEffect } from 'react-use';

import { Debounce, EmptyFunction, useUncontrolled } from '@finnoto/core';

import {
    CheckBox,
    InputField,
    MultiSelectInterface,
} from '../../../../../../../Components';

export const MultiFilterSelectionList = ({
    options,
    label,
    isSearchable = true,
    value,
    onChangeFilter = EmptyFunction,
    labelClassName,
    footerClassName,
    containerClassName,
    defaultValue,
    align,
    side,
    isLabelShow,
    isAsync,
    isLoading,
    onAsyncSearch = EmptyFunction,
    onChangeSelectedOptions = EmptyFunction,
    placeholder,
    selectedSuffix,
    selectedClassName,
    isCollision = false,
    displayLimit = 1,
    ...rest
}: MultiSelectInterface) => {
    const [selected, setSelected] = useUncontrolled({
        value: value || [],
        defaultValue: value,
        onChange: onChangeFilter,
    });
    const searchRef = React.useRef<any>(null);

    useUpdateEffect(() => {
        if (!isLoading)
            return Debounce(() => searchRef?.current?.focus(), 100)();
    }, [isLoading]);

    const [search, setSearch] = React.useState<string>('');

    const handleChange = React.useCallback(
        (value: any, is_add: boolean = true) => {
            const newData = is_add
                ? [...(selected || []), value]
                : selected?.filter((el) => el !== value);
            setSelected(newData);
        },
        [selected, setSelected]
    );

    const filterOptions = React.useMemo(() => {
        return [...(options || [])].filter((el) =>
            el?.label?.toLowerCase().includes(search)
        );
    }, [options, search]);

    return (
        <div className='min-w-[200px] col-flex overflow-hidden'>
            {isSearchable && (
                <div className='w-full p-1 pb-0'>
                    <InputField
                        addonEnd={<SearchIcon size={18} />}
                        placeholder={'Search Options'}
                        value={search}
                        onDebounceChange={(value) => {
                            onAsyncSearch(value);
                            setSearch(value);
                        }}
                        isLoading={isLoading}
                        autoFocus
                        ref={searchRef}
                        className={rest?.searchClassName}
                        size='sm'
                        groupClassName='min-w-[100px]'
                    />
                </div>
            )}
            <div className='py-1 overflow-y-auto col-flex max-h-80 scrollbar-xs'>
                {filterOptions.map((option) => {
                    return (
                        <div
                            key={option?.value as any}
                            className='px-2 hover:bg-base-200 '
                        >
                            <CheckBox
                                size='xs'
                                checked={(selected || []).includes(
                                    option?.value
                                )}
                                rightLabel={option?.label}
                                onChange={(is_checked) => {
                                    handleChange(option?.value, is_checked);
                                }}
                                subLabel={option?.subLabel}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
