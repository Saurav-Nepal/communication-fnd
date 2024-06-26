import { ReactNode } from 'react';

import { GenericListingType, ObjectDto, SelectBoxOption } from '@finnoto/core';

import { dateFilterTransformerType } from '../../../../../Components';

export type GenericFilterListType =
    | 'date_range'
    | 'amount_range'
    | 'multi_select_object' //it gives object with key value pairs
    | 'multi_select' //it gives array
    | 'select_reference' // it generates by api
    | 'select' // it locally search
    | 'date'
    | 'boolean'; //;

type BaseFilterProps = {
    title: string;
    key: string;
    isVisible?: boolean;
    isOuterFilter?: boolean;
    disableClear?: boolean;
    isDefinitionQueryFilter?: boolean;
    renderFilter?: (
        data: ObjectDto,
        handleRemove?: () => void
    ) => ReactNode | string;
};
type GenericFilterProps<TValue, TType = GenericFilterListType> = {
    defaultValue?: TValue;
    type: TType;
};
type DateValueType = Date | string;
export type DateRangeInputFilterProps = BaseFilterProps &
    GenericFilterProps<dateFilterTransformerType, 'date_range'>;

export type AmountRangeInputFilterProps = BaseFilterProps &
    GenericFilterProps<
        {
            defaultValue?: {
                range: {
                    min: number;
                    max: number;
                };
            };
        },
        'amount_range'
    >;

type ReferenceSelectTypeFilterProps = {
    valueKey?: string;
    labelKey?: string;
    subLabelKey?: string;
    queryIds?: string;
    methodParams?: any;
    initMethodSearchParam?: any;
    isCurrentUserShow?: boolean;
    controller_type: GenericListingType;
};
export type MultiSelectInputFilterProps = BaseFilterProps &
    GenericFilterProps<number[], 'multi_select'> &
    ReferenceSelectTypeFilterProps;

export type MultiSelectObjectInputFilterProps = BaseFilterProps &
    GenericFilterProps<ObjectDto, 'multi_select_object'> & {
        options: SelectBoxOption[];
        groupKey?: string;
    };

type SingleSelectValueType = string | number | boolean;

export type BooleanFilterProps = BaseFilterProps &
    GenericFilterProps<boolean, 'boolean'> & {
        positiveLabel?: string;
        negativeLabel?: string;
    };
export type SingleSelectInputFilterProps = BaseFilterProps &
    GenericFilterProps<SingleSelectValueType, 'select'> &
    Omit<ReferenceSelectTypeFilterProps, 'queryIds' | 'controller_type'> & {
        options?: SelectBoxOption[];
        detailKey?: string;
        [key: string]: any;
    };

export type DateInputFilterProps = BaseFilterProps &
    GenericFilterProps<any, 'date'>;

type MonthFilterProps = BaseFilterProps &
    GenericFilterProps<number, 'month_filter'>;

// customize group filter only for grouping of filter in display time and it hide on filter list
type CustomizeGroupFilterType = BaseFilterProps &
    Omit<any, 'customize_group'> & {
        groups: BaseFilterProps[];
        splitter?: '-' | ',' | ' ';
    };

export type ListFormFilterProps =
    | DateRangeInputFilterProps
    | AmountRangeInputFilterProps
    | MultiSelectObjectInputFilterProps
    | MultiSelectInputFilterProps
    | SingleSelectInputFilterProps
    | DateInputFilterProps
    | MonthFilterProps
    | BooleanFilterProps;
