import { ReactNode } from 'react';

/**
 * Represents the possible variants or styles for a typography component.
 * @typedef {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'} typographyVariant
 */
type typographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'i';

export interface TypographyProps {
    /**
     * Specifies the variant of the typography component.
     */
    variant?: typographyVariant;

    /**
     * Specifies the color of the typography component.
     */
    color?: keyof typeof typographyColors;

    /**
     * Specifies the size of the typography component.
     */
    size?: keyof typeof typographySizes;

    /**
     * Specifies additional CSS class(es) to be applied to the typography component.
     */
    className?: string;

    /**
     * The content to be rendered within the typography component.
     */
    children: ReactNode;

    /**
     * Specifies the weight (font thickness) of the typography component.
     */
    weight?: keyof typeof typographyWeight;
    /**
     * Sepecifies how the text shoud be transform.
     */
    textTransform?: transformTypes;
    /**
     * Specifies the type of text and set stype accordingly.
     */
    type?: keyof typeof typographyTypes;
    /**
     * link url if the typo is link.
     */
    link?: string;
    /**
     * How the click event on the link will behave.
     */
    target?: linkTargetTypes;
    /**
     * Specify how the link should look
     */
    linkDecoration?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Specify wheather to show style or not, This will remove all default style and only the classname style is valid
     */
    noStyle?: boolean;

    download?: any;
    forceLink?: boolean;

    role?: React.AriaRole;
    /**
     *
     * Handle Click Event
     */
    onClick?: (e: any) => void;
}

/**
 * Represents the available typography sizes for text.
 *
 * @constant
 * @type {{ small: string, normal: string, large: string, extralarge: string }}
 */
export const typographySizes = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base',
    extralarge: 'text-lg',

    '2xl': 'text-2xl',
};
/**
 * Represents the available typography colors for text.
 *
 * @constant
 * @type {{
 *    primary: string,
 *    secondary: string,
 *    neutral: string,
 *    accent: string,
 *    'text-primary': string,
 *    'text-secondary': string,
 *    'text-tertiary': string
 * }}
 */
export const typographyColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    neutral: 'text-neutral',
    accent: 'text-accent',
    'text-primary': 'text-base-primary',
    'text-secondary': 'text-base-secondary',
    'text-tertiary': 'text-base-tertiary',
    white: 'text-white',
};

/**
 * Represents the available typography weights for text.
 *
 * @constant
 * @type {{ normal: string, bold: string, extraBold: string }}
 */
export const typographyWeight = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-semibold',
    extraBold: 'font-bold',
};

/**
 * Represents the available typography types.
 *
 * @constant
 * @type {Object.<string, string>}
 * @property {string} title - The CSS class for the title typography type.
 * @property {string} heading - The CSS class for the heading typography type.
 * @property {string} subHeading - The CSS class for the subHeading typography type.
 * @property {string} info - The CSS class for the info typography type.
 * @property {string} subInfo - The CSS class for the subInfo typography type.
 */
export const typographyTypes = {
    title: 'text-xl font-bold',
    heading: 'text-lg font-semibold',
    subHeading: 'text-base font-medium',
    info: 'text-sm font-normal',
    subInfo: 'text-xs',
};
/**
 * The available transformation types for text.
 * - 'uppercase': Transforms the text to uppercase.
 * - 'lowercase': Transforms the text to lowercase.
 * - 'capitalize': Capitalizes the first letter of each word in the text.
 */
type transformTypes = 'uppercase' | 'lowercase' | 'capitalize';

/**
 * The available target types for HTML anchor links.
 * - '_blank': Opens the linked document in a new browser window or tab.
 * - '_self': Opens the linked document in the same window or tab.
 * - '_parent': Opens the linked document in the parent frame or window, if it exists.
 * - '_top': Opens the linked document in the full body of the window, replacing all frames.
 */
export type linkTargetTypes = '_blank' | '_self' | '_parent' | '_top';
