import { CSSProperties } from 'react';

import { getCardColorShades, useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../Icon/icon.component';
import { Tooltip } from '../Tooltip/Tooltip.component';
import {
    badgeCircleIconColor,
    BadgeCircleIconType,
    BadgeInterface,
    sizeClass,
    statusColor,
    statusColorSolid,
} from './badge.types';

import {
    ArcBadgeCircleDotted,
    ArcBadgeCircleOutline,
    ArcBadgeCircleSolid,
    ArcProgressIndicatorSvgIcon,
} from 'assets';

/**
 * Renders a badge component with customizable options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The text label of the badge.
 * @param {string} [props.size='md'] - The size of the badge. Possible values are 'sm', 'md', 'lg'.
 * @param {string} [props.appearance='base'] - The appearance style of the badge. Possible values are 'base', 'primary', 'secondary', 'success', 'warning', 'danger'.
 * @param {string} [props.className] - Additional CSS class names to apply to the badge container.
 * @param {string} [props.rightIconClassName] - Additional CSS class names to apply to the right icon.
 * @param {React.Component} [props.lefticon=null] - The left icon component to display.
 * @param {React.Component} [props.rightIcon=null] - The right icon component to display.
 * @param {Function} [props.onRightIconClick=null] - The callback function invoked when the right icon is clicked.
 * @param {Function} [props.onClick=null] - The callback function invoked when the badge is clicked.
 * @param {boolean} [props.solid=false] - Determines if the badge has a solid background color.
 * @param {React.Component} [props.leftComponent] - Additional component to display on the left side of the badge label.
 * @param {boolean} [props.showIconOnHover=false] - Determines if the right icon is shown only on hover.
 * @returns {React.Component} The rendered Badge component.
 */
export const Badge = ({
    label,
    size = 'md',
    appearance = 'base',
    className,
    rightIconClassName,
    lefticon,
    rightIcon,
    onRightIconClick,
    onClick,
    solid,
    leftComponent,
    showIconOnHover,
    leftIconSize = 16,
    outline,
    onlyText = false,
    leftIconColor,
    hex,
    circle,
    ...rest
}: BadgeInterface) => {
    const backgroundStyle: CSSProperties = hex
        ? { backgroundColor: hex.bg, color: hex.text }
        : {};

    return (
        <div
            className={cn(
                'text-center badge-component font-medium rounded inline-flex w-fit  gap-3 items-center  whitespace-nowrap', //default css
                solid ? statusColorSolid[appearance] : statusColor[appearance],
                sizeClass[size],
                {
                    'rounded-sm': sizeClass[size] === 'xs',
                    'badge-outline border': outline,
                    'group/badge': !onlyText,
                    'h-0 w-fit': onlyText,
                    'rounded-full': circle,
                },
                className
            )}
            style={backgroundStyle}
            onClick={onClick}
            {...rest}
        >
            {lefticon && (
                <Icon
                    source={lefticon}
                    size={leftIconSize}
                    isSvg
                    iconColor={leftIconColor}
                />
            )}
            {leftComponent}
            {label}
            {rightIcon && (
                <Icon
                    className={cn(rightIconClassName, {
                        'sm:opacity-0 group-hover/badge:opacity-100':
                            showIconOnHover,
                    })}
                    source={rightIcon}
                    size={10}
                    isSvg
                    onClick={onRightIconClick}
                />
            )}
        </div>
    );
};

export interface BadgeCircleIconProps {
    type: BadgeCircleIconType;
    className?: string;
    appearance?: keyof typeof badgeCircleIconColor;
    tooltip?: {
        visible: boolean;
        text: string;
    };
    size?: number;
    hex?: {
        bg: string;
        text: string;
    };
}

export const BadgeCircleIcon = ({
    type,
    className,
    appearance,
    tooltip,
    size = 16,
    hex,
}: BadgeCircleIconProps) => {
    let badgeSource = null;
    switch (type) {
        case 'solid':
            badgeSource = ArcProgressIndicatorSvgIcon;
            break;
        case 'outline':
            badgeSource = ArcBadgeCircleOutline;
            break;
        case 'dotted':
            badgeSource = ArcBadgeCircleDotted;
            break;
        default:
            badgeSource = ArcBadgeCircleSolid;
            break;
    }

    if (tooltip?.visible) {
        return (
            <Tooltip message={tooltip.text} asChild={false}>
                <Icon
                    source={badgeSource}
                    size={size}
                    isSvg
                    className={cn(badgeCircleIconColor[appearance], className)}
                    hex={hex?.bg}
                />
            </Tooltip>
        );
    }

    return (
        <Icon
            source={badgeSource}
            size={size}
            isSvg
            className={cn(badgeCircleIconColor[appearance], className)}
            hex={hex?.bg}
        />
    );
};
