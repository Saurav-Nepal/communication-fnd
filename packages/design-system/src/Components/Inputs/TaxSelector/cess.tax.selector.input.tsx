import { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';

import { IsUndefinedOrNull } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { InputField } from '../InputField/input.component';
import { InputFieldProps } from '../InputField/input.types';

import { IndianCurrSvgIcon } from 'assets';

type valueProps = {
    percentage?: number;
    amount?: number;
};
interface CessTaxSelectorInputProps
    extends Omit<InputFieldProps, 'onChange' | 'value'> {
    onChange?: (value: valueProps) => void;
    value: valueProps;
    taxableAmount?: number;
    prefixLabel?: string;
    addOnInputClassName?: string;
}
export const CessTaxSelectorInput = ({
    onChange,
    value: valueProps = {},
    taxableAmount = 0,
    prefixLabel,
    addOnInputClassName,
    ...rest
}: CessTaxSelectorInputProps) => {
    const getAbsoluteAmount = useCallback(
        (percentage: number) => {
            return Number((taxableAmount * (percentage / 100)).toFixed(2));
        },
        [taxableAmount]
    );
    useUpdateEffect(() => {
        onChange({
            ...valueProps,
            amount: getAbsoluteAmount(valueProps?.percentage),
        });
    }, [taxableAmount]);
    const getPercentage = useCallback((value: number) => {
        if (value < 0) return 0;
        if (value > 100) return 100;
        return value;
    }, []);
    return (
        <InputField
            addonStart={
                <div
                    className={cn('items-center  gap-2 row-flex', {
                        'h-[28px]': rest?.size === 'sm',
                    })}
                >
                    <div
                        className={cn('gap-1   pr-2 border-r row-flex', {
                            'h-[26px]': rest?.size === 'sm',
                        })}
                    >
                        <input
                            max={'100'}
                            type='number'
                            value={valueProps?.percentage || ''}
                            onChange={(e) => {
                                if (IsUndefinedOrNull(e.target?.value))
                                    return onChange({
                                        ...valueProps,
                                        amount: getAbsoluteAmount(0),
                                        percentage: 0,
                                    });
                                const percentage = getPercentage(
                                    Number(e.target.value)
                                );

                                onChange({
                                    ...valueProps,
                                    amount: getAbsoluteAmount(percentage),
                                    percentage: percentage,
                                });
                            }}
                            placeholder='Cess'
                            disabled={rest?.disabled}
                            className={cn(
                                'w-[44px] px-2 hover:rounded text-base-primary active:outline-none focus:outline-none',
                                addOnInputClassName
                            )}
                        />
                        <span
                            className={cn('border-none bg-background px-0.5', {
                                'bg-base-200': rest?.disabled,
                            })}
                        >
                            {' '}
                            %
                        </span>
                    </div>
                    <Icon
                        source={IndianCurrSvgIcon}
                        isSvg
                        className='text-base-primary'
                        size={18}
                    />
                </div>
            }
            inputClassName='text-right'
            onChange={(value) => {
                onChange({
                    ...valueProps,
                    amount: value,
                });
            }}
            readOnly
            value={valueProps?.amount || 0}
            {...rest}
            type='number'
        />
    );
};
