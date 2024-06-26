import React from 'react';

import { DashboardChartLabelItem } from '@Components/Dashboard/dashboard.chart.labels';

const CustomChartTooltip = ({
    amount,
    title,
    count,
    color,
    headingRight,
}: {
    title: string;
    amount: React.ReactNode;
    count?: number | string;
    color?: string;
    headingRight?: React.ReactNode;
}) => {
    return (
        <div className='w-fit z-[99]'>
            <div className='flex items-center justify-between gap-3 p-2 py-1 border-b rounded-t-lg bg-polaris-bg-surface-secondary'>
                <DashboardChartLabelItem color={color} label={title} />
                {headingRight}
            </div>
            <div className='gap-2 p-2 col-flex'>
                <div className='flex items-center justify-between gap-4'>
                    <DashboardChartLabelItem
                        color=''
                        label={<span className='!text-base'>{amount}</span>}
                    />
                    {count && (
                        <span className='text-xs font-medium'>{count}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomChartTooltip;
