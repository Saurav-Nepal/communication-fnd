import { isDate } from 'date-fns';
import { Fragment, ReactNode, useCallback, useMemo } from 'react';
import { formatQuery, RuleGroupTypeAny } from 'react-querybuilder';

import {
    AccessNestedObject,
    EmptyFunction,
    FormatCurrency,
    GetDateValue,
    getMonthsInYear,
    GetObjectFromArray,
    IsEmptyObject,
    IsFunction,
    ObjectDto,
    RemoveEmptyObjectKeys,
    RESTRICTED_FILTERS,
} from '@finnoto/core';

import { cn } from '../../../../../Utils/common.ui.utils';
import { useFilterContext } from '../../provider';
import { ListFormFilterProps } from '../list-filter-form';
import { BooleanFilterItem } from './components/boolean.filteritem';
import { CommonFilterItem } from './components/commonFilterItem';
import { DateRangeFilterItem } from './components/date.range.filter.item';
import { DateFilterListItem } from './components/dateFilterListItem';
import { FilterItemWrapper } from './components/filterItem.wrapper';
import { FilterQueryItem } from './components/filterQueryItem';
import { MultiSelectFilterItem } from './components/multiSelectFilterItem';
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

const FILTER_BUTTON_CLASSES = 'items-center px-2 border-base-300';

export const ArcFilterListDisplay = ({
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
    const { [RESTRICTED_FILTERS]: restricted_filters } = queryString || {};

    const filterData = RemoveEmptyObjectKeys({
        ...data,
        page: undefined,
        limit: undefined,
        filter_query: filterQuery || undefined,
        ...removeFilterKey,
    });

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
                !['order', 'search', 'filter_query', 'filter'].includes(key) &&
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
                        className={FILTER_BUTTON_CLASSES}
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
                    className={FILTER_BUTTON_CLASSES}
                    key={key}
                    onClick={() => {
                        removeFilterData(key);
                    }}
                    showCrossIcon
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
        <div className={cn(`row-flex justify-between rounded`, className)}>
            <div className='flex-wrap rounded-sm row-flex text-base-primary'>
                {!onlyDisplayQueryFilter && (
                    <>
                        {filterData?.search && (
                            <FilterItemWrapper
                                className={FILTER_BUTTON_CLASSES}
                                onClick={() => {
                                    removeFilterData('search');
                                }}
                                showCrossIcon
                            >
                                <span>Search {'> '}</span> {filterData?.search}
                            </FilterItemWrapper>
                        )}
                        {filterData?.order && (
                            <FilterItemWrapper
                                className={FILTER_BUTTON_CLASSES}
                                onClick={() => {
                                    removeFilterData('order');
                                }}
                                showCrossIcon
                            >
                                <span>Sort by {'> '}</span>
                                {Object.keys(filterData?.order)[0]}
                                {', '}
                                {Object.values(filterData?.order)[0]}
                            </FilterItemWrapper>
                        )}
                        {innerFilters?.map((filter) => (
                            <Fragment key={`${filter?.key}${filter?.title}`}>
                                {renderFilterDisplay(
                                    filterData,
                                    filter,
                                    removeFilterData
                                )}
                            </Fragment>
                        ))}
                        {renderOthersFilters()}
                    </>
                )}

                <FilterQueryItem
                    className={FILTER_BUTTON_CLASSES}
                    {...{
                        filter_query: filterQuery,
                        removeFilterData: removeQueryFilter,
                        isDeletable: isDeletableQuery !== false,
                    }}
                    showCrossIcon
                />
            </div>

            {children
                ? children({ data, listFilters, removeFilterData })
                : null}
        </div>
    );
};

export const renderFilterDisplay = (
    filterData: ObjectDto,
    filter: ListFormFilterProps,
    removeFilterData = (key: string) => {}
) => {
    const newData: any = AccessNestedObject(filterData, filter?.key);

    if (filter.isDefinitionQueryFilter) {
        const query: RuleGroupTypeAny = {
            rules: [
                {
                    field: filter?.title,
                    operator: (filter as any).selectedOperator,
                    value: newData,
                },
            ],
        };

        const queryString = formatQuery(query, 'spel');
        const invalidQueryString = queryString === '1 == 1';

        return (
            <CommonFilterItem
                className={FILTER_BUTTON_CLASSES}
                key={filter?.key}
                title={filter?.title}
                value={!invalidQueryString ? queryString : filter?.title}
                filter={filter}
                removeFilterData={removeFilterData}
                isClearable={!filter.disableClear}
                withoutTitleAndOperator={!invalidQueryString}
            />
        );
    }

    switch (filter.type as string) {
        case 'date_range':
            return (
                <DateRangeFilterItem
                    className={FILTER_BUTTON_CLASSES}
                    {...filter}
                    value={newData}
                    removeFilterData={() => {
                        removeFilterData(filter?.key || 'date');
                    }}
                    key={filter?.key}
                />
            );

        case 'amount_range':
            if (
                IsEmptyObject(newData?.range) &&
                !filter.isDefinitionQueryFilter
            )
                return null;
            return (
                <RangeFilterItem
                    className={FILTER_BUTTON_CLASSES}
                    min={FormatCurrency({
                        amount: newData?.range?.min,
                    })}
                    max={FormatCurrency({
                        amount: newData?.range?.max,
                    })}
                    {...filter}
                    removeFilterData={() => {
                        removeFilterData(filter.key);
                    }}
                    isClearable={!filter.disableClear}
                    title={filter?.title}
                    key={filter?.key}
                />
            );

        case 'multi_select':
            if (!newData) return;
            return (
                <MultiSelectFilterItem
                    className={FILTER_BUTTON_CLASSES}
                    {...{ data: newData, removeFilterData }}
                    filter={filter}
                    key={filter?.key}
                />
            );

        case 'select':
            if (!newData) return;
            return (
                <SelectFilterItem
                    className={FILTER_BUTTON_CLASSES}
                    {...{ data: newData, removeFilterData, filter }}
                    key={filter?.key}
                />
            );

        case 'month_filter':
            return (
                <MonthFilterItem
                    className={FILTER_BUTTON_CLASSES}
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
                    className={FILTER_BUTTON_CLASSES}
                    {...{
                        filter: filter as any,
                        value: newData,
                        removeFilterData,
                    }}
                />
            );

        case 'date':
            return (
                <DateFilterListItem
                    className={FILTER_BUTTON_CLASSES}
                    {...{
                        ...filter,
                        data: newData,
                        removeFilterData: () => removeFilterData(filter?.key),
                    }}
                    isClearable={!filter?.disableClear}
                />
            );

        default:
            return (
                <CommonFilterItem
                    className={FILTER_BUTTON_CLASSES}
                    key={filter?.key}
                    title={filter?.title}
                    value={newData}
                    filter={filter}
                    removeFilterData={removeFilterData}
                    isClearable={!filter.disableClear}
                />
            );
    }
};

const MonthFilterItem = ({ className, data, filter, onClick }: any) => {
    if (!data && !filter?.defaultValue) return null;
    const date = GetDateValue(`${data || filter?.defaultValue}`, 'yyyyMM');
    if (!isDate(date)) return null;
    const month = getMonthsInYear()[date?.getMonth()];
    const year = date.getFullYear();
    return (
        <FilterItemWrapper
            onClick={onClick}
            isClearable={!filter.disableClear}
            {...{ filter, className }}
        >
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
