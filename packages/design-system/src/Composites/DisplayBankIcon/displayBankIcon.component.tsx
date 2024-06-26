import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Icon } from '../../Components/Data-display/Icon/icon.component';

import { BankIcon } from 'assets';

export const DisplayBankIcon = ({
    ifsc_code,
    size = 32,
}: {
    ifsc_code: string;
    size?: number;
}) => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
    }, [ifsc_code]);

    if (isError || !ifsc_code) {
        return (
            <div
                className='p-1 rounded bg-base-200'
                style={{ height: size, width: size }}
            >
                <Icon source={BankIcon} isSvg size={24} />
            </div>
        );
    }

    return (
        <div className='rounded bg-base-200'>
            <Image
                src={getBankIconUrlWithIfsc(ifsc_code)}
                onError={() => setIsError(true)}
                width={size}
                alt={'bank'}
                height={size}
            />
        </div>
    );
};

export const getBankIconUrlWithIfsc = (ifsc_code: string) => {
    return `/assets/icons/bank-icons/${ifsc_code
        .substring(0, 4)
        .toUpperCase()}.png`;
};

export const BankImage = ({
    ifsc_code,
    size,
}: {
    ifsc_code: string;
    size: number;
}) => {
    if (ifsc_code)
        return (
            <div className='rounded bg-base-200'>
                <Image
                    src={getBankIconUrlWithIfsc(ifsc_code)}
                    width={size}
                    alt={'bank'}
                    height={size}
                />
            </div>
        );

    return <Icon source={BankIcon} isSvg size={size} />;
};
