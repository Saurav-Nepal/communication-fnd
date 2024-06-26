import { InputHTMLAttributes } from 'react';
import { ActionMeta, MenuPlacement } from 'react-select';

export interface SelectBoxProps
    extends Omit<
        InputHTMLAttributes<HTMLSelectElement>,
        'size' | 'translate' | 'prefix' | 'onKeyDown'
    > {
    label?: React.ReactNode | string;
    defaultLabel?: string;
    value?: any;
    defaultValue?: any;
    options?: SelectBoxOption[] | GroupedOption[];
    width?: number | string;
    mainClassName?: string;
    labelClassName?: string;
    containerClassName?: string;
    footer?: React.ReactNode;
    prefix?: React.ReactNode | string;
    isSearchable?: boolean;
    isClearable?: boolean;
    isMulti?: boolean;
    isRequired?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    isAsync?: boolean;
    isGrouped?: boolean;
    error?: string;
    warning?: string;
    message?: React.ReactNode;
    messageComponent?: React.ReactNode;
    translate?: boolean;
    noBorder?: boolean;
    isAsyncCreatable?: boolean;
    hasPrefix?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'normal';
    menuPosition?: 'fixed' | 'absolute';
    menuPlacement?: MenuPlacement;
    getOptions?: (input: string, callback: (options: any) => void) => void;
    onChange?(option: any, actionMeta?: ActionMeta<SelectBoxOption>): void;
    onFocus?(e: any): void;
    onBlur?(e: any): void;
    footerClick?(refetchOptions?: () => void): void;
    autoFocus?: boolean;
    menuIsOpen?: boolean | undefined;
    selectBoxControlClassName?: string;
    onOptionChangeOnly?: (option: any) => void;
    refetchOptions?: () => void;
    enableAllOptions?: boolean;
    allOptionText?: string;
}

// export interface SelectBoxProps {
//     label?: React.ReactNode | string;
//     defaultLabel?: string;
//     value?: any;
//     defaultValue?: any;
//     placeholder?: string;
//     name?: string;
//     options?: SelectBoxOption[] | GroupedOption[];
//     width?: number | string;
//     className?: string;
//     mainClassName?: string;
//     labelClassName?: string;
//     footer?: React.ReactNode;
//     prefix?: React.ReactNode | string;
//     isSearchable?: boolean;
//     isClearable?: boolean;
//     isMulti?: boolean;
//     isRequired?: boolean;
//     isLoading?: boolean;
//     isDisabled?: boolean;
//     isAsync?: boolean;
//     error?: string;
//     warning?: string;
//     message?: React.ReactNode;
//     messageComponent?: React.ReactNode;
//     translate?: boolean;
//     noBorder?: boolean;
//     isAsyncCreatable?: boolean;
//     hasPrefix?: boolean;
//     size?: 'sm' | 'md' | 'lg';
//     menuPosition?: 'fixed' | 'absolute';
//     menuPlacement?: MenuPlacement;
//     getOptions?: (input: string, callback: (options: any) => void) => void;
//     onChange?(option: any, actionMeta?: ActionMeta<SelectBoxOption>): void;
//     onFocus?(e: any): void;
//     onBlur?(e: any): void;
//     footerClick?(refetchOptions?: () => void): void;
//     autoFocus?: boolean;
//     menuIsOpen?: boolean | undefined;
//     selectBoxControlClassName?: string;
//     onOptionChangeOnly?: (option: any) => void;
//     refetchOptions?: () => void; // it helps to refetch api options in some footer operation
// }

export type GroupedOption = {
    label: string;
    options: SelectBoxOption[];
};

export type SelectBoxOption = {
    value: any;
    label: string;
    subLabel?: string;
    isDisabled?: boolean;
    isFixed?: boolean;
    isVisible?: boolean;
    prefix?: React.ReactNode;
    [key: string]: any;
};
