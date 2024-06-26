import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { IsValidString, useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Card, CardBody } from './card.component';
import { DataRowInterface } from './dataRow.types';

import { ArrowUpSvgIcon } from 'assets';

export const DataRow = ({
    label,
    labelIcon,
    value,
    warning,
    onClick = () => {},
    className,
    containerClassName,
    labelClassName,
    valueClassName,
    type = 'normal',
    isHoverable,
}: DataRowInterface) => {
    const { isArc } = useApp();

    return (
        <div
            className={cn(
                'col-flex',
                {
                    'mb-1': isArc,
                },
                containerClassName
            )}
        >
            <div
                onClick={onClick}
                className={cn(
                    'justify-between gap-6 p-2 rounded hover:bg-base-200 items-start row-flex hover-color-remove-data-row',
                    {
                        'border-t border-neutral pt-3': type === 'net',
                        'py-1': isArc,
                        'px-0 hover:bg-transparent': !isHoverable,
                        className,
                    }
                )}
            >
                <span
                    className={cn(
                        'text-sm whitespace-nowrap row-flex items-center gap-1',
                        {
                            'font-bold text-base-primary dark:text-color-200': [
                                'net',
                            ].includes(type),
                        },
                        labelClassName
                    )}
                >
                    {label} {labelIcon}
                </span>
                <span
                    className={cn(
                        'font-medium text-base-primary dark:text-color-200 text-sm text-right',
                        {
                            'font-bold text-base-primary': ['net'].includes(
                                type
                            ),
                        },
                        valueClassName
                    )}
                >
                    {value || '-'}
                </span>
            </div>
            {warning ? (
                <div className='self-end max-w-xs text-sm text-right text-warning'>
                    {warning}
                </div>
            ) : null}
        </div>
    );
};

const DataSubRow = ({
    label,
    value,
    className,
    labelClassName,
    valueClassName,
    sub_rows = [],
}: DataRowInterface) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className='gap-2 col-flex '>
            <DataRow
                label={label}
                labelIcon={
                    <Icon
                        size={22}
                        source={ArrowUpSvgIcon}
                        isSvg
                        className={`transition-all ${open ? 'rotate-180' : ''}`}
                    />
                }
                value={value}
                onClick={() => setOpen(!open)}
                {...{ className, labelClassName, valueClassName }}
            />

            <div className={`gap-1   col-flex ${open}`}>
                <AnimateHeight height={open ? 'auto' : 0}>
                    <div
                        className={` p-2 pt-1 rounded overflow-hidden bg-base-200 col-flex ${
                            open ? 'mb-4' : 'mb-2'
                        }`}
                    >
                        {(sub_rows || []).map(
                            (row: DataRowInterface, index: number) => {
                                return <DataRow {...row} key={index} />;
                            }
                        )}
                    </div>
                </AnimateHeight>
            </div>
        </div>
    );
};

export interface GenericDetailCardInterface {
    title: any;
    titleClassName?: string;
    className?: string;
    cardClassName?: string;
    bodyClassName?: string;
    children?: any;
    footerComponent?: any;
}
export interface GenericDataRowDetailCardInterface
    extends GenericDetailCardInterface {
    data_rows: DataRowInterface[];
}

export const GenericDataRowDetailCard = ({
    title,
    titleClassName,
    className,
    bodyClassName,
    data_rows,
    footerComponent,
    cardClassName,
}: GenericDataRowDetailCardInterface) => {
    return (
        <GenericDetailCard
            {...{
                title,
                titleClassName,
                className,
                bodyClassName,
                data_rows,
                footerComponent,
                cardClassName,
            }}
        >
            {(data_rows || []).map((row: DataRowInterface, index: number) => {
                if (row?.visible === false) return null;
                if (row?.sub_rows) return <DataSubRow {...row} key={index} />;
                return <DataRow {...row} key={index} />;
            })}
        </GenericDetailCard>
    );
};

export const GenericDetailCard = ({
    title,
    titleClassName,
    className,
    bodyClassName,
    children,
    footerComponent,
    cardClassName,
}: GenericDetailCardInterface) => {
    return (
        <Card
            noBorder={true}
            className={cn(
                ' overflow-hidden rounded shadow bg-base-100',
                IsValidString(title) ? 'py-4' : 'p-0',
                cardClassName
            )}
        >
            <div className={`col-flex ${className}`}>
                {IsValidString(title) ? (
                    <GenericDetailCardHeader
                        title={title}
                        className={titleClassName}
                    />
                ) : (
                    title
                )}

                <CardBody
                    className={`text-sm flex-1 col-flex !p-2   ${bodyClassName}`}
                >
                    {children}
                    {footerComponent}
                </CardBody>
            </div>
        </Card>
    );
};

export const GenericDetailCardHeader = ({
    title,
    className,
}: {
    title: string;
    className?: string;
}) => {
    return (
        <div
            className={`capitalize bg-base-100 text-base text-base-primary font-medium  mx-4 pb-2 border-b border-dashed  justify-between  light:text-primary ${className}`}
        >
            {title}
        </div>
    );
};
