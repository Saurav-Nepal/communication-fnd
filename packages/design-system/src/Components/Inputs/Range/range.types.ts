/**
 * Props for the Range component.
 */
export interface RangeProps {
    /**
     * The minimum value of the range.
     */
    min?: number;

    /**
     * The maximum value of the range.
     */
    max?: number;

    /**
     * The current value of the range.
     */
    value?: number;

    /**
     * Additional CSS class name(s) for the range component.
     */
    className?: string;

    /**
     * The size of the range component.
     */
    size?: keyof typeof RangeSizes;

    /**
     * The appearance style of the range component.
     */
    appreance?: keyof typeof RangeAppreances;

    /**
     * The step increment/decrement for the range component.
     */
    step?: number;

    /**
     * Callback function called when the range value changes.
     * Receives the new value and the event object as parameters.
     */
    onChange?: (val: number | string, e: any) => void;

    /**
     * Specifies whether the exact value should be returned as a number.
     * If false, the value is returned as a string.
     */
    giveExactvalue?: boolean;
}

/**
 * Sizes for the Range component.
 */
export const RangeSizes = {
    xs: 'range-xs',
    sm: 'range-sm',
    md: 'range-md',
    lg: 'range-lg',
};

/**
 * Appearance styles for the Range component.
 */
export const RangeAppreances = {
    primary: 'range-primary',
    secondary: 'range-secondary',
    accent: 'range-accent',
    neutral: 'range-neutral',
    warning: 'range-warning',
    info: 'range-info',
    error: 'range-error',
};
