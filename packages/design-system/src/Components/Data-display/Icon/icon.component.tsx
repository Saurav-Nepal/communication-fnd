/**
 * Image icon component for Icon, Rectangle Icon, Oval Icon, Floating icon
 *
 * This component is responsible for rendering different types of icons, including material icons, SVG icons, and image icons. It provides flexibility in displaying icons with various shapes and styles.
 */

import Image from 'next/image';
import { CSSProperties, memo, useMemo } from 'react';

import { ObjectDto } from '@finnoto/core';

import { cn, IsValidString } from '../../../Utils/common.ui.utils';
import { IconProps } from './icon.types';

/**
 *
 * @author Saurav Nepal
 *
 *
 * @description Icon component that renders different types of icons.
 *
 * @component
 * @param {Object} props - The icon component props.
 * @param {string | (() => string)} props.source - The icon source. It can be a string for material icons, a function that returns an image source, or an SVG component.
 * @param {string} [props.className] - Additional CSS classes to be applied to the icon container.
 * @param {string} [props.iconClass] - Additional CSS classes to be applied to the icon element.
 * @param {boolean} [props.outlined] - Indicates whether the icon should be outlined.
 * @param {string} [props.iconColor='text-current'] - The color of the icon. It can be a CSS class or a color value.
 * @param {Function} [props.onClick] - Event handler function to be called when the icon is clicked.
 * @param {number} [props.size=20] - The size of the icon in pixels.
 * @param {string | number} [props.height='auto'] - The height of the icon container. It can be a pixel value or 'auto'.
 * @param {boolean} [props.isSvg=false] - Indicates whether the icon source is an SVG component.
 * @returns {JSX.Element} The rendered Icon component.
 */
export const Icon = memo(
    ({
        source,
        className,
        iconClass,
        outlined,
        iconColor = 'text-current',
        onClick,
        size = 20,
        height = 'auto',
        isSvg = false,
        fill,
        hex,
    }: IconProps) => {
        const CircularStyle = `icon-container  rounded-full`;
        const RectangleStyle = `icon-container rounded`;

        /**
         * Gets the container style based on the outline type.
         *
         * @param {string} [type] - The outline type of the icon.
         * @returns {string} The container style class name.
         */
        const getContainerStyle = (type?: string): string => {
            const styles: any = {
                circular: cn(CircularStyle, className),
                rectangle: cn(RectangleStyle, className),
                default: cn('icon-container', className),
            };

            return styles[type || 'default'];
        };

        const backgroundStyle = useMemo<CSSProperties>(() => {
            if (hex)
                return {
                    color: hex,
                };
            return {};
        }, [hex]);

        return (
            <div
                onClick={onClick}
                className={getContainerStyle(outlined)}
                style={backgroundStyle}
            >
                <IconDisplay
                    source={source}
                    iconColor={iconColor}
                    iconClass={iconClass}
                    size={size}
                    isSvg={isSvg}
                    height={height}
                    fill={fill}
                />
            </div>
        );
    }
);

/**
 * Renders the icon based on the provided source.
 *
 * @param {Object} props - The icon display component props.
 * @param {string | (() => string)} props.source - The icon source. It can be a string for material icons, a function that returns an image source, or an SVG component.
 * @param {string | number} [props.height] - The height of the icon. It can be a pixel value or 'auto'.
 * @param {number} props.size - The size of the icon in pixels.
 * @param {string} props.iconClass - Additional CSS classes to be applied to the icon element.
 * @param {string} props.iconColor - The color of the icon. It can be a CSS class or a color value.
 * @param {boolean} props.isSvg - Indicates whether the icon source is an SVG component.
 * @returns {JSX.Element} The rendered IconDisplay component.
 */
const IconDisplay = ({
    source,
    height,
    size,
    iconClass,
    iconColor,
    isSvg,
    fill,
}: any) => {
    const iconStyle = { height: height || size, width: size };

    // return <></>;

    if (IsValidString(source)) {
        return (
            <i
                style={{ fontSize: size }}
                className={`material-icons ${iconClass} ${iconColor}`}
            >
                {source}
            </i>
        );
    }

    if (isSvg) {
        const SVGComp = source;

        const svgIconProps: ObjectDto = {};
        if (fill) svgIconProps.fill = fill;

        return (
            <div style={iconStyle} className={`${iconClass} ${iconColor}`}>
                <SVGComp {...svgIconProps} />
            </div>
        );
    }

    return (
        <Image
            style={iconStyle}
            className={`${iconClass} ${iconColor}`}
            width={size}
            height={size}
            src={source() as any}
            alt='icon'
        />
    );
};
