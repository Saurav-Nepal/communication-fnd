import { useCallback, useMemo } from 'react';

import {
    Ellipsis,
    EmptyFunction,
    IsEmptyObject,
    IsUndefinedOrNull,
} from '@finnoto/core';

import { Badge } from '../../Components';
import { Icon } from '../../Components/Data-display/Icon/icon.component';
import { cn } from '../../Utils/common.ui.utils';
import { DisplayBankIcon } from '../DisplayBankIcon/displayBankIcon.component';
import { BankCardHorizontalProps, BankCardProps } from './bankCard.types';
import { SmallBankCard } from './smallbankCard.component';

import { BankIcon, UnVerifiedTickSvgIcon, VerifiedTickSvgIcon } from 'assets';

export const BankCard = ({
    ifsc_code,
    bank_id,
    account_number,
    name,
    showIcon = false,
    active = false,
    onClick = EmptyFunction,
    className = '',
    headerClassName = 'py-3',
    bodyClassName = 'py-3',
    branch,
    titleClassName,
}: BankCardProps) => {
    if (!account_number) return <></>;

    return (
        <div
            className={`border rounded-lg px-4 col-flex border-base-300/50 bg-base-100  ${
                showIcon
                    ? 'cursor-pointer hover:border-success  hover:shadow'
                    : ''
            } ${className}`}
            onClick={onClick}
        >
            <div
                className={`items-center justify-between  font-normal capitalize border-b border-dashed row-flex text-base-primary ${headerClassName}`}
            >
                <SmallBankCard {...{ ifsc_code, account_number }} />
                {showIcon && (
                    <Icon
                        source={
                            active ? VerifiedTickSvgIcon : UnVerifiedTickSvgIcon
                        }
                        iconColor={`${
                            active
                                ? 'text-success'
                                : 'text-base-100/20 border rounded-full'
                        }`}
                        isSvg
                        size={24}
                    />
                )}
            </div>
            <div className={`gap-4 py-3 grid grid-cols-2 ${bodyClassName}`}>
                <RawDetail label='IFSC Code' value={ifsc_code} />
                <RawDetail label='Branch' value={branch} />
            </div>
        </div>
    );
};

const RawDetail = ({
    label,
    value,
    className,
}: {
    label: string;
    className?: string;
    value: any;
}) => {
    return (
        <div className={cn('text-sm even:text-end col-flex', className)}>
            <div className='text-xs font-normal text-base-secondary'>
                {label}
            </div>
            <div className='font-normal text-base-primary'>{value}</div>
        </div>
    );
};

const sizeVariants = {
    xs: 'text-xs',
    md: 'text-sm',
};

const bankIconSizeVariants = {
    xs: 32,
    md: 48,
};

const defaultIconSizeVariants = {
    xs: 18,
    md: 32,
};

const defaultIconContainerSizeVariants = {
    xs: 'h-8 w-8',
    md: 'h-12 w-12',
};

const textVariants = {
    primary: 'text-base-primary',
    secondary: 'text-base-secondary',
    neutral: 'text-neutral-content',
};

/**
 *
 * @param name - Name of the bank account holder
 * @param acc_no - Account number
 * @param ifsc - IFSC code of the bank
 * @param active - Active status of the bank account
 * @param verified - Verified status of the bank account
 * @param swift_code - Swift code of the bank
 * @param text - Text color of the bank details - primary or secondary
 * @param size - Text size of the bank details - xs or md
 * @param badge - Badge to be displayed on the bank card - Active status badge or Verified status badge or none
 * @description - This component is used to display bank details in a horizontal card
 */

export const BankCardHorizontal = ({
    name,
    acc_no,
    ifsc,
    active,
    verified,
    swift_code,
    text = 'secondary',
    titleText = 'primary',
    size = 'md',
    badge = 'active',
    className,
    icon,
}: BankCardHorizontalProps) => {
    const badgeInfo = useMemo(() => {
        if (badge === 'active')
            return active
                ? {
                      text: 'Active',
                      appearance: 'success' as const,
                  }
                : {
                      text: 'Inactive',
                      appearance: 'error' as const,
                  };
        if (badge === 'verified')
            return verified
                ? {
                      text: 'Verified',
                      appearance: 'success' as const,
                  }
                : {
                      text: 'Verification Pending',
                      appearance: 'warning' as const,
                  };

        return {};
    }, [active, verified, badge]);

    const renderIcon = useCallback(() => {
        if (icon) return icon;
        if (ifsc)
            return (
                <DisplayBankIcon
                    ifsc_code={ifsc}
                    size={bankIconSizeVariants[size]}
                />
            );

        return (
            <div
                className={cn(
                    'bg-base-200 h-12 w-12 centralize rounded-sm',
                    defaultIconContainerSizeVariants[size]
                )}
            >
                <Icon
                    source={BankIcon}
                    isSvg
                    size={defaultIconSizeVariants[size]}
                />
            </div>
        );
    }, [icon, ifsc, size]);

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className='flex items-start justify-center rounded-sm'>
                {renderIcon()}
            </div>
            <div
                className={cn('flex flex-col justify-center', {
                    'gap-1': size === 'md',
                })}
            >
                <p
                    className={cn(
                        'font-medium text-base-primary',
                        {
                            'text-base': size === 'md',
                            'text-sm': size === 'xs',
                        },
                        textVariants[titleText]
                    )}
                >
                    {name}
                </p>
                <div className='flex items-center'>
                    <span
                        className={cn(
                            'font-normal',
                            textVariants[text],
                            sizeVariants[size]
                        )}
                    >
                        {acc_no}
                    </span>
                    <span className='w-[1px] bg-base-300 h-3 mx-3'></span>
                    <span
                        className={cn(
                            'font-normal',
                            textVariants[text],
                            sizeVariants[size]
                        )}
                    >
                        {ifsc || swift_code || '-'}
                    </span>
                </div>
            </div>
            <div className='ml-auto'>
                {IsEmptyObject(badgeInfo) ? null : (
                    <Badge
                        appearance={badgeInfo.appearance}
                        label={badgeInfo.text}
                        size='sm'
                    />
                )}
            </div>
        </div>
    );
};
