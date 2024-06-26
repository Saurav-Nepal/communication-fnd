/**
 * @author Sirjan Tamang
 */
'use client';

import { useCallback, useMemo } from 'react';

import { useApp } from '@finnoto/core';

import { cn, IsEmptyObject } from '../../../Utils/common.ui.utils';
import { Button } from '../../Inputs/Button/button.component';
import { Icon } from '../Icon/icon.component';
import { Typography } from '../Typography/typography.component';
import {
    arcDefaultProps,
    arcLeftProps,
    ArcTitleDescriptionTextSize,
    defaultProps,
    IconSize,
    NoDataFoundProps,
    TitleDescriptionTextSize,
} from './noDataFound.types';

import { AddSvgIcon, ArcNoDataSvgIcon, BigNoDocumentSvgIcon } from 'assets';

/**
 * NoDataFound component for displaying a message when no data is found.
 * @param {Object} props - The component props.
 * @param {ReactNode} [props.icon] - The custom icon to display.
 * @param {string} [props.title='No records are available'] - The title of the no data message.
 * @param {string} [props.size='md'] - The size of the component ('lg' or 'md').
 * @param {string} [props.description] - The description text.
 * @param {Object} [props.button] - The button configuration object.
 * @param {string} [props.className] - Additional CSS class names.

 * @param {ReactNode} [props.children] - Additional children elements.
 * @param {boolean} [props.enableAddNew=true] - Whether to enable the "Add New" button.
 * @returns {ReactNode} The rendered NoDataFound component.
 */
export const NoDataFound = ({
    icon,
    title = 'No records',
    size = 'md',
    description = 'There are no records available',
    button,
    className,
    children,
    enableAddNew = true,
    customIconSize,
    leftButton,
    name,
    showIcon = true,
    titleClassName,
}: NoDataFoundProps) => {
    const { isArc } = useApp();

    const textSizes = useMemo(
        () => (isArc ? ArcTitleDescriptionTextSize : TitleDescriptionTextSize),
        [isArc]
    );

    const sanitizedName = useMemo(() => {
        const buttonName = button?.name || name;
        if (isArc) {
            const lastChar = buttonName?.charAt(buttonName.length - 1);

            if (lastChar === 's') return buttonName?.slice(0, -1);
            return buttonName;
        }
        return buttonName;
    }, [isArc, name, button]);

    const addNewaction = useCallback(() => {
        if (!enableAddNew) return <></>;

        if (isArc && (!IsEmptyObject(leftButton) || !IsEmptyObject(button))) {
            return (
                <div className='flex gap-2'>
                    {leftButton && (
                        <Button
                            {...({
                                ...arcLeftProps,
                                ...leftButton,
                            } as any)}
                        >
                            {leftButton?.name}
                        </Button>
                    )}
                    {button && (
                        <Button
                            {...({
                                ...arcDefaultProps,
                                ...button,
                            } as any)}
                        >
                            Add {sanitizedName}
                        </Button>
                    )}
                </div>
            );
        }

        if (!IsEmptyObject(button))
            return (
                <Button
                    {...({
                        ...defaultProps,
                        ...button,
                    } as any)}
                >
                    <div className='items-center gap-2 row-flex'>
                        <Icon source={AddSvgIcon} isSvg />
                    </div>
                    {button?.name}
                </Button>
            );
        return <></>;
    }, [button, enableAddNew, isArc, leftButton, name]);

    const { iconSize, titleSize, descriptionSize } = useMemo(() => {
        if (size === 'lg') {
            return {
                iconSize: IconSize['lg'],
                titleSize: textSizes['lg'],
                descriptionSize: textSizes['sm'],
            };
        }
        return {
            iconSize: IconSize['md'],
            titleSize: textSizes['md'],
            descriptionSize: textSizes['xs'],
        };
    }, [size, textSizes]);
    return (
        <div
            id='no-data-available'
            className={cn(
                'items-center justify-center h-full py-6 my-auto text-center col-flex',
                className
            )}
        >
            {showIcon && (
                <Icon
                    size={customIconSize || iconSize}
                    source={
                        icon || isArc ? ArcNoDataSvgIcon : BigNoDocumentSvgIcon
                    }
                    isSvg
                />
            )}

            <div className='my-4 space-y-1.5 col-flex'>
                <Typography
                    variant='p'
                    className={cn(
                        `font-medium text-base-primary`,
                        titleSize,
                        titleClassName
                    )}
                >
                    {title}
                </Typography>
                {description && (
                    <Typography
                        variant='p'
                        className={cn(` text-base-tertiary`, descriptionSize)}
                    >
                        {description}
                    </Typography>
                )}
            </div>
            {addNewaction()}
            {children}
        </div>
    );
};
