//make date range picker which can take value both date and time format

import { endOfDay, startOfDay } from 'date-fns';
import { useCallback } from 'react';

import {
    API_DATE_TIME_FORMAT,
    APIDateFormat,
    IsEmptyObject,
    ObjectDto,
} from '@finnoto/core';

import { cn, IsObject } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { DatePicker } from '../DatePicker';
import {
    dateRangeFilterType,
    DateRangePickerInterface,
} from './dateRangeFilter.types';
import { DateRangeFilterUtils } from './dateRangeFilter.utils';

import { CalendarSvgIcon } from 'assets';

export const DateRangeFilterPicker = ({
    format: dateTimeFormat = API_DATE_TIME_FORMAT,
    value: valueProps,
    onChange,
    className,
    offsetY,
}: DateRangePickerInterface) => {
    const renderDisplayValue = useCallback(() => {
        const dateValue =
            DateRangeFilterUtils.getUtcDisplayDateRange(valueProps);
        let displayValue;
        if (!dateValue) {
            return (
                <div
                    className={cn(
                        'px-2 border rounded h-[32px] items-center flex  cursor-pointer bg-base-100 ',
                        className
                    )}
                >
                    <div className='flex-1 text-sm text-base-secondary'>
                        Select Date
                    </div>
                    <Icon
                        source={CalendarSvgIcon}
                        className={'text-primary'}
                        size={20}
                        isSvg
                    />
                </div>
            );
        }
        if (IsObject(dateValue)) {
            const { min, max } = (dateValue as ObjectDto) || {};
            displayValue = (
                <>
                    {min}
                    <span className='px-2 font-normal text-base-tertiary'>
                        to
                    </span>
                    {max}
                </>
            );
        } else displayValue = dateValue;
        return (
            <div
                className={cn(
                    'border border-base-300 rounded cursor-pointer select-none row-flex bg-base-100 h-[32px]',
                    className
                )}
            >
                <div className='flex items-center flex-1 px-4 text-sm text-base-primary whitespace-nowrap h-[32px]'>
                    {displayValue}
                </div>

                <div className='px-2 my-auto border-l h-[32px] flex items-center'>
                    <Icon
                        source={CalendarSvgIcon}
                        className={'text-primary'}
                        size={16}
                        isSvg
                    />
                </div>
            </div>
        );
    }, [className, valueProps]);

    return (
        <DatePicker
            rangeSelector
            withRangeSelect
            value={DateRangeFilterUtils.absoluteValue(valueProps)}
            offsetY={offsetY || -38}
            onRangeSelect={(data) => {
                const range = { ...data };
                if (IsEmptyObject(range)) {
                    return onChange(undefined);
                }
                if (range?.valueKey && range?.name) {
                    const newData = {
                        [range?.valueKey]: true,
                    };

                    return onChange(newData);
                }
                const startDate = startOfDay(range?.startDate);
                const endDate = endOfDay(range?.endDate);
                const dateRange: dateRangeFilterType = {
                    min: APIDateFormat({
                        date: startDate,
                        format: dateTimeFormat,
                    }),
                    max: APIDateFormat({
                        date: endDate,
                        format: dateTimeFormat,
                    }),
                };

                onChange({ range: dateRange });
            }}
        >
            {renderDisplayValue()}
        </DatePicker>
    );
};
