import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

import {
    GetObjectFromArray,
    SelectBoxOption,
    TAX_PERCENTAGE_SLABS,
} from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import Dropdown from '../Dropdown/dropdown.component';

import { IndianCurrSvgIcon } from 'assets';

interface TaxPercentageSelectorProps {
    percentage: number;
    onSelect?: (option: SelectBoxOption) => void;
    prefixLabel?: string;
    disabled?: boolean;
    placeholder?: string;
}
export const TaxPercentageSelector = ({
    percentage,
    onSelect,
    prefixLabel,
    disabled,
    placeholder,
}: TaxPercentageSelectorProps) => {
    const options = useMemo(() => {
        return TAX_PERCENTAGE_SLABS.map((percentage) => {
            return {
                label: `${prefixLabel || ''}${percentage}%`,
                value: percentage,
            };
        });
    }, [prefixLabel]);
    const displayLabel = useMemo(
        () =>
            GetObjectFromArray(options, 'value', percentage)?.label || (
                <div className='text-base-secondary'>{placeholder} </div>
            ),
        [options, percentage, placeholder]
    );
    return (
        <Dropdown
            value={displayLabel}
            options={options}
            menuClassName='max-w-[100px]'
            onSelect={onSelect}
            disabled={disabled}
            searchDisabled
        >
            <div
                className={cn(
                    'text-sm hover:bg-base-200 h-full max-w-[150px] w-auto flex items-center px-2 gap-2 cursor-pointer select-none',
                    {
                        'bg-base-200': disabled,
                    }
                )}
            >
                <div className='items-center text-center row-flex min-w-[30px]'>
                    {displayLabel}{' '}
                </div>

                <ChevronDown className='w-4 h-4' />
                <Icon
                    className='pl-2 border-l text-base-primary'
                    source={IndianCurrSvgIcon}
                    isSvg
                    size={18}
                />
            </div>
        </Dropdown>
    );
};
