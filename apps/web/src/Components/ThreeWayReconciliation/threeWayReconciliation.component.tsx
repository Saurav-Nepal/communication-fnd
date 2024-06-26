import { useCallback } from 'react';

import { FormatCurrency, MatchAmount, ObjectDto } from '@finnoto/core';
import { Tooltip } from '@finnoto/design-system';

const sizeClass = {
    xs: 'badge-sm text-[11px]',
    sm: 'h-[24px] px-4 text-[10px]',
    md: 'h-[32px] px-6 text-xs',
    normal: 'h-[28px] px-4 text-sm',
};

const statusColor = {
    active: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
    disabled: 'bg-ghost',
    error: 'bg-error/10 text-error',
};

const ThreeWayReconciliation = ({
    data,
    className = '',
    size = 'sm',
}: {
    data: ObjectDto;
    className?: string;
    size?: keyof typeof sizeClass;
}) => {
    const getStatus = useCallback(
        (reconAmount: number) => {
            if (!reconAmount) return 'pending';
            if (data?.pg && !MatchAmount(data?.pg, reconAmount)) return 'error';
            return 'active';
        },
        [data?.pg]
    );

    return (
        <div className={`row-flex gap-2 ${className}`}>
            <ReconciliationCard
                text='PG'
                size={size}
                amount={data?.pg}
                status={data?.pg ? 'active' : 'pending'}
            />
            <ReconciliationCard
                text='Payout'
                size={size}
                amount={data?.settlement}
                status={getStatus(data?.settlement)}
            />
            <ReconciliationCard
                text='OMS'
                size={size}
                amount={data?.oms}
                status={getStatus(data?.oms)}
            />
        </div>
    );
};

const ReconciliationCard = ({
    text,
    amount,
    status = 'disabled',
    label,
    size = 'sm',
}: {
    text: string;
    amount?: number | string;
    status?: keyof typeof statusColor;
    label?: string;
    size?: keyof typeof sizeClass;
}) => {
    return (
        <Tooltip
            message={
                amount ? FormatCurrency({ amount }) : label || `Pending ${text}`
            }
        >
            <div
                className={` flex justify-center font-medium rounded cursor-default ${statusColor[status]} ${sizeClass[size]} gap-2 items-center`}
            >
                {text}
            </div>
        </Tooltip>
    );
};

export default ThreeWayReconciliation;
