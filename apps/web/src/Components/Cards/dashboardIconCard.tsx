import { cn, FormatCurrencyStyled, Icon } from '@finnoto/design-system';

import { AddSvgIcon, CalendarSvgIcon } from 'assets';

interface DashboardIconCardProps {
    title: string;
    amount?: number;
    stats?: string | number;
    icon?: any;
    onClick?: (e: any) => void;
}

const DashboardIconCard = ({
    title,
    amount,
    stats,
    onClick,
    icon,
}: DashboardIconCardProps) => {
    return (
        <div
            onClick={(e) => amount > 0 && onClick(e)}
            className={cn(
                'relative flex h-full gap-3 p-4 px-4 py-3 transition-all border border-base-300 rounded cursor-pointer bg-base-100 hover:shadow-lg',
                {
                    'cursor-not-allowed hover:shadow-none': amount <= 0,
                }
            )}
        >
            {/* <div className='absolute top-0 right-0 w-4 h-4 rounded-full '>
                <Icon
                    source={CalendarSvgIcon}
                    className='text-base-tertiary'
                    size={20}
                    isSvg
                />
            </div> */}
            <div className='w-12 h-12 rounded bg-base-200/50 centralize'>
                {icon && (
                    <Icon
                        source={icon}
                        size={48}
                        isSvg
                        iconColor='text-primary'
                    />
                )}
                {/* <Icon source={AddSvgIcon} size={20} isSvg /> */}
            </div>
            <div className='justify-between flex-1 col-flex'>
                <div className='flex items-center gap-2'>
                    <p className='text-sm text-base-primary'>{title}</p>
                </div>

                <span className='flex items-center justify-between '>
                    <span className={`text-base-secondary`}>
                        {stats || '0'}
                    </span>
                    <div
                        className={cn('font-medium', {
                            'text-md': amount > 0,
                        })}
                    >
                        {FormatCurrencyStyled({
                            amount: amount || 0,
                            size: 'md',
                        })}
                    </div>
                </span>
            </div>
        </div>
    );
};

export default DashboardIconCard;
