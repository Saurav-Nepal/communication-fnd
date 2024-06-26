import Link from 'next/link';

import { FormatCurrencyAcc, IsValidString } from '@finnoto/core';
import {
    cn,
    DebugConfigurationButton,
    FormatCurrencyStyled,
    Icon,
    Tooltip,
} from '@finnoto/design-system';

import { InfoCircleSvgIcon } from 'assets';

export const DashboardCardColors = {
    success: '!border-l-success', // Approved
    warning: '!border-l-party-status-hold', // On Hold
    accents: '!border-l-party-status-pending', // Pending Approval
    error: '!border-l-error', // Rejected
    info: '!border-l-info',
    default: '!border-l-secondary',
    yellow: '!border-l-warning',
};

interface DashboardCardProps {
    title: string;
    amount?: number;
    bgColor?: keyof typeof DashboardCardColors;
    stats?: string | number;
    icon?: any;
    iconColor?: string;
    message?: string;
    link?: string;
    onlyCount?: boolean;
    onClick?: (e: any) => void;
    slug?: string;
    refetch?: any;
}

const DashboardCard = ({
    title,
    amount,
    bgColor = 'default',
    stats,
    link,
    message,
    onClick,
    onlyCount,
    slug,
    refetch,
}: DashboardCardProps) => {
    const cursorClass =
        amount === null ? 'cursor-not-allowed' : 'cursor-pointer';

    if (IsValidString(link)) {
        return (
            <Link href={link} className='relative'>
                <div
                    className={cn(
                        'gap-1 p-4 border border-l-4 rounded relative col-flex  bg-base-100',
                        cursorClass,
                        DashboardCardColors[bgColor]
                    )}
                >
                    <p className='text-sm text-base-primary'>{title}</p>
                    <span className='flex items-center justify-between gap-4 text-base font-semibold text-base-primary '>
                        {FormatCurrencyStyled({ amount })}

                        {!!stats && (
                            <span className={`text-base text-base-primary`}>
                                {stats}
                            </span>
                        )}
                    </span>
                </div>
                <DebugConfigurationButton slug={slug} position='bottomRight' />
            </Link>
        );
    }

    return (
        <div
            onClick={amount !== null ? onClick : () => {}}
            className={cn(
                'gap-1 p-4 border border-base-300 border-l-4 relative rounded col-flex  bg-base-100',
                cursorClass,
                DashboardCardColors[bgColor]
            )}
        >
            <DebugConfigurationButton
                slug={slug}
                options={{ callback: refetch }}
            />
            <div className='flex items-center gap-2'>
                <p className='text-sm text-base-primary'>{title}</p>
                {!!message && (
                    <Tooltip
                        asChild={false}
                        className='max-w-[250px] text-xs'
                        sideOffset={2}
                        message={message}
                    >
                        <Icon
                            source={InfoCircleSvgIcon}
                            isSvg
                            size={14}
                            className='text-base-secondary '
                        />
                    </Tooltip>
                )}
            </div>

            <span className='flex items-center justify-between gap-4 text-base font-semibold text-base-primary '>
                {!onlyCount && FormatCurrencyStyled({ amount, size: 'md' })}
                <span className={`text-base text-base-primary`}>
                    {stats || '0'}
                </span>
            </span>
        </div>
    );
};

export default DashboardCard;
