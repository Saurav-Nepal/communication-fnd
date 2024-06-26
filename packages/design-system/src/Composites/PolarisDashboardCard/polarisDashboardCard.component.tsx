import { useMemo } from 'react';

import {
    IsEmptyArray,
    IsEmptyObject,
    IsFunction,
    IsUndefined,
    IsUndefinedOrNull,
} from '@finnoto/core';

import {
    Badge,
    getDateRangeDescription,
    Icon,
    Tooltip,
} from '../../Components';
import { BadgeInterface } from '../../Components/Data-display/Badge/badge.types';
import Skeleton from '../../Components/Data-display/Skeleton/skeleton.component';
import { DebugConfigurationButton } from '../../DebugComposites';
import { cn } from '../../Utils/common.ui.utils';
import { FormatCurrencyStyled } from '../../Utils/component.utils';
import { headingSizes, IDashboardCardProps } from './dashboardCard.types';

import { CalendarStrikedSvgIcon, InfoCircleSvgIcon } from 'assets';

const containerClassName =
    'w-full relative h-full gap-3 p-4 transition-all border rounded-lg cursor-pointer col-flex bg-polaris-bg-surface hover:bg-polaris-bg-surface-hover hover:shadow-polaris-shadow-400 border-polaris-border';

const PolarisDashboardCard = (props: IDashboardCardProps) => {
    const {
        heading,
        title,
        changeValue,
        onClick,
        loading,
        badges,
        showDateIcon,
        data,
    } = props;
    const { size: headingSize = 'lg' } = heading;

    const isClickable = useMemo(() => {
        if (IsUndefinedOrNull(data)) return false;
        if (Array.isArray(data) && IsEmptyArray(data)) return false;

        // if the data is object
        if (typeof data === 'object') {
            if (IsEmptyObject(data)) return false; // if it is empty

            const values = Object.values(data).find(
                (data) => !IsUndefinedOrNull(!!data)
            ); // checking if any of the key has valid value

            if (!values) return false;
        }

        if (!IsFunction(onClick)) return false;

        return true;
    }, [data, onClick]);

    if (loading) return <Loader />;

    return (
        <div
            className={cn(containerClassName, {
                'cursor-default hover:!shadow-none hover:bg-polaris-bg-surface':
                    !isClickable,
            })}
            onClick={isClickable ? onClick : () => {}}
        >
            <DebugConfigurationButton
                slug={props.slug}
                position='bottomRight'
                options={{ callback: props.refetchFn }}
            />
            <div className='gap-2 col-flex'>
                <div className='flex items-center justify-between h-6'>
                    <div className='flex items-center gap-2'>
                        <p className='text-xs font-medium text-polaris-text-secondary'>
                            {title}
                        </p>
                        <Tooltip
                            message={props.titleTooltipDescription}
                            asChild
                        >
                            <div className='cursor-pointer'>
                                <Icon
                                    source={InfoCircleSvgIcon}
                                    isSvg
                                    size={16}
                                    iconColor='text-polaris-icon-secondary'
                                />
                            </div>
                        </Tooltip>
                        {showDateIcon && (
                            <Tooltip
                                message='Independent of time filter'
                                asChild
                            >
                                <div className='cursor-pointer'>
                                    <Icon
                                        source={CalendarStrikedSvgIcon}
                                        isSvg
                                        size={16}
                                        iconColor='text-polaris-icon-secondary'
                                    />
                                </div>
                            </Tooltip>
                        )}
                    </div>

                    <div className='flex gap-2'>
                        {badges?.map((badge, index) => {
                            const props: BadgeInterface = {
                                appearance: badge.appearance || 'polaris-gray',
                                label: badge.label || '',
                                size: badge.size || 'sm',
                                lefticon: badge.icon,
                                leftIconColor:
                                    badge.iconColor ||
                                    'text-polaris-icon-secondary',
                                className: 'gap-1',
                            };

                            if (badge.message) {
                                return (
                                    <Tooltip
                                        message={badge.message}
                                        key={index}
                                        asChild
                                    >
                                        <div>
                                            <Badge {...props} />
                                        </div>
                                    </Tooltip>
                                );
                            }
                            return <Badge {...props} key={index} />;
                        })}
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-between'>
                    <h2 className='mr-2 font-medium'>
                        {heading.type === 'currency' ? (
                            FormatCurrencyStyled({
                                amount: heading.value as number,
                                size: 'lg',
                                className: headingSizes[headingSize],
                                textType: heading.textType,
                            })
                        ) : (
                            <span className={headingSizes[headingSize]}>
                                {heading.value}
                            </span>
                        )}
                    </h2>
                    {changeValue && <ChartChangeValue {...changeValue} />}
                </div>
            </div>
        </div>
    );
};

export const ChartChangeValue = ({
    value,
    date,
    inverse,
    suffix,
    text,
    className,
}: IDashboardCardProps['changeValue'] & {
    className?: string;
}) => {
    const changeType = useMemo(() => {
        if (value === 0) return 'neutral';
        return value > 0 ? 'increase' : 'decrease';
    }, [value]);

    const dateDescription = useMemo(
        () => getDateRangeDescription(date),
        [date]
    );

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <span
                className={cn(
                    'percentage font-medium',
                    {
                        'text-success': changeType === 'increase' && !inverse,
                        'text-error': changeType === 'decrease' && !inverse,
                    },
                    {
                        'text-success': changeType === 'decrease' && inverse,
                        'text-error': changeType === 'increase' && inverse,
                    }
                )}
            >
                {changeType === 'increase' && '+'}
                {value}
                {suffix}
                <span className='ml-1 text-xs font-normal text-polaris-text-secondary'>
                    {text}
                </span>
            </span>
            {date && (
                <Tooltip message={dateDescription}>
                    <span className='text-xs cursor-pointer text-polaris-text-secondary'>
                        since last <span className='font-medium'>period</span>
                    </span>
                </Tooltip>
            )}
        </div>
    );
};

const Loader = () => {
    return (
        <div className={containerClassName}>
            <div className='flex justify-between'>
                <Skeleton className='w-1/2 h-6 bg-polaris-bg-surface-secondary-active' />
                <div className='flex gap-2'>
                    <Skeleton className='w-8 h-6 rounded bg-polaris-bg-surface-secondary-active' />
                    <Skeleton className='w-8 h-6 rounded bg-polaris-bg-surface-secondary-active' />
                </div>
            </div>
            <div className='flex justify-between'>
                <Skeleton className='w-1/3 h-6 bg-polaris-bg-surface-secondary-active' />
                <Skeleton className='w-1/4 h-6 bg-polaris-bg-surface-secondary-active' />
            </div>
        </div>
    );
};

export default PolarisDashboardCard;
