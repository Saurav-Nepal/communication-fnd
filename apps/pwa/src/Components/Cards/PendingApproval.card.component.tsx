import { FormatCurrencyAcc } from '@finnoto/core';
import { Icon, cn } from '@finnoto/design-system';
import { TimeSvgIcon } from 'assets';

interface PendingApprovalCardProps {
    title: string;
    amount: number;
    bgColor?: 'success' | 'warning' | 'accents' | 'default' | 'error' | 'info';
    stats?: string | number;
    icon?: any;
    iconColor?: string;
    onClick?: (__: any) => void;
}

const PendingApprovalCard = ({
    title,
    amount,
    stats,
    onClick = () => {},
}: PendingApprovalCardProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'p-4 rounded-lg bg-base-100 flex justify-between border border-base-300/50  items-center '
            )}
        >
            <div className='flex items-center gap-3'>
                <div className='rounded-lg centralize h-11 w-11 bg-warning/20 text-warning'>
                    <Icon source={TimeSvgIcon} isSvg size={32} />
                </div>
                <div className='text-base col-flex'>
                    <p>{title}</p>
                    <span className='text-lg font-medium'>
                        {FormatCurrencyAcc(amount)}
                    </span>
                </div>
            </div>

            <span className='pt-5 text-lg font-medium'>{stats || '0'}</span>
        </div>
    );
};

export default PendingApprovalCard;
