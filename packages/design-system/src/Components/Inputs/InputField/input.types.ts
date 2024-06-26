/**
 * Interface representing the props for an input field component.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, ReactNode } from 'react';
import { SuggestionDataItem } from 'react-mentions';

export const inputVariants = cva('input input-bordered', {
    variants: {
        size: {
            xs: 'input-xs',
            sm: 'input-sm',
            md: 'input-md',
            lg: 'input-lg',
            normal: 'input-normal',
        },

        isAmount: {
            true: 'input-amount',
        },
        smallWidth: {
            true: 'max-w-[450px]',
        },
        isVerified: {
            true: 'input-verified',
        },
        isError: {
            true: 'input-error',
            false: 'input-default',
        },
    },
    /**
     * @todo: defaultVariants is not working giving error in lable
     */
    // defaultVariants: {
    //     size: 'md',
    // },
});

export const inputContainerVariants = cva('', {
    variants: {
        containerSize: {
            xs: 'container-input-xs',
            sm: 'container-input-sm',
            md: 'container-input-md',
            lg: 'container-input-lg',
            normal: 'container-input-normal',
        },
        disabled: {
            true: 'input-container-disabled',
        },
    },
});

export const inputGroupVariants = cva('input-group', {
    variants: {
        InputGroupSizes: {
            xs: 'input-group-xs',
            sm: 'input-group-sm',
            md: 'input-group-md',
            lg: 'input-group-lg',
            normal: 'input-group-normal',
        },
    },
});

export const inputGroupAddonVariants = cva('input-addon-group', {
    variants: {
        InputGroupSizes: {
            xs: 'input-group-xs',
            sm: 'input-group-sm',
            md: 'input-group-md',
            lg: 'input-group-lg',
            normal: 'input-group-normal',
        },
    },
});

export interface InputFieldProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            | 'onChange'
            | 'autoComplete'
            | 'prefix'
            | 'size'
            | 'max'
            | 'min'
            | 'value'
            | 'disabled'
            | 'error'
        >,
        VariantProps<typeof inputVariants>,
        VariantProps<typeof inputContainerVariants>,
        VariantProps<typeof inputGroupVariants> {
    onChange?(value: any): void;
    onDebounceChange?(value: any): void;
    onBlur?(value: any): void;
    onCopy?(value: any): void;
    onPaste?(value: any): void;
    onAsyncBlur?(value: any, next: () => void): void;
    onClick?(e: any): void;
    onFocus?(e: any): void;
    onEnter?(value: any, e: React.KeyboardEvent<HTMLInputElement>): void;
    onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    addonStart?: React.ReactNode;
    addonEnd?: React.ReactNode;
    addonStartClassName?: string;
    addonEndClassName?: string;
    error?: string | string[];
    max?: number;
    min?: number;
    autoFocus?: boolean;
    autoComplete?: boolean;
    autoUppercase?: boolean;
    inputClassName?: string;
    groupClassName?: string;
    label?: React.ReactNode | string;
    placeholder?: any;
    debounceParams?: DebouceParams;
    message?: React.ReactNode;
    messageComponent?: React.ReactNode;
    isLoading?: boolean;
    warning?: string;
    trimSpecialChar?: boolean;
    trimString?: boolean;
    value?: any;
    defaultValidInput?: boolean;
    labelClassName?: string;
    maxDecimals?: number;
}

export interface InputErrorMessageInterface {
    error?: string | string[];
    warning?: string;
    className?: string;
}
export interface LabelInterface
    extends Omit<InputErrorMessageInterface, 'warning'> {
    label?: string | ReactNode;
    name?: string;
    className?: string;
    required?: boolean;
    verified?: boolean;
    rightComponent?: ReactNode;
    value?: string;
    id?: string;
}

export interface FormControlInterface {
    children: ReactNode;
    containerClass?: string;
    className?: string;
}
export interface InputMessageInterface
    extends Omit<InputErrorMessageInterface, 'warning'> {
    message?: React.ReactNode;
    messageComponent?: React.ReactNode;
}

/**
 * Interface representing the debounce parameters.
 */
type DebouceParams = {
    wait?: number;
    immediate?: boolean;
};

export interface MentionFieldInputProps extends InputFieldProps {
    mentionTrigger?: '@' | '#';
    mentionContextData: SuggestionDataItem[];
}
