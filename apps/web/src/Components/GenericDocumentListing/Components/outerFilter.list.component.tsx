import { format } from 'date-fns';
import { Fragment, useCallback, useMemo } from 'react';

import {
    APIDateFormat,
    BooleanEnum,
    convertToPluralDigit,
    GetDateValue,
    IsEmptyArray,
    IsUndefinedOrNull,
    LISTING_CONTROLLER_ROUTER,
    ObjectDto,
} from '@finnoto/core';
import {
    DateRangeFilterPicker,
    ListFormFilterProps,
    MaskedDatePickerInput,
    MonthYearSelectFilter,
    ReferenceMultiSelectFilter,
    ReferenceSelectBox,
    SelectBox,
} from '@finnoto/design-system';
import { BooleanSelectFilter } from '@finnoto/design-system/src/Components/Inputs/SelectBox/boolean.select.filter';

function insertAtIndex(str, substring, index) {
    const value = Number(str.slice(index));
    const month = convertToPluralDigit(value);

    return str.slice(0, index) + substring + month;
}

const OuterFilterList = ({
    listFilters = [],
    filterData = {},
    handleFilterData,
    showAllFilters,
}: {
    listFilters: ListFormFilterProps[];
    filterData: ObjectDto;
    handleFilterData: (data: ObjectDto) => void;
    showAllFilters?: boolean;
}) => {
    const outerFilters = useMemo(() => {
        if (showAllFilters) return listFilters;

        const filters = [];
        listFilters?.forEach((filter) => {
            if (
                (filter?.type as string) === 'outer_multi_select' ||
                filter?.isOuterFilter
            ) {
                filters.push(filter);
            }
        });
        return filters;
    }, [listFilters, showAllFilters]);

    const renderOuterFilter = useCallback(
        (filter) => {
            if (filter?.type === 'multi_select') {
                return (
                    <ReferenceMultiSelectFilter
                        labelClassName={'text-sm w-full h-[32px]'}
                        value={filterData?.[filter?.key]}
                        onChangeFilter={(value) => {
                            handleFilterData({ [filter?.key]: value });
                        }}
                        placeholder={`Select ${filter?.title || filter?.name}`}
                        controller_type={filter?.controller_type}
                        valueKey={filter?.valueKey ?? 'id'}
                        {...filter}
                    />
                );
            }
            if (filter?.type === 'month_filter') {
                const value = filterData?.[filter?.key];

                return (
                    <MonthYearSelectFilter
                        filter={filter}
                        onChange={(option) => {
                            handleFilterData({ [filter?.key]: option?.value });
                        }}
                        value={value ? Number(value) : null}
                        className='min-w-[200px] h-[32px]'
                        customDisplay={
                            value
                                ? format(
                                      new Date(
                                          insertAtIndex(String(value), '-', 4)
                                      ),
                                      'MMMM yyyy'
                                  )
                                : null
                        }
                    />
                );
            }
            if (filter?.type === 'select') {
                if (filter?.controller_type) {
                    const controller =
                        LISTING_CONTROLLER_ROUTER[filter?.controller_type];

                    return (
                        <ReferenceSelectBox
                            {...filter}
                            controller={controller}
                            value={filterData?.[filter?.key] || null}
                            onChange={(option) =>
                                handleFilterData({
                                    [filter?.key]: option?.value,
                                })
                            }
                            className='w-[230px]'
                            size='sm'
                            placeholder={`Select ${filter?.title} ...`}
                            defaultValue={filterData?.defaultValue || null}
                        />
                    );
                }
                return (
                    <SelectBox
                        {...filter}
                        value={filterData?.[filter?.key] || null}
                        onChange={(option) =>
                            handleFilterData({
                                [filter?.key]: option?.value,
                            })
                        }
                        className='w-[230px]'
                        size='sm'
                        placeholder={`Select ${filter?.title} ...`}
                        defaultValue={filterData?.defaultValue || null}
                    />
                );
            }
            if (filter?.type === 'date_range') {
                const value = filterData?.[filter?.key];

                return (
                    <div className='items-center flex-1 range-filter row-flex'>
                        <DateRangeFilterPicker
                            value={value}
                            onChange={(data) => {
                                handleFilterData({ [filter?.key]: data });
                            }}
                            className='flex-1 h-[32px]'
                            offsetY={1}
                        />
                    </div>
                );
            }
            if (filter?.type === 'date') {
                const value = filterData?.[filter?.key];

                return (
                    <MaskedDatePickerInput
                        value={value ? GetDateValue(value) : undefined}
                        inputAddOnClassName={'w-full'}
                        className='flex-1 single-date-filter'
                        size='sm'
                        hideClear
                        onChange={(value) => {
                            handleFilterData({
                                [filter?.key]: value
                                    ? APIDateFormat({ date: value })
                                    : undefined,
                            });
                        }}
                    />
                );
            }
            if (filter?.type === 'boolean') {
                const value = filterData?.[filter?.key];

                return (
                    <BooleanSelectFilter
                        value={
                            IsUndefinedOrNull(value)
                                ? null
                                : value
                                ? BooleanEnum.TRUE
                                : BooleanEnum.FALSE
                        }
                        onChange={(option) => {
                            handleFilterData({
                                [filter?.key]:
                                    BooleanEnum.TRUE === option?.value,
                            });
                        }}
                        positiveLabel={filter?.positiveLabel}
                        negativeLabel={filter?.negativeLabel}
                        placeholder={`Select ${filter?.title} ...`}
                        mainClassName='flex-1 single-select-filter '
                        size='sm'
                    />
                );
            }
        },
        [filterData, handleFilterData]
    );

    if (IsEmptyArray(outerFilters)) return null;

    return (
        <div className='items-center gap-2 row-flex'>
            {outerFilters?.map((filter) => (
                <Fragment key={filter?.key}>
                    {renderOuterFilter(filter)}
                </Fragment>
            ))}
        </div>
    );
};

export default OuterFilterList;
