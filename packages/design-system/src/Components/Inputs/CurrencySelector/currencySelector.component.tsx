import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import { useList } from 'react-use';

import {
    GetObjectFromArray,
    IsEmptyArray,
    IsFunction,
    ParseToSelectBoxOption,
} from '@finnoto/core';
import { BusinessCurrencyController } from '@finnoto/core/src/backend/ap/business/controllers/business.currency.controller';

import { cn } from '../../../Utils/common.ui.utils';
import Dropdown, { DropdownProps } from '../Dropdown/dropdown.component';
import { SelectBoxOption } from '../SelectBox/selectBox.types';

const CurrencySelector = ({
    onOptionLoad,

    ...rest
}: Omit<
    DropdownProps,
    'controller' | 'labelKey' | 'sublabelKey' | 'valueKey' | 'children'
>) => {
    const [options, { set: setOptions }] = useList([]);

    const displayValue = useMemo(() => {
        if (!rest.value) return null;
        if (IsEmptyArray(options)) return null;

        const option = options.find((option) => option.value === rest.value);
        if (!option) return null;
        return option;
    }, [options, rest.value]);

    return (
        <Dropdown
            {...rest}
            controller={BusinessCurrencyController}
            method='getAll'
            labelKey='identifier'
            sublabelKey='name'
            valueKey='id'
            minLength={0}
            offsetY={0}
            align='start'
            inputSize='sm'
            searchKey='str'
            renderItem={CurrencyDropdownItem}
            onOptionLoad={(options) => {
                setOptions(options);
                if (IsFunction(onOptionLoad)) onOptionLoad(options);
            }}
            searchDisabled
            isAsync
        >
            <div className='text-sm hover:bg-base-200 h-full min-w-[50px] w-auto flex items-center px-2 gap-2 cursor-pointer select-none'>
                <div>{displayValue?.data?.attributes?.symbol || '₹'}</div>
                <ChevronDown className='w-4 h-4' />
            </div>
        </Dropdown>
    );
};

export default CurrencySelector;

export const CurrencyDropdownItem = (
    value: any,
    option: SelectBoxOption,
    onSelect
) => {
    return (
        <div
            className={cn('col-flex cursor-pointer py-1 px-2 rounded', {
                'hover:bg-base-200': value !== option.value,
                'bg-secondary text-secondary-content': value == option.value,
            })}
            onClick={() => onSelect(option)}
        >
            <div className='text-sm font-medium'>
                {option.data?.attributes?.symbol} ({option.label})
            </div>
            {option.subLabel && (
                <div
                    className={cn('text-xs text-base-tertiary', {
                        '!text-secondary-content': value == option.value,
                    })}
                >
                    {option.subLabel}{' '}
                    {/* <Badge appearance='base' label='KA' size='xs' /> */}
                </div>
            )}
        </div>
    );
};
