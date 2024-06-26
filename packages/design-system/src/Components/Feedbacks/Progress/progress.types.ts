// Defines the ProgressProps interface that configures the appearance of a progress component
export interface ProgressProps {
    backgroundColor?: keyof typeof backgroundColors; // Optional background color option: primary, secondary, neutral, or accent
    indicatorColor?: keyof typeof indicatorColors; // Optional indicator color option: primary, secondary, neutral, or accent
    value: number; // Required current progress value (0 to 100)
    size?: keyof typeof progressSizes; // Optional size option: xs, sm, md, or lg
    animation?: boolean; // Determines Weather the animation should take place or not
    showValue?: boolean; // Determines Weather To show the data in middle
    className?: string; // Optional CSS class name
    indicatorClassName?: string; // Optional CSS class name for the indicator
}

// Object that maps background color options to CSS classes
export const backgroundColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    neutral: 'bg-neutral',
    accent: 'bg-accent',
    success: 'bg-success',
    base: 'bg-base-200',
    'base-300': 'bg-base-300',
};

// Object that maps indicator color options to CSS classes
export const indicatorColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    neutral: 'bg-neutral',
    accent: 'bg-accent',
    success: 'bg-success',
    base: 'bg-base-200',
    'success-light': 'bg-[#A0CABC]',
    warning: 'bg-warning',
    error: 'bg-error',
};

// Object that maps size options to CSS classes
export const progressSizes = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
};
