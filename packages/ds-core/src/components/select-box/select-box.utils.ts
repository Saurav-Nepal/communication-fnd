import { accessNestedObject, ObjectDto } from '@slabs/ds-utils';

import { SelectBoxOptionType, SelectBoxValueType } from './select-box.types';

export const CURRENT_USER = 'current_user';
export const CURRENT_EMPLOYEE = 'current_employee';

interface ParseToSelectBoxOptionProps<TData> {
    data: TData[];
    valueKey?: string;
    labelKey?: string;
    subLabelKey?: string;
    subLabelPrefixKey?: string;
    // disabled?:boolean,
    // enabled?:boolean
    defaultVisibleKey?: string;
    visibleKeys?: string[];
    discardVisibleCondition?: boolean;
    discardVisibleValue?: SelectBoxValueType;
}

export const ParseToSelectBoxOption = <TData extends ObjectDto>({
    data,
    valueKey = 'value',
    labelKey = 'label',
    defaultVisibleKey,
    subLabelKey = 'subLabel',
    discardVisibleCondition,
    visibleKeys,
    discardVisibleValue,
}: ParseToSelectBoxOptionProps<TData>) => {
    const hasVisibleOption = (option: SelectBoxOptionType) => {
        if (discardVisibleValue === option?.value) return true;
        if (visibleKeys?.length)
            visibleKeys.every((visibleKey) => !!option?.data?.[visibleKey]);
        return option?.data?.[defaultVisibleKey ?? 'active'];
    };

    const parseOptions = data.map((el) => {
        return {
            label: accessNestedObject(el, labelKey),
            value: accessNestedObject(el, valueKey),
            data: el,
            subLabel: accessNestedObject(el, subLabelKey),
        };
    });
    if (discardVisibleCondition) return parseOptions;
    return parseOptions?.filter((option) => hasVisibleOption(option));
};
