import { EmptyFunction, FormatCurrencyAcc } from '@finnoto/core';
import { cn } from '@finnoto/design-system';

interface DashboardCardProps {
    title: string;
    amount?: number;
    bgColor?: 'success' | 'warning' | 'accents' | 'default' | 'error' | 'info';
    stats?: string | number;
    icon?: any;
    iconColor?: string;
    onClick?: (e: any) => void;
    onlyCount?: boolean;
}

const DashboardCard = ({
    title,
    amount,
    bgColor = 'default',
    stats,
    icon,
    iconColor,
    onClick = EmptyFunction,
    onlyCount,
}: DashboardCardProps) => {
    const colors = {
        success: 'border-l-success',
        warning: 'border-l-warning',
        accents: 'border-l-accent',
        error: 'border-l-error',
        info: 'border-l-info',
        default: 'border-l-secondary ',
    };

    return (
        <div
            className={cn(
                'p-4 border border-l-4 border-base-300/50 rounded col-flex  bg-base-100',
                colors[bgColor]
            )}
            onClick={onClick}
        >
            <p className='text-sm text-base-primary'>{title}</p>
            <span className='flex items-center justify-between gap-4 text-base font-semibold text-base-primary '>
                {!onlyCount && FormatCurrencyAcc(amount)}

                <span className={`text-base text-base-primary`}>
                    {stats || '0'}
                </span>
            </span>
        </div>
    );
};

export default DashboardCard;
