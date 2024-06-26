import { DisplayBankIcon } from '../DisplayBankIcon/displayBankIcon.component';
import { DisplayBankInfoCardProps } from './displayBankInfo.card.types';

/**
 *
 * @description This card is only for display you can use Bankaccountcard for extra features.
 *
 * @returns ReactNode
 */
export const DisplayBankInfoCard = ({
    accountNumber,
    branchName,
    ifsc_code = '',
    className,
}: DisplayBankInfoCardProps) => {
    return (
        <div
            className={`flex gap-2 items-center text-base-primary  w-full  ${className}`}
        >
            <div
                id='bank_ifsc_info'
                className='flex flex-wrap items-center flex-1 gap-1 text-sm cursor-pointer '
            >
                <DisplayBankIcon ifsc_code={ifsc_code} />
                <div>
                    {ifsc_code && (
                        <span className='uppercase '>{ifsc_code},</span>
                    )}
                    {accountNumber && (
                        <span className='font-semibold lowercase '>
                            {accountNumber},
                        </span>
                    )}
                    {branchName && (
                        <span className='font-normal text-base-primary'>
                            {branchName}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
