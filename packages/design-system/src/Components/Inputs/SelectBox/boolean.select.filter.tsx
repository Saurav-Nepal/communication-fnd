import { useMemo } from 'react';

import { BooleanEnum } from '@finnoto/core';

import { SelectBox } from './selectBox.component';
import { SelectBoxProps } from './selectBox.types';

interface BooleanSelectFilterProps
    extends Omit<SelectBoxProps, 'options' | 'value'> {
    positiveLabel?: string;
    negativeLabel?: string;
    value?: keyof typeof BooleanEnum;
}
export const BooleanSelectFilter = ({
    value: valueProps,
    onChange,
    positiveLabel,
    negativeLabel,
    ...rest
}: BooleanSelectFilterProps) => {
    const options = useMemo(() => {
        return [
            {
                label: positiveLabel || 'Yes',
                value: BooleanEnum?.TRUE,
            },
            {
                label: negativeLabel || 'No',
                value: BooleanEnum?.FALSE,
            },
        ];
    }, [negativeLabel, positiveLabel]);

    return (
        <SelectBox
            value={valueProps}
            options={options}
            onChange={onChange}
            mainClassName='flex-1 single-select-filter '
            placeholder={`Select  ...`}
            {...rest}
        />
    );
};
