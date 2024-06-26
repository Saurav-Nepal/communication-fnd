import { useCallback, useEffect, useMemo } from 'react';
import { useList } from 'react-use';

import {
    EmptyFunction,
    IsEmptyArray,
    IsEmptyObject,
    IsObject,
    IsUndefinedOrNull,
    ObjectDto,
    ParseToSelectBoxOption,
} from '@finnoto/core';

import { IconButton, SelectBox } from '../../../../../Components';
import { cn } from '../../../../../Utils/common.ui.utils';
import { getListFormFormElement } from './getListFilterFormElement';
import { generateSlug } from './list.filter.form';
import { useListFormFilterContext } from './provider/list.form.filter.provider';

import { DeleteSvgIcon } from 'assets';

export const AdvanceAddableFilterList = () => {
    const { listFilters, onClear, getValues } = useListFormFilterContext();

    const [selectedFilters, { push, updateAt, removeAt }] = useList(
        defaultSelectedFilters(getValues, listFilters)
    );

    const handleAddNewFilter = useCallback(() => {
        push({
            slug: generateSlug(6),
        });
    }, [push]);

    useEffect(() => {
        if (!selectedFilters?.length) {
            handleAddNewFilter();
        }
    }, [handleAddNewFilter, selectedFilters?.length]);

    const filterListFilters = useMemo(() => {
        return listFilters?.filter((filter: any) => {
            return selectedFilters?.every((selectedFilter: any) => {
                return (
                    selectedFilter?.filter?.key !== filter?.key &&
                    filter?.type !== 'customize_group'
                );
            });
        });
    }, [listFilters, selectedFilters]);
    const handleClear = useCallback(
        (filter) => {
            if (!filter) return;
            switch (filter?.type) {
                case 'checkbox_group':
                    if (filter?.parentKey) {
                        return onClear(filter?.parentKey);
                    }
                    return onClear(filter?.groups?.map((group) => group.key));
                case 'date':
                case 'select':
                    if (!IsEmptyArray(filter?.groups))
                        onClear(filter?.groups?.map((group) => group?.key));
                    else onClear(filter?.key);
                    return;
                default:
                    return onClear(filter?.key);
            }
        },
        [onClear]
    );

    const isValuePresentInFilter = useCallback(
        (filter: ObjectDto) => {
            if (!filter) return false;

            const hasValue = (value: any) => {
                if (IsUndefinedOrNull(value)) return false;
                if (Array.isArray(value)) return !!value?.length;
                if (IsObject(value)) return !IsEmptyObject(value);
                if (typeof value === 'boolean') return true;
                return !!value;
            };
            if (filter?.groups)
                return filter?.groups?.some((group: any) =>
                    hasValue(getValues(group?.key))
                );

            return hasValue(getValues(filter?.key));
        },
        [getValues]
    );

    return (
        <div className='gap-4 p-4 py-6 col-flex bg-base-100'>
            <div className='gap-3 col-flex'>
                {selectedFilters.map((filter: any, index) => {
                    return (
                        <AdvanceAddableFilterListItem
                            {...{
                                listFilters: [
                                    filter?.filter ? filter?.filter : undefined,
                                    ...filterListFilters,
                                ].filter(Boolean),
                                handleSelectFilter: (data) => {
                                    updateAt(index, {
                                        ...filter,
                                        filter: data,
                                    });
                                },
                            }}
                            index={index}
                            filter={filter?.filter}
                            isAnyFilterApplied={isValuePresentInFilter(
                                filter?.filter
                            )}
                            key={filter?.slug}
                            onRemove={() => {
                                removeAt(index);
                                handleClear(filter?.filter);
                            }}
                        />
                    );
                })}
            </div>
            {filterListFilters?.length > 0 && (
                <div
                    className={cn('flex gap-3 items-center w-fit', {
                        'cursor-not-allowed': !filterListFilters?.length,
                        'cursor-pointer': filterListFilters?.length,
                    })}
                    onClick={() => {
                        if (filterListFilters?.length) handleAddNewFilter();
                    }}
                >
                    <span className='text-sm text-primary'>+ Add More</span>
                </div>
            )}
        </div>
    );
};

const AdvanceAddableFilterListItem = ({
    listFilters = [],
    filter,
    handleSelectFilter = EmptyFunction,
    onRemove,
    isAnyFilterApplied,
    index,
}: any) => {
    const hasDeleteButtonShow = useMemo(() => {
        if (index === 0 && !isAnyFilterApplied) return false;
        return filter?.isClearable !== false;
    }, [filter?.isClearable, index, isAnyFilterApplied]);
    return (
        <div
            className={cn(
                'items-center w-full gap-2  row-flex  column-filter-item'
            )}
        >
            <div className='items-stretch flex-1 gap-3 row-flex'>
                <SelectBox
                    value={filter?.key}
                    options={ParseToSelectBoxOption(
                        listFilters.filter(
                            (el) =>
                                el?.type !== 'customize_group' &&
                                el?.isVisible !== false &&
                                el?.isOuterFilter !== true
                        ),
                        'key',
                        'title',
                        {
                            disallowGrouping: true,
                        }
                    )}
                    mainClassName='min-w-[200px] column-filter-select '
                    onChange={(option) => handleSelectFilter(option?.data)}
                    isSearchable
                    isDisabled={isAnyFilterApplied}
                    size='sm'
                />
                {filter && getListFormFormElement(filter)}
                {!filter && (
                    <div className='h-[32px] flex-1 border px-4 text-sm text-base-secondary flex items-center rounded '>
                        All
                    </div>
                )}
            </div>
            {hasDeleteButtonShow && (
                <IconButton
                    outline
                    size='sm'
                    icon={DeleteSvgIcon}
                    appearance='error'
                    onClick={onRemove}
                />
            )}
        </div>
    );
};

const defaultSelectedFilters = (
    getValues: (str: string | string[]) => any,
    listFilters: ObjectDto[]
) => {
    const newFilters = [];
    const filterList: any = listFilters?.filter((filter) => {
        return (
            filter?.type !== 'customize_group' && filter?.isVisible !== false
        );
    });
    for (const filter of filterList) {
        if (!IsUndefinedOrNull(getValues(filter?.key))) {
            newFilters.push({
                filter,
                slug: generateSlug(6),
            });
        } else if (
            !IsEmptyArray(filter?.groups) &&
            filter?.groups?.some(
                (filter) => !IsUndefinedOrNull(getValues(filter?.key))
            )
        )
            newFilters.push({
                filter,
                slug: generateSlug(6),
            });
    }
    return newFilters;
};
