import { cn, DisplayBankIcon, Icon, IsFunction } from '@finnoto/design-system';

import { BankIcon } from 'assets';

interface smallBankCardProps {
    account_number: string;
    ifsc_code: string;
    navigationFn?: (__?: any) => void;
    containerClass?: string;
    hideIfsc?: boolean;
}

const SmallBankCard = ({
    account_number,
    ifsc_code,
    navigationFn,
    containerClass,
    hideIfsc = false,
}: smallBankCardProps) => {
    return (
        <div className={cn('flex gap-1.5 px-1 items-center', containerClass)}>
            <div className='h-11 w-11 centralize'>
                {ifsc_code ? (
                    <DisplayBankIcon ifsc_code={ifsc_code} size={32} />
                ) : (
                    <div className='w-8 h-8 rounded centralize bg-base-200'>
                        <Icon source={BankIcon} isSvg size={20} />
                    </div>
                )}
            </div>
            <div className='col-flex'>
                <p
                    onClick={() => {
                        if (!IsFunction(navigationFn)) return;
                        navigationFn();
                    }}
                    className={cn('text-sm', {
                        'link link-hover': IsFunction(navigationFn),
                    })}
                >
                    {account_number}
                </p>
                {!hideIfsc && (
                    <p className='text-xs text-base-tertiary'>{ifsc_code}</p>
                )}
            </div>
        </div>
    );
};

export default SmallBankCard;
