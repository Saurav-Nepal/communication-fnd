import { EmptyFunction, IsFunction } from '@finnoto/core';
import { Card, Ellipsis, Icon, cn } from '@finnoto/design-system';
import { CardProps } from '@finnoto/design-system/src/Components/Surfaces/Cards/card.types';
import { ChevronRight } from 'lucide-react';
import React from 'react';

export interface GenericCardProps extends CardProps {
    title: React.ReactNode;
    titleClassName?: string;
    subtitle?: React.ReactNode;
    subtitleClassName?: string;
    headingClassName?: string;
    rightComponent?: React.ReactNode;
    leftComponent?: React.ReactNode;
    bottomComponent?: React.ReactNode;
    mainComponent?: React.ReactNode;
    extraComponent?: React.ReactNode;
    shadow?: boolean;
    color?: string;
    cardIcon?: any;
    rounded?: 'default' | 'lg' | 'md' | 'sm' | 'xl' | '2xl' | '3xl' | 'none';
    bottomClassName?: string;
    extraClassName?: string;
    hasClickAction?: () => boolean;
    onClick?: () => void;
    cardIconClassName?: string;
    CustomCardIcon?: any;
}

const GenericCard = ({
    title,
    subtitle,
    titleClassName,
    subtitleClassName,
    rightComponent,
    bottomComponent,
    extraComponent,
    className,
    color,
    cardIcon,
    headingClassName,
    leftComponent,
    rounded = 'default',
    bottomClassName,
    extraClassName,
    cardIconClassName,
    onClick,
    CustomCardIcon,
    mainComponent,
    hasClickAction = () => false,
}: GenericCardProps) => {
    return (
        <Card
            className={cn(
                'bg-base-100 rounded-lg border border-base-300/50',
                { 'active:bg-base-300': IsFunction(onClick) },
                className
            )}
            onClick={onClick}
            noBorder
        >
            {title && (
                <div className='gap-3 p-4 pb-3 row-flex'>
                    {(cardIcon || CustomCardIcon) && (
                        <div className={cn(color, cardIconClassName)}>
                            {!CustomCardIcon && (
                                <Icon
                                    source={cardIcon}
                                    isSvg
                                    iconClass='m-0 bg-secondary/10 rounded-full p-2 !text-secondary row-flex items-center justify-center'
                                    iconColor='text-current'
                                    size={35}
                                />
                            )}
                            {CustomCardIcon || null}
                        </div>
                    )}

                    {leftComponent && <span>{leftComponent}</span>}
                    <div
                        className={cn(
                            'row-flex w-full gap-2 justify-between ',
                            headingClassName
                        )}
                    >
                        <div className='flex-1 pr-0 col-flex '>
                            <div
                                className={cn(
                                    'font-medium row-flex text-sm items-center justify-between',
                                    titleClassName,
                                    'card-title'
                                )}
                            >
                                {typeof title === 'string' ? (
                                    <Ellipsis>{title}</Ellipsis>
                                ) : (
                                    title
                                )}
                            </div>
                            {subtitle && (
                                <div
                                    className={cn(
                                        'text-xs font-normal',
                                        subtitleClassName,
                                        'card-subtitle'
                                    )}
                                >
                                    {typeof subtitle === 'string' ? (
                                        <Ellipsis>{subtitle}</Ellipsis>
                                    ) : (
                                        subtitle
                                    )}
                                </div>
                            )}
                        </div>

                        {rightComponent ? <div>{rightComponent}</div> : null}
                    </div>
                </div>
            )}
            {bottomComponent && (
                <div
                    className={cn(
                        'font-normal text-base-secondary text-xs mx-4 pb-3',
                        bottomClassName
                    )}
                >
                    {bottomComponent}
                </div>
            )}
            {mainComponent && mainComponent}
            {extraComponent && (
                <div
                    className={cn(
                        'font-medium mx-4 pt-2 pb-1  border-base-200',
                        extraClassName
                    )}
                >
                    {extraComponent}
                </div>
            )}
        </Card>
    );
};

export default GenericCard;
