import React from 'react';

import { EmptyFunction } from '@finnoto/core';
import { cn, FormatCurrencyStyled } from '@finnoto/design-system';

interface IDashboardChartSelectorCardProps {
    title: string;
    amount: number;
    active?: boolean;
    onClick?: () => void;
    titleLeftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}

const DashboardChartSelectorCard = ({
    amount,
    title,
    active,
    onClick,
    titleLeftComponent,
    rightComponent,
}: IDashboardChartSelectorCardProps) => {
    return (
        <div
            className={cn(
                'rounded-lg hover:bg-polaris-bg-surface-secondary border p-3 flex w-full  justify-between ',
                {
                    'border border-black': active,
                    'cursor-pointer': amount > 0,
                }
            )}
            onClick={amount > 0 ? onClick : EmptyFunction}
        >
            <div className='col-flex'>
                <div className='flex mb-1'>
                    {titleLeftComponent}
                    <p className='text-xs font-medium text-polaris-text-secondary'>
                        {title}
                    </p>
                </div>
                <div className='flex gap-2'>
                    <h2>
                        {FormatCurrencyStyled({
                            amount,
                            className: '!text-base',
                            size: 'sm',
                        })}
                    </h2>
                </div>
            </div>
            {rightComponent}
        </div>
    );
};

export default DashboardChartSelectorCard;
