import { isDate } from 'date-fns';
import { Fragment, ReactNode, useCallback, useMemo } from 'react';

import {
    AccessNestedObject,
    EmptyFunction,
    FormatCurrency,
    GetDateValue,
    getMonthsInYear,
    GetObjectFromArray,
    IsEmptyArray,
    IsEmptyObject,
    IsFunction,
    ObjectDto,
    parseJSONString,
    RemoveEmptyObjectKeys,
    RESTRICTED_FILTERS,
} from '@finnoto/core';

import { cn } from '../../../../../Utils/common.ui.utils';
import { useFilterContext } from '../../provider';
import { ListFormFilterProps } from '../list-filter-form';
import { BooleanFilterItem } from './components/boolean.filteritem';
import { DateRangeFilterItem } from './components/date.range.filter.item';
import { DateFilterListItem } from './components/dateFilterListItem';
import { FilterItemWrapper } from './components/filterItem.wrapper';
import { FilterQueryItem } from './components/filterQueryItem';
import {
    MultiObjectSelectFilterItem,
    MultiSelectFilterItem,
} from './components/multiSelectFilterItem';
import { RangeFilterItem } from './components/rangeFilterItem';
import { SelectFilterItem } from './components/selectFilterItem';

type RemoveFilterDataType = (key: string | string[]) => void;
type FilterChildrenTypeProps = {
    data: ObjectDto;
    listFilters: ListFormFilterProps[];
    removeFilterData?: RemoveFilterDataType;
};
type FilterListDisplayProps = {
    className?: string;
    children?: (data: FilterChildrenTypeProps) => ReactNode;
    removeFilterData?: RemoveFilterDataType;
    data: ObjectDto;
    filterQuery?: string;
    removeFilterKey?: ObjectDto;
    listFilters: ListFormFilterProps[];
    removeQueryFilter?: () => void;
    isDeletableQuery?: boolean;
    onlyDisplayQueryFilter?: boolean;
};
export const FilterListDisplay = ({
    className = '',
    children,
    listFilters,
    removeFilterData = EmptyFunction,
    data,
    removeFilterKey = {},
    filterQuery,
    removeQueryFilter,
    isDeletableQuery,
    onlyDisplayQueryFilter,
}: FilterListDisplayProps) => {
    const { queryString } = useFilterContext();

    const { [RESTRICTED_FILTERS]: restricted_filters } = queryString;

    const filterData = RemoveEmptyObjectKeys({
        ...data,
        page: undefined,
        limit: undefined,
        filter_query: filterQuery || undefined,
        ...removeFilterKey,
    });

    const renderFilter = useCallback(
        (filter: ListFormFilterProps) => {
            const newData: any = AccessNestedObject(filterData, filter?.key);
            switch (filter.type) {
                case 'date_range':
                    return (
                        <DateRangeFilterItem
                            {...filter}
                            value={newData}
                            removeFilterData={() => {
                                removeFilterData(filter?.key || 'date');
                            }}
                            key={filter?.key}
                        />
                    );

                case 'amount_range':
                    if (IsEmptyObject(newData?.range)) return null;
                    return (
                        <RangeFilterItem
                            min={FormatCurrency({
                                amount: newData?.range?.min,
                            })}
                            max={FormatCurrency({
                                amount: newData?.range?.max,
                            })}
                            {...filter}
                            title={filter?.title}
                            key={filter?.key}
                        />
                    );

                case 'multi_select':
                    if (IsEmptyArray(newData)) return;
                    return (
                        <MultiSelectFilterItem
                            {...{ data: newData, removeFilterData }}
                            filter={filter}
                            key={filter?.key}
                        />
                    );
                case 'multi_select_object':
                    if (IsEmptyArray(newData)) return;
                    return (
                        <MultiObjectSelectFilterItem
                            {...{ data: newData, removeFilterData }}
                            filter={filter}
                            key={filter?.key}
                        />
                    );

                case 'select':
                    if (!newData) return;
                    return (
                        <SelectFilterItem
                            {...{ data: newData, removeFilterData, filter }}
                            key={filter?.key}
                        />
                    );

                case 'month_filter':
                    return (
                        <MonthFilterItem
                            {...{
                                filter,
                                data: newData,
                                onClick: () => {
                                    removeFilterData(filter?.key);
                                },
                            }}
                        />
                    );
                case 'boolean':
                    return (
                        <BooleanFilterItem
                            {...{
                                filter,
                                value: newData,
                                removeFilterData,
                                className: 'px-2',
                            }}
                        />
                    );

                case 'date':
                    return (
                        <DateFilterListItem
                            {...{
                                title: filter?.title,
                                data: newData,
                                removeFilterData: () =>
                                    removeFilterData(filter?.key),
                            }}
                            isClearable={!filter?.disableClear}
                        />
                    );
            }
        },
        [filterData, removeFilterData]
    );

    const withoutDateFilterData = useMemo(() => {
        const newData = { ...(filterData || {}) };
        return newData;
    }, [filterData]);

    const isFilterAvailable = useMemo(() => {
        if (onlyDisplayQueryFilter && !filterQuery) return false;
        return !IsEmptyObject(withoutDateFilterData);
    }, [filterQuery, onlyDisplayQueryFilter, withoutDateFilterData]);

    const isGroupFilterValueExist = useCallback(
        (key: string) => {
            for (let filter of (listFilters as any) || []) {
                if (filter?.groups) {
                    const groups = filter.groups;
                    if (!IsEmptyObject(GetObjectFromArray(groups, 'key', key)))
                        return true;
                }
            }
        },
        [listFilters]
    );
    // it return extra filters which is not defined in listing table
    const otherFilters = useMemo(() => {
        let newFilter = {};
        for (let [key, value] of Object.entries(withoutDateFilterData)) {
            const isExistFilter = !IsEmptyObject(
                GetObjectFromArray(listFilters, 'key', key)
            );

            if (
                !isExistFilter &&
                !['search', 'filter_query', 'filter'].includes(key) &&
                !isGroupFilterValueExist(key)
            ) {
                newFilter[key] = value;
            }
        }
        return newFilter;
    }, [listFilters, isGroupFilterValueExist, withoutDateFilterData]);

    const renderOthersFilters = useCallback(() => {
        return Object.keys(otherFilters || {}).map((key) => {
            const value = otherFilters[key];
            if (['date'].includes(key)) {
                return (
                    <DateRangeFilterItem
                        removeFilterData={() => {
                            removeFilterData(key);
                        }}
                        title='Date'
                        value={value}
                        key={key}
                    />
                );
            }
            return (
                <FilterItemWrapper
                    key={key}
                    onClick={() => {
                        removeFilterData(key);
                    }}
                >
                    <span>
                        {key} {'> '}
                    </span>
                    {String(value)}
                </FilterItemWrapper>
            );
        });
    }, [otherFilters, removeFilterData]);

    const innerFilters = useMemo(() => {
        return listFilters
            ?.map((filter) => {
                return filter;
            })
            .filter(Boolean);
    }, [listFilters]);

    if (!isFilterAvailable) {
        return <></>;
    }

    return (
        <div
            className={cn(
                `row-flex bg-base-100 border border-base-300/50 justify-between rounded`,
                className
            )}
        >
            <div className='flex-wrap py-1 rounded-sm gap-y-2 row-flex text-base-primary'>
                {!onlyDisplayQueryFilter && (
                    <>
                        {filterData?.search && (
                            <FilterItemWrapper
                                onClick={() => {
                                    removeFilterData('search');
                                }}
                            >
                                <span>Search {'> '}</span>
                                {filterData?.search}
                            </FilterItemWrapper>
                        )}
                        {innerFilters?.map((filter) => (
                            <Fragment key={`${filter?.key}${filter?.title}`}>
                                {renderFilter(filter)}
                            </Fragment>
                        ))}
                        {renderOthersFilters()}
                    </>
                )}

                <FilterQueryItem
                    {...{
                        filter_query: filterQuery,
                        queryString,
                        removeFilterData: removeQueryFilter,
                        isDeletable: isDeletableQuery !== false,
                    }}
                />
            </div>

            {children
                ? children({ data, listFilters, removeFilterData })
                : null}
        </div>
    );
};

const MonthFilterItem = ({ data, filter, onClick }) => {
    if (!data && !filter?.defaultValue) return null;
    const date = GetDateValue(`${data || filter?.defaultValue}`, 'yyyyMM');
    if (!isDate(date)) return null;
    const month = getMonthsInYear()[date?.getMonth()];
    const year = date.getFullYear();
    return (
        <FilterItemWrapper onClick={onClick} {...{ filter }}>
            <span>
                {filter?.title || filter?.name} {'> '}
            </span>
            {month} {year}
        </FilterItemWrapper>
    );
};

const CheckBoxGroupListItem = ({
    filter,
    filterData = {},
    removeFilterData = EmptyFunction,
}: any) => {
    const displayLabel = useMemo(() => {
        const label = `${filter?.title || filter?.name} >`;
        let newData;
        if (filter?.parentKey) {
            newData = filterData[filter.parentKey];
        } else {
            newData = filter.groups
                .map((group) =>
                    filterData[group?.key] ? group?.name : undefined
                )
                .filter(Boolean)
                .join(', ');
        }

        if (!newData) return null;
        if (IsFunction(filter?.renderFilter))
            return `${label} ${filter?.renderFilter(newData)}`;
        return `${label} ${newData}`;
    }, [filter, filterData]);

    if (!displayLabel) return <></>;

    return (
        <FilterItemWrapper
            onClick={() => {
                removeFilterData(
                    filter?.parentKey ||
                        filter?.groups?.map((group) => group.key)
                );
            }}
        >
            {displayLabel}
        </FilterItemWrapper>
    );
};
