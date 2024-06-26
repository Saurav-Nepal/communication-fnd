import { useMemo } from 'react';

import {
    IsArray,
    IsFunction,
    ItemAssignmentStatusEnum,
    ObjectDto,
} from '@finnoto/core';

import { cn, IsEmptyArray } from '../../../Utils/common.ui.utils';
import { Badge } from '../../Data-display/Badge/badge.component';
import { Collapse } from '../../Data-display/Collapse/collapse.component';
import { Ellipsis } from '../../Data-display/Ellipsis/ellipsis.component';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Tooltip } from '../../Data-display/Tooltip/Tooltip.component';
import { Progress } from '../../Feedbacks/Progress/progress.component';
import { IconButton } from '../../Inputs/Icon-Button/iconButton.component';
import { Tab } from '../../Navigation/Tabs/Tab/tab.component';
import { FooterItemProps, ItemCardProps } from './itemCard.types';

import { CrossSvgIcon, VerifiedTickSvgIcon } from 'assets';

const ItemCard = ({
    item,
    title,
    comments,
    description,
    className,
    ellipsis,
    footerItems,
    actions,
    disableAction,
    children,
    tabs,
}: ItemCardProps) => {
    const sanitizedTabs = useMemo(() => {
        return tabs?.filter((tab) => tab?.visible !== false);
    }, [tabs]);

    const hideCollapseIcon = useMemo(() => {
        return IsEmptyArray(sanitizedTabs);
    }, [sanitizedTabs]);

    return (
        <Collapse
            iconClassName='absolute top-[14px] right-[14px]'
            headerClassName={cn('relative', {
                'cursor-default': hideCollapseIcon,
            })}
            className='border rounded hover:shadow-sm border-base-300 '
            hideDefaultTitleStyle
            hideCollapseIcon={hideCollapseIcon}
            title={
                <div
                    className={cn(
                        'flex flex-col py-2 px-3  transition-all gap-2 group ',
                        className
                    )}
                >
                    <div className='flex'>
                        <div className='flex flex-row justify-between flex-1 gap-4'>
                            <div className='flex-1 col-flex '>
                                <p className='text-sm font-medium'>{title}</p>
                                {ellipsis ? (
                                    <Ellipsis
                                        className='text-xs text-base-secondary'
                                        lines={1}
                                        truncateClassName='text-wrap'
                                        withShowMore
                                    >
                                        {description}
                                    </Ellipsis>
                                ) : (
                                    <p className='text-xs text-base-secondary'>
                                        {description}
                                    </p>
                                )}
                            </div>

                            <div
                                className={cn(
                                    'flex items-center justify-end w-[155px] gap-2 h-fit ',
                                    {
                                        'pr-6': !hideCollapseIcon,
                                    }
                                )}
                            >
                                <div className='items-center '>
                                    <ItemStatusActivity
                                        status={item?.status_id}
                                        totalQuantity={item?.quantity}
                                        fullfilledQuantity={
                                            item?.fulfilled_quantity
                                        }
                                    />
                                </div>
                                {!IsEmptyArray(actions) && !disableAction && (
                                    <div className='items-center hidden gap-2 transition-all group-hover:row-flex'>
                                        {actions?.map((action) => (
                                            <IconButton
                                                key={action?.icon}
                                                size='xs'
                                                iconSize={12}
                                                icon={action.icon}
                                                onClick={(_, e) => {
                                                    e.stopPropagation();
                                                    action.onClick(item);
                                                }}
                                                appearance={action.appearance}
                                                outline
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <ItemCardFooter
                        columns={footerItems}
                        data={item}
                        type='medium'
                    />
                    {comments && (
                        <div className='flex flex-row gap-2 '>
                            <span className='text-xs font-medium '>
                                {`Comments`}
                                {`:`}
                            </span>
                            {ellipsis ? (
                                <Ellipsis
                                    className='text-xs text-base-secondary'
                                    lines={1}
                                    truncateClassName='text-wrap'
                                    withShowMore
                                >
                                    {comments}
                                </Ellipsis>
                            ) : (
                                <p className='text-xs text-base-secondary'>
                                    {comments}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            }
        >
            {sanitizedTabs?.length > 0 && <ItemCardTabs tabs={sanitizedTabs} />}
        </Collapse>
    );
};

export default ItemCard;

const ItemCardTabs = ({ tabs }: { tabs: any[] }) => {
    return (
        <div className='px-3 pb-2 border-t border-base-300'>
            <Tab
                active={tabs[0]?.key}
                contentContainerClass='custom-content'
                tabListClassName='px-0'
                tabTriggerClassName='text-xs'
                tabs={tabs}
            />
        </div>
    );
};

const ItemCardFooterTitle = ({
    title,
    className,
}: {
    title: string;
    className?: string;
}) => (
    <span className={cn('flex-1 text-xs text-base-secondary', className)}>
        {title}
    </span>
);

export const ItemCardFooter = ({
    data,
    columns,
    type = 'normal',
}: {
    data: ObjectDto[] | ObjectDto;
    columns: FooterItemProps[];
    type?: 'normal' | 'medium';
}) => {
    const sanitizedItems = useMemo(() => {
        const visibleItems = columns?.filter((item) => item?.visible !== false);
        return {
            first: visibleItems[0],
            center: visibleItems.filter(
                (_, index) => index !== 0 && index !== visibleItems.length - 1
            ),
            end: visibleItems[visibleItems.length - 1],
        };
    }, [columns]);

    const sanitizedData: any = useMemo(() => {
        if (IsArray(data)) return data;
        return [data];
    }, [data]);

    return (
        <div className='items-center justify-between p-2 rounded col-flex bg-primary/5'>
            <div className='flex justify-between w-full'>
                <ItemCardFooterFirst>
                    <ItemCardFooterTitle
                        key={sanitizedItems?.first?.title}
                        title={sanitizedItems?.first?.title}
                    />
                </ItemCardFooterFirst>
                <ItemCardFooterCenter>
                    {sanitizedItems?.center?.map((item, index) => (
                        <ItemCardFooterTitle
                            key={item?.title}
                            title={item?.title}
                            className='text-center'
                        />
                    ))}
                </ItemCardFooterCenter>
                <ItemCardFooterEnd>
                    <ItemCardFooterTitle
                        key={sanitizedItems?.end?.title}
                        title={sanitizedItems?.end?.title}
                    />
                </ItemCardFooterEnd>
            </div>
            <div className='w-full border border-dashed border-base-300'></div>
            <div className='w-full gap-2 pt-2 col-flex'>
                {sanitizedData?.map((footerItem) => (
                    <div
                        className='flex justify-between w-full'
                        key={footerItem?.id}
                    >
                        <ItemCardFooterFirst>
                            <ItemCardFooterItem
                                key={sanitizedItems?.first?.title}
                                {...sanitizedItems?.first}
                                item={footerItem}
                                className={cn({
                                    'font-medium': type === 'medium',
                                })}
                            />
                        </ItemCardFooterFirst>
                        <ItemCardFooterCenter>
                            {sanitizedItems?.center?.map((item, index) => (
                                <ItemCardFooterItem
                                    key={item?.title}
                                    {...item}
                                    item={footerItem}
                                    className={cn('justify-center', {
                                        'font-medium': type === 'medium',
                                    })}
                                />
                            ))}
                        </ItemCardFooterCenter>
                        <ItemCardFooterEnd>
                            <ItemCardFooterItem
                                key={sanitizedItems?.end?.title}
                                {...sanitizedItems?.end}
                                item={footerItem}
                                className={cn('justify-end', {
                                    'font-medium': type === 'medium',
                                })}
                            />
                        </ItemCardFooterEnd>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ItemCardFooterFirst = ({ children }: { children: React.ReactNode }) => (
    <div className='min-w-[20%]'>{children}</div>
);

const ItemCardFooterCenter = ({ children }: { children: React.ReactNode }) => (
    <div className='flex justify-center gap-8 w-[50%] items-center'>
        {children}
    </div>
);

const ItemCardFooterEnd = ({ children }: { children: React.ReactNode }) => (
    <div className='min-w-[20%] text-end'>{children}</div>
);

const ItemCardFooterItem = ({
    visible = true,
    renderValue,
    icon,
    iconSize = 12,
    item,
    className,
}: FooterItemProps) => {
    if (!visible) return null;
    return (
        <div className={cn('flex gap-0.5 items-center flex-1', className)}>
            <span className='text-sm'>
                {IsFunction(renderValue) ? renderValue(item) : renderValue}
            </span>
            {icon && <Icon size={iconSize} source={icon} isSvg />}
        </div>
    );
};

export const ItemStatusActivity = ({
    status,
    totalQuantity,
    fullfilledQuantity,
}: {
    status: number;
    totalQuantity?: number;
    fullfilledQuantity?: number;
}) => {
    if (status === ItemAssignmentStatusEnum.Rejected) {
        return (
            <Badge
                appearance='error'
                label={`Rejected`}
                leftComponent={
                    <div className='p-1 text-white rounded-full bg-error'>
                        <Icon source={CrossSvgIcon} size={8} isSvg />
                    </div>
                }
                size='sm'
            />
        );
    }
    if (status === ItemAssignmentStatusEnum.Fulfilled) {
        return (
            <Badge
                appearance='success'
                label={`Fulfilled`}
                lefticon={VerifiedTickSvgIcon}
                leftIconSize={14}
                size='sm'
            />
        );
    }
    if (status === ItemAssignmentStatusEnum.Requested)
        return <Badge appearance='base' label={`Requested`} size='sm' />;

    if (status === ItemAssignmentStatusEnum.PartiallyFulfilled)
        return (
            <Badge
                label={`Partially Fulfilled`}
                appearance={'info'}
                leftComponent={
                    <ProgressCircle
                        totalElements={totalQuantity}
                        currentCount={fullfilledQuantity ?? 0}
                    />
                }
                size='sm'
                className='h-6'
            />
        );
};
const ProgressCircle = ({ totalElements, currentCount }) => {
    const calculateDashoffset = (total, current) => {
        const percentage = (current / total) * 100;
        const staticOffset = '240';
        return `calc(${staticOffset} - (${staticOffset} * ${percentage}) / 100)`;
    };

    return (
        <div className='relative w-4 h-4'>
            <svg className='w-full h-full' viewBox='0 0 100 100'>
                <circle
                    className='text-gray-200 stroke-current'
                    strokeWidth='10'
                    cx='50'
                    cy='50'
                    r='40'
                    fill='transparent'
                ></circle>

                <circle
                    className='text-indigo-500 stroke-current progress-ring__circle'
                    strokeWidth='10'
                    strokeLinecap='round'
                    cx='50'
                    cy='50'
                    r='40'
                    fill='transparent'
                    strokeDashoffset={calculateDashoffset(
                        totalElements,
                        currentCount
                    )}
                    strokeDasharray={`240`}
                ></circle>
            </svg>
        </div>
    );
};

export const QuantityProgress = ({
    completed,
    progress,
    total,
    message,
}: {
    completed: number;
    progress: number;
    total: number;
    message?: React.ReactNode;
}) => {
    return (
        <Tooltip message={message} triggerClassName='cursor-pointer'>
            <div className='flex gap-1.5 items-center'>
                <div className='relative min-w-[80px] -top-[5px]'>
                    <Progress
                        value={completed}
                        backgroundColor='base-300'
                        indicatorColor='success'
                        indicatorClassName='relative z-[50] rounded'
                        className='absolute'
                        size='xs'
                    />
                    <Progress
                        value={progress}
                        backgroundColor='base-300'
                        indicatorColor='success-light'
                        indicatorClassName='relative z-[40] rounded'
                        className='absolute'
                        size='xs'
                    />
                </div>
                <span className='font-medium text-base-primary text-start'>
                    {total}
                </span>
            </div>
        </Tooltip>
    );
};

export const ItemCardSkeleton = () => {
    return (
        <div className='gap-2 px-3 py-2 border rounded animate-pulse bg-base-100 border-base-300 col-flex'>
            <div className='gap-2 transition-all col-flex group '>
                <div className='flex'>
                    <div className='flex flex-row justify-between flex-1 gap-4'>
                        <div className='flex-1 gap-2 col-flex'>
                            <div className='w-1/3 h-2 rounded bg-base-300'></div>
                            <div className='w-3/4 h-2 rounded bg-base-300'></div>
                        </div>
                        <div className='flex items-center justify-end w-[155px]'>
                            <div className='w-2/4 h-4 rounded bg-base-300'></div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-5 rounded bg-base-300'></div>
            </div>
            <div className='w-full h-2 rounded bg-base-300'></div>
        </div>
    );
};
