import { endOfDay, subDays } from 'date-fns';
import { date } from 'joi';
import React, { useMemo } from 'react';

import {
    API_DATE_TIME_FORMAT,
    APIDateFormat,
    FormatDisplayDate,
    GetDateValue,
    useFetchParams,
} from '@finnoto/core';
import {
    cn,
    DateRangeFilterUtils,
    DebugConfigurationButton,
    Icon,
    IsEmptyObject,
    Loading,
    Tooltip,
} from '@finnoto/design-system';

import {
    CalendarStrikedSvgIcon,
    CalendarSvgIcon,
    InfoCircleSvgIcon,
} from 'assets';

interface IDashboardChartWrapperProps {
    title: string;
    titleTooltipDescription?: string;
    children: React.ReactNode;
    showDateHiddenIcon?: boolean;
    titleRightComponent?: React.ReactNode;
    wrapperClassName?: string;
    withBackground?: boolean;
    loading?: boolean;
    slug: string | string[]; // this is always require, if no data then add empty string
    refetchFn: () => void; // this is always require, if no refetchFn then add empty function
    filterDate?: {};
    isConnectToDate?: boolean;
}

export const dashboardWrapperBackgroundClassName =
    'rounded-lg bg-polaris-bg-surface-secondary p-3 h-full';

const DashboardChartWrapper = (props: IDashboardChartWrapperProps) => {
    const { isConnectToDate = false, filterDate } = props;
    const { start_date: sDate, end_date: eDate } = useFetchParams();
    const dateFilter = useMemo(() => {
        const absoluteDate = DateRangeFilterUtils.absoluteValue(filterDate);

        if (!IsEmptyObject(absoluteDate))
            return {
                startDate: APIDateFormat({
                    date: absoluteDate?.startDate,
                    format: API_DATE_TIME_FORMAT,
                }),
                endDate: APIDateFormat({
                    date: endOfDay(absoluteDate?.endDate),
                    format: API_DATE_TIME_FORMAT,
                }),
            };
        if (sDate && eDate)
            return {
                startDate: sDate,
                eDate: eDate,
            };
    }, [filterDate, eDate, sDate]);

    const { startDate = new Date(), endDate = new Date() } = dateFilter || {};

    const date = useMemo(() => {
        if (!isConnectToDate)
            return {
                startDate: '',
                endDate: '',
            };

        return {
            startDate: FormatDisplayDate(
                startDate ? GetDateValue(startDate) : new Date()
            ),
            endDate: FormatDisplayDate(
                endDate ? subDays(GetDateValue(endDate), 1) : new Date()
            ),
        };
    }, [endDate, isConnectToDate, startDate]);

    return (
        <div className='h-full gap-3 p-4 border rounded-lg border-polaris-border col-flex bg-polaris-bg-surface'>
            {!!props?.title && (
                <div className='flex justify-between'>
                    <div className='flex items-center gap-2'>
                        <h2 className='text-base font-semibold'>
                            {props.title}
                        </h2>
                        <Tooltip
                            message={props.titleTooltipDescription}
                            asChild
                        >
                            <div className='cursor-pointer'>
                                <Icon
                                    source={InfoCircleSvgIcon}
                                    isSvg
                                    size={20}
                                    iconColor='text-polaris-icon-secondary'
                                />
                            </div>
                        </Tooltip>
                        {props.showDateHiddenIcon && (
                            <Tooltip
                                message='Independent of time filter'
                                asChild
                            >
                                <div className='cursor-pointer'>
                                    <Icon
                                        source={CalendarStrikedSvgIcon}
                                        isSvg
                                        size={20}
                                        iconColor='text-polaris-icon-secondary'
                                    />
                                </div>
                            </Tooltip>
                        )}
                        {!props.showDateHiddenIcon && props.isConnectToDate && (
                            <Tooltip
                                message={`Restricted between ${date?.startDate} to ${date?.endDate}`}
                                asChild
                            >
                                <div className='cursor-pointer'>
                                    <Icon
                                        source={CalendarSvgIcon}
                                        isSvg
                                        size={18}
                                        iconColor='text-polaris-icon-secondary'
                                    />
                                </div>
                            </Tooltip>
                        )}
                    </div>
                    {props.titleRightComponent}
                </div>
            )}

            <div
                className={cn(
                    'h-full relative',
                    {
                        'rounded-lg bg-polaris-bg-surface-secondary p-3':
                            props.withBackground,
                    },
                    props.wrapperClassName
                )}
            >
                <DebugConfigurationButton
                    slug={props.slug}
                    position='bottomRight'
                    options={{ callback: props.refetchFn }}
                />
                {props.loading ? (
                    <div className='w-full h-full centralize'>
                        <Loading color='primary' size='md' />
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </div>
    );
};

export default DashboardChartWrapper;
