import { useMemo } from 'react';

import { IsUndefinedOrNull } from '@finnoto/core';

import { Avatar, Badge, Loading } from '../../Components';
import { cn } from '../../Utils/common.ui.utils';
import { FormatCurrencyStyled } from '../../Utils/component.utils';
import { headingSizes, IDashboardCardProps } from './dashboardCard.types';

const cardIconBg = 'bg-[#E5FFFD]';
const cardIconColor = 'text-[#4FD1C5]';

const PolarisDashboardCardV1 = (props: IDashboardCardProps) => {
    const {
        heading,
        customRightComponent,
        title,
        changeValue,
        customBottomComponent,
        onClick,
        loading,
    } = props;
    const { size: headingSize = 'lg' } = heading;

    const isIncrease = useMemo(() => {
        if (!changeValue || changeValue?.value === 0) return null;
        return changeValue.value > 0;
    }, [changeValue]);

    return (
        <div
            className='w-full h-full gap-3 p-4 transition-all border rounded-lg cursor-pointer col-flex bg-polaris-bg-surface hover:bg-polaris-bg-surface-hover hover:shadow-polaris-shadow-400 border-polaris-border'
            onClick={onClick}
        >
            {loading ? (
                <div className='w-full h-full centralize'>
                    <Loading color='primary' size='md' />
                </div>
            ) : (
                <>
                    <div className='flex justify-between w-full'>
                        <div className='col-flex gap-0.5'>
                            <p className='text-xs font-medium text-polaris-text-secondary'>
                                {title}
                            </p>
                            <div className='flex flex-wrap items-center'>
                                <h2 className='mr-2 font-medium'>
                                    {heading.type === 'currency' ? (
                                        FormatCurrencyStyled({
                                            amount: heading.value as number,
                                            size: 'lg',
                                            className:
                                                headingSizes[headingSize],
                                        })
                                    ) : (
                                        <span
                                            className={
                                                headingSizes[headingSize]
                                            }
                                        >
                                            {heading.value}
                                        </span>
                                    )}
                                </h2>
                                {changeValue && (
                                    <div className='flex items-center gap-1'>
                                        <span
                                            className={cn(
                                                'percentage font-medium',
                                                {
                                                    'text-success': isIncrease,
                                                    'text-error': !isIncrease,
                                                }
                                            )}
                                        >
                                            {!IsUndefinedOrNull(isIncrease)
                                                ? isIncrease
                                                    ? '+'
                                                    : '-'
                                                : ''}
                                            {Math.abs(changeValue.value)}
                                            {changeValue.suffix}
                                        </span>
                                        <span className='text-xs text-polaris-text-secondary'>
                                            {changeValue.text}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            {/* {icon ? (
                                <Avatar
                                    icon={icon.source}
                                    iconSize={20}
                                    size='44'
                                    imageWrapperClassName={`rounded-lg ${
                                        icon.background || cardIconBg
                                    }`}
                                    iconColorClass={icon.color || cardIconColor}
                                />
                            ) : (
                                customRightComponent
                            )} */}
                        </div>
                    </div>
                    {customBottomComponent ? (
                        <div>{customBottomComponent}</div>
                    ) : (
                        <div className='flex gap-2'>
                            {props.badges?.map((badge, index) => (
                                <Badge
                                    key={index}
                                    appearance={
                                        badge.appearance || 'polaris-gray'
                                    }
                                    label={badge.label || ''}
                                    size={badge.size || 'sm'}
                                    lefticon={badge.icon}
                                    leftIconColor={
                                        badge.iconColor ||
                                        'text-polaris-icon-secondary'
                                    }
                                    className='gap-1'
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PolarisDashboardCardV1;
