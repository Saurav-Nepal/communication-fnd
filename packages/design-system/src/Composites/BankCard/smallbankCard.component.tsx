import { DisplayBankIcon, IsFunction, cn } from '@finnoto/design-system';

interface smallBankCardProps {
    account_number: string | number;
    ifsc_code: string;
    navigationFn?: (__?: any) => void;
    containerClass?: string;
}

export const SmallBankCard = ({
    account_number,
    ifsc_code,
    navigationFn,
    containerClass,
}: smallBankCardProps) => {
    return (
        <div className={cn('flex gap-1.5 px-1 items-center', containerClass)}>
            <div className='h-11 w-11 centralize'>
                <DisplayBankIcon ifsc_code={ifsc_code} size={32} />
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
                <p className='text-xs text-base-tertiary'>{ifsc_code}</p>
            </div>
        </div>
    );
};
