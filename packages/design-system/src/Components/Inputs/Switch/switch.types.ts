/**
 * Switchprops that will help to customize the component
 */
export interface SwitchProps {
    size?: keyof typeof SwitchSizes; // Optional size of the switch: xs, sm, md, lg, xl
    color?: keyof typeof SwitchColors; // Optional color of the switch: primary, secondary, accent, neutral, info, warning, error
    disabled?: boolean; // Indicates if the switch is disabled
    checked?: boolean; // Indicates if the switch is checked
    onChange?: (value: boolean, e: any) => void; // Event handler for when the switch value changes
}

/**
 *
 * Sizes for switch component
 */
export const SwitchSizes = {
    xs: 'toggle-xs', // Extra-small size of the switch
    sm: 'toggle-sm', // Small size of the switch
    md: 'toggle-md', // Medium size of the switch
    lg: 'toggle-lg', // Large size of the switch
    xl: 'toggle-xl', // Extra-large size of the switch
};

/**
 * Colors for the Switch Component
 */
export const SwitchColors = {
    primary: 'toggle-primary', // Primary color of the switch
    secondary: 'toggle-secondary', // Secondary color of the switch
    accent: 'toggle-accent', // Accent color of the switch
    neutral: 'toggle-neutral', // Neutral color of the switch
    info: 'toggle-info', // Info color of the switch
    warning: 'toggle-warning', // Warning color of the switch
    error: 'toggle-error', // Error color of the switch
};
