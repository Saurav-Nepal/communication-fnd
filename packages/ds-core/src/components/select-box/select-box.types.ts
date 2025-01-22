import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { ObjectDto } from '@slabs/ds-utils';

import { InputProps } from '../inputs/input/input.types';

export const SelectBoxVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);
export type SelectBoxValueType = string | number | boolean | null;
export type SelectBoxOptionType = {
    value: SelectBoxValueType;
    label: string;
    subLabel?: (item: ObjectDto) => React.ReactNode;
    disabled?: boolean;
    data?: ObjectDto;
};

export interface GroupOptionsType {
    label: string;
    options: SelectBoxOptionType[];
}
export type SuffixPrefixOptionType =
    | React.ReactNode
    | ((option: SelectBoxOptionType) => React.ReactNode);
export interface GenericSelectBoxProps<TValue>
    extends Omit<
            HTMLAttributes<HTMLDivElement>,
            | 'size'
            | 'translate'
            | 'prefix'
            | 'onKeyDown'
            | 'onChange'
            | 'value'
            | 'defaultValue'
        >,
        VariantProps<typeof SelectBoxVariants> {
    options?: Array<SelectBoxOptionType | GroupOptionsType>;
    defaultValue?: TValue;
    value?: TValue;
    className?: string;
    onChange?: (value?: TValue) => void;
    placeholder?: string;
    onOptionChange?: (option?: SelectBoxOptionType) => void;
    disabled?: boolean;
    isSearchable?: boolean;
    onSearchValue?: (value?: string) => void;
    isSearchLoading?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    searchValue?: string;
    isClearable?: boolean;
    isUnSelectable?: boolean;
    formatGroupLabel?: (data: GroupOptionsType) => React.ReactNode;
    footerComponent?: React.ReactNode;
    hasError?: boolean;
    noDataComponent?: React.ReactNode;
}
export type SelectBoxProps = GenericSelectBoxProps<SelectBoxValueType> & {
    prefix?: SuffixPrefixOptionType;
    suffix?: SuffixPrefixOptionType;
    onCreateNew?: () => void;
    createNewLabel?: string;
    variants?: {
        variant?: InputProps['variant'];
        color?: InputProps['color'];
        size?: InputProps['size'];
        radius?: InputProps['radius'];
    };
    isLoading?: boolean;
    labelClassName?: string;
};

export const selectBoxHoverStyles = {
    primary: 'hover:text-primary',
    success: 'hover:text-success',
    error: 'hover:text-error',
    warning: 'hover:text-warning',
    info: 'hover:text-info',
    default: 'hover:text-secondary-foreground',
    accent: 'hover:text-accent',
};

export const selectBoxItemsSize = {
    sm: 'h-8 text-xs leading-8',
    md: 'text-sm leading-9 h-9',
    lg: 'h-10 text-sm leading-10',
    xl: 'h-12 text-base leading-[48px]',
};
