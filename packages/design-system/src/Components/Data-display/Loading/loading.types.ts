/**
 * Represents the props for the Loading component.
 * @interface LoadingProps
 */
export interface LoadingProps {
    /**
     * The size of the loading component.
     * @type {keyof typeof loadingSizes}
     * @default undefined
     */
    size?: keyof typeof loadingSizes;

    /**
     * The color of the loading component.
     * @type {keyof typeof loadingColor}
     * @default undefined
     */
    color?: keyof typeof loadingColor;

    /**
     * The type of loading indicator to display.
     * @type {keyof typeof loadingType}
     * @default undefined
     */
    type?: keyof typeof loadingType;

    /**
     * Indicates whether the loading should be stopped and not rendered.
     * @type {boolean}
     * @default false
     */
    stop?: boolean;
}

/**
 * Represents the available loading sizes.
 * @constant
 * @type {{ xs: string, sm: string, md: string, lg: string }}
 */
export const loadingSizes = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'loading-xl',
};

/**
 * Represents the available loading colors.
 * @constant
 * @type {{ primary: string, secondary: string, accent: string, neutral: string, white: string }}
 */
export const loadingColor = {
    primary: 'text-primary',
    success: 'text-success',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    white: 'text-base-100',
};

/**
 * Represents the available loading types.
 * @constant
 * @type {{ infinity: string, bars: string, balls: string, rings: string, dots: string, spinner: string }}
 */
export const loadingType = {
    infinity: 'loading-infinity',
    bars: 'loading-bars',
    balls: 'loading-ball',
    rings: 'loading-ring',
    dots: 'loading-dots',
    spinner: 'loading-spinner',
};
