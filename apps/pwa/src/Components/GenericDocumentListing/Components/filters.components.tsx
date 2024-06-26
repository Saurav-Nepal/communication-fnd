import {
    DEFAULT_DATE_FORMAT,
    GetDateValue,
    IsEmptyArray,
    IsEmptyObject,
} from '@finnoto/core';
import { Button, Collapse, InputField, Modal } from '@finnoto/design-system';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { MainFilterProp } from '../genericDocumentListing.types';
import DateRangeFilter from './dateRangeFilter';

const Filters = ({
    data,
    filters,
    dateFilter,
    amountFilter,
    name,
    handleFilterData = () => {},
    clearFilterData = () => {},
}: {
    data: any;
    filters?: MainFilterProp[];
    dateFilter?: any | false;
    amountFilter?: any | false;
    name?: string;
    handleFilterData?: any;
    clearFilterData?: any;
}) => {
    const [invoiceDateRange, setInvoiceDateRange] = useState<any>({});
    const [stateData, setStateData] = useState(data || {});

    useEffect(() => {
        const date_range = data && data.date?.range;

        if (!date_range) {
            setInvoiceDateRange({});
        } else {
            setInvoiceDateRange({
                startDate: new Date(date_range?.min) || undefined,
                endDate: new Date(date_range?.max) || undefined,
            });
        }
    }, [data]);

    useEffect(() => {
        const date_filter = data && data[`date`];

        if (invoiceDateRange.startDate && invoiceDateRange.endDate) {
            if (
                !date_filter ||
                GetDateValue(invoiceDateRange.startDate) !==
                    GetDateValue(date_filter.range?.min) ||
                GetDateValue(invoiceDateRange.endDate) !==
                    GetDateValue(date_filter.range?.max)
            ) {
                handleDateFilterChange('range', {
                    min: format(
                        GetDateValue(invoiceDateRange.startDate),
                        DEFAULT_DATE_FORMAT
                    ),
                    max: format(
                        GetDateValue(invoiceDateRange.endDate),
                        DEFAULT_DATE_FORMAT
                    ),
                });

                return;
            }
        }

        if (date_filter) {
            handleDateFilterChange('range', undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceDateRange]);

    const handleAmountChange = (key: string, value: number) => {
        let amount = stateData.amount || {};
        amount = { ...amount, [key]: value };
        setStateData((prev: any) => ({ ...prev, amount }));
    };

    const handleDateFilterChange = (key: string, value: any) => {
        const date_filter = (data && data[`date`]) || {};
        const date = { ...date_filter, [key]: value || undefined };
        setStateData((prev: any) => ({ ...prev, date: date }));
    };

    const handleCheckboxOptionChange = useCallback(
        (filterKey: string, option: string, value: boolean) => {
            let prevOption = stateData[filterKey];
            prevOption = { ...prevOption, [option]: value || undefined };
            setStateData((prev: any) => ({ ...prev, [filterKey]: prevOption }));

            handleFilterData('page', 1);
        },
        [handleFilterData, stateData]
    );
    const applyFilter = () => {
        handleFilterData(stateData);
        Modal.close();
    };
    const clearFilter = () => {
        clearFilterData();
        Modal.close();
    };
    const getFilter = useCallback(
        (filter: MainFilterProp, index: number) => {
            if (filter.type === 'checkbox') {
                if (filter.options && !IsEmptyArray(filter.options)) {
                    return (
                        <Collapse
                            title={filter.name}
                            collapseDisabled
                            key={index}
                        >
                            <div className='flex-wrap gap-3 pt-2 pl-2 row-flex'>
                                {filter.options.map(
                                    (option: any, index: number) => (
                                        <div
                                            className=''
                                            key={index + option.key}
                                        >
                                            <Button
                                                className={`${
                                                    stateData[filter.key] &&
                                                    stateData[filter.key]?.[
                                                        option.key
                                                    ]
                                                        ? ''
                                                        : 'bg-primary-bg text-base-secondary'
                                                }`}
                                                appearance={
                                                    stateData[filter.key] &&
                                                    stateData[filter.key][
                                                        option.key
                                                    ]
                                                        ? 'primary'
                                                        : 'ghost'
                                                }
                                                size='sm'
                                                onClick={() => {
                                                    handleCheckboxOptionChange(
                                                        filter.key,
                                                        option.key,
                                                        stateData?.[
                                                            filter.key
                                                        ]?.[option.key]
                                                            ? !stateData?.[
                                                                  filter.key
                                                              ]?.[option.key]
                                                            : true
                                                    );
                                                }}
                                            >
                                                {option.name}
                                            </Button>
                                        </div>
                                    )
                                )}
                            </div>
                        </Collapse>
                    );
                }

                return (
                    <div className='row-flex' key={index}>
                        <Button
                            className={`${
                                stateData[filter.key]
                                    ? 'bg-secondary focus:bg-secondary'
                                    : 'dark:bg-base-100 text-base-secondary dark:text-color-100'
                            }`}
                            appearance={
                                stateData[filter.key] ? 'accent' : 'ghost'
                            }
                            size='sm'
                            onClick={() => {
                                setStateData((prev: any) => ({
                                    ...prev,
                                    [filter.key]: stateData[filter.key]
                                        ? !stateData[filter.key]
                                        : true || undefined,
                                }));
                            }}
                        >
                            {filter.name}
                        </Button>
                    </div>
                );
            }

            if (filter.type === 'date_range') {
                return (
                    <Collapse title={filter.name} collapseDisabled key={index}>
                        <DateRangeFilter
                            value={stateData[filter.key]?.range}
                            onChange={(range: any) => {
                                setStateData((prev: any) => ({
                                    ...prev,
                                    [filter.key]: {
                                        range: range && {
                                            min: format(
                                                GetDateValue(range.min),
                                                DEFAULT_DATE_FORMAT
                                            ),
                                            max: format(
                                                GetDateValue(range.max),
                                                DEFAULT_DATE_FORMAT
                                            ),
                                        },
                                    },
                                }));
                            }}
                        />
                    </Collapse>
                );
            }

            return null;
        },
        [handleCheckboxOptionChange, stateData]
    );

    return (
        <div
            className={`col-flex bg-base-200 dark:bg-base-300 border-t overflow-x-hidden overflow-y-auto`}
        >
            <div className='w-full gap-6 p-4 pb-8 col-flex'>
                {amountFilter !== false && (
                    <Collapse
                        defaultExpand
                        title={amountFilter?.name || `Invoice Amount (₹)`}
                        hideCollapseIcon
                    >
                        <div className='relative items-center w-full mt-2 row-flex'>
                            <InputField
                                inputClassName='input-ghost-primary  input-number w-full '
                                placeholder='0'
                                type='number'
                                min={1}
                                defaultValue={stateData?.amount?.min || ''}
                                onDebounceChange={(value) =>
                                    handleAmountChange(
                                        'min',
                                        value || undefined
                                    )
                                }
                            />
                            <span className='mx-4'>To</span>
                            <InputField
                                inputClassName='input-ghost-primary input-number w-full'
                                placeholder='0'
                                type='number'
                                min={1}
                                value={stateData?.amount?.max || ''}
                                onDebounceChange={(value) =>
                                    handleAmountChange(
                                        'max',
                                        value || undefined
                                    )
                                }
                            />
                        </div>
                    </Collapse>
                )}

                {filters &&
                    !IsEmptyArray(filters) &&
                    filters.map((filter: any, index: number) => {
                        return getFilter(filter, index);
                    })}
            </div>
            <div className='items-center w-full gap-4 p-2 border-t border-color-100 row-flex bg-base-100'>
                <div
                    className={`grid ${
                        !IsEmptyObject(stateData)
                            ? 'grid-cols-2 '
                            : 'grid-cols-1'
                    } gap-4 w-full `}
                >
                    {!IsEmptyObject(stateData) && (
                        <Button
                            appearance='error'
                            onClick={() => clearFilter()}
                            outline
                        >
                            Clear
                        </Button>
                    )}

                    <Button
                        disabled={IsEmptyObject(stateData)}
                        onClick={applyFilter}
                        progress
                    >
                        Apply Filter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
