/**
 * Type definition for the source of an icon.
 */
export type IconSourceType = string | (() => any);

/**
 * Type definition for the outline identifier of an icon.
 */
type OUTLINE_IDENTIFIER = 'circular' | 'rectangle';

/**
 * Props for the Icon component.
 *
 * @interface
 * @property {IconSourceType} source - The source of the icon. It can be a string or a function.
 * @property {Function} [onClick] - Event handler function to be called when the icon is clicked.
 * @property {number} [size] - The size of the icon in pixels.
 * @property {number | string} [height] - The height of the icon container. It can be a pixel value or 'auto'.
 * @property {string} [iconClass] - Additional CSS classes to be applied to the icon element.
 * @property {string} [className] - Additional CSS classes to be applied to the icon container.
 * @property {string} [iconColor] - The color of the icon. It can be a CSS class or a color value.
 * @property {boolean} [isSvg] - Indicates whether the icon source is an SVG component.
 * @property {OUTLINE_IDENTIFIER} [outlined] - The outline identifier of the icon.
 */
export type IconProps = {
    source: IconSourceType;
    onClick?: (_?: any) => void | unknown;
    size?: number;
    height?: number | string;
    iconClass?: string;
    className?: string;
    iconColor?: string;
    isSvg?: boolean;
    outlined?: OUTLINE_IDENTIFIER;
    fill?: string;
    hex?: string;
};
