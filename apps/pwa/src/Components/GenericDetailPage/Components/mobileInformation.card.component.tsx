import Link from 'next/link';
import { Fragment, ReactNode, useCallback } from 'react';
import { useToggle } from 'react-use';

import {
    AccessNestedObject,
    IsFunction,
    IsUndefinedOrNull,
    ObjectDto,
} from '@finnoto/core';
import { cn, Ellipsis, Icon } from '@finnoto/design-system';

import GenericCard from '@Components/GenericCardListing/Components/genericCard.component';

import { CrossSvgIcon } from 'assets';

type infoItemType = {
    name?: string | ReactNode;
    key?: string;
    visible?: boolean;
    className?: string;
    fullWidth?: boolean;
    renderValue?: (item: ObjectDto) => any;
    url?: (item: ObjectDto) => string;
    value?: any;
    withEllipsis?: boolean;
};
const MobileInformationCard = ({
    title,
    items = [],
    data = {},
    bottomComponent,
    rightComponent,
    customBottomComponent,
    mainClassName,
}: {
    title: string | ReactNode;
    items?: infoItemType[];
    data: ObjectDto;
    bottomComponent?: ReactNode;
    rightComponent?: ReactNode;
    customBottomComponent?: ReactNode;
    mainClassName?: string;
}) => {
    const getValue = useCallback(
        (info: ObjectDto) => {
            if (!IsUndefinedOrNull(info?.value)) return info?.value;
            return IsFunction(info?.renderValue)
                ? info?.renderValue(data)
                : AccessNestedObject(data, info?.key);
        },
        [data]
    );
    const renderInfo = useCallback(
        (info: infoItemType, index: number, infoArray: infoItemType[]) => {
            const value = getValue(info);

            let fullWidth = info?.fullWidth;

            if (!fullWidth && index > 0 && index % 2 === 1) {
                fullWidth = infoArray[index - 1]?.fullWidth;
            }

            return (
                <div
                    className={cn(
                        'col-flex min-w-[100px]',
                        { 'text-right': index % 2 === 1 && !fullWidth },
                        { 'col-span-2': fullWidth },
                        info?.className
                    )}
                >
                    <div className={cn('text-xs text-base-secondary')}>
                        {info?.name}
                    </div>

                    {IsFunction(info?.url) && value ? (
                        <Link
                            className='break-all table-link'
                            href={info?.url(data)}
                        >
                            {info?.withEllipsis ? (
                                <ItemWithEllipsis>{value}</ItemWithEllipsis>
                            ) : (
                                <span>{value}</span>
                            )}
                        </Link>
                    ) : (
                        <div className={'text-sm'}>
                            {info?.withEllipsis ? (
                                <ItemWithEllipsis>{value}</ItemWithEllipsis>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    )}
                </div>
            );
        },
        [data, getValue]
    );

    const renderMainComponent = useCallback(() => {
        if (!items?.length) return null;
        return (
            <div
                className={cn(
                    'grid grid-cols-2 gap-4 p-4 border-t',
                    mainClassName
                )}
            >
                {items
                    .filter((item) => item?.visible !== false)
                    .map((info: infoItemType, index, infoArray) => (
                        <Fragment key={index + '-' + info?.key}>
                            {renderInfo(info, index, infoArray)}
                        </Fragment>
                    ))}
            </div>
        );
    }, [items, mainClassName, renderInfo]);

    return (
        <GenericCard
            mainComponent={customBottomComponent || renderMainComponent()}
            rightComponent={rightComponent}
            className='rounded-lg mobile-info-card'
            titleClassName='p-0 text-base'
            title={title}
        />
    );
};

export default MobileInformationCard;

export const ItemWithEllipsis = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const [expanded, toggleExpand] = useToggle(false);

    const renderShowMore = useCallback(() => {
        return (
            <span onClick={() => toggleExpand(!expanded)} className='link '>
                ...
            </span>
        );
    }, [expanded, toggleExpand]);

    return (
        <div>
            <div
                className={cn(
                    'fixed centralize top-1/2 left-1/2 ease-in duration-200 -translate-x-1/2 -translate-y-1/2 h-full w-full shadow-sm  bg-base-300/50 border border-base-300 rounded',
                    { hidden: !expanded }
                )}
                onClick={() => toggleExpand(!expanded)}
            >
                <div className='relative p-6 pr-10 bg-base-100'>
                    <Icon
                        source={CrossSvgIcon}
                        className='absolute top-3 right-3'
                        isSvg
                        iconColor='text-base-secondary'
                        size={12}
                        onClick={() => toggleExpand(!expanded)}
                    />
                    <div className='w-full h-full text-center centralize'>
                        {children}
                    </div>
                </div>
            </div>

            <Ellipsis
                lines={1}
                customShowMore={renderShowMore()}
                withShowMore
                className={className}
            >
                {children}
            </Ellipsis>
        </div>
    );
};
