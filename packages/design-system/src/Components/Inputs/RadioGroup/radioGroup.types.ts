/**
 * Represents the props for a radio group component.
 */
export interface RadioGroupProps {
    value?: string | number | boolean;
    defaultValue?: string | number;
    name?: string;
    direction?: 'horizontal' | 'vertical';
    options: RadioGroupOption[];
    size?: keyof typeof sizeTypes;
    appearance?: keyof typeof appearanceTypes;
    variant?: 'default' | 'block';
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value: string | number | boolean) => void;
    label?: string;
    error?: string;
    required?: boolean;
    containerClassName?: string;
}

/**
 * Represents an option within a radio group.
 */
export interface RadioGroupOption {
    value: string | number | boolean;
    label: string;
}

/**
 * Object representing the appearance types of a radio group.
 */
export const appearanceTypes = {
    default: '',
    primary: 'radio-primary',
    secondary: 'radio-secondary',
    accent: 'radio-accent',
    info: 'radio-info',
    success: 'radio-success',
    warning: 'radio-warning',
    error: 'radio-error',
};
export const appearanceText = {
    default: '',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
};

/**
 * Object representing the size types of a radio group.
 */
export const sizeTypes = {
    xs: 'radio-xs',
    sm: 'radio-sm',
    md: 'radio-md',
    lg: 'radio-lg',
};
