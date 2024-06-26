import { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';

import { ObjectDto } from '@finnoto/core';

import { InputField } from '../InputField/input.component';
import { InputFieldProps } from '../InputField/input.types';
import { TaxPercentageSelector } from './tax.percentage.selector';

type valueProps = {
    percentage?: number;
    amount?: number;
};
interface GstTaxSelectorInputProps
    extends Omit<InputFieldProps, 'onChange' | 'value'> {
    onChange?: (value: valueProps) => void;
    value: valueProps;
    taxableAmount?: number;
    prefixLabel?: string;
}
export const GstTaxSelectorInput = ({
    onChange,
    value: valueProps = {},
    taxableAmount = 0,
    prefixLabel,
    ...rest
}: GstTaxSelectorInputProps) => {
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
    return (
        <InputField
            addonStart={
                <TaxPercentageSelector
                    percentage={valueProps?.percentage}
                    prefixLabel={prefixLabel}
                    disabled={rest?.disabled || !taxableAmount}
                    placeholder='GST'
                    onSelect={(option: ObjectDto) => {
                        onChange({
                            ...valueProps,
                            percentage: option.value,
                            amount: getAbsoluteAmount(option?.value),
                        });
                    }}
                />
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
