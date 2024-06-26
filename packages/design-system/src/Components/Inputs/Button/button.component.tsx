'use client';

import { forwardRef, useEffect, useState } from 'react';

import { IsFunction, IsUndefined } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Loading } from '../../Data-display/Loading/loading.component';
import { ButtonProps, buttonVariants } from './button.types';
import { getIconSizeForButton } from './button.utils';

/**
 * Primary Button UI component for user interaction
 */

export const Button = forwardRef(
    (
        {
            shape,
            className,
            size,
            appearance,
            outline,
            wide,
            block,
            dashed,
            disabled,
            noAnimation,
            children,
            autoFocus,
            type,
            addTimeout,
            onClick,
            buttonIcon,
            onTouchStart = () => {},
            onMouseEnter = () => {},
            onMouseLeave = () => {},
            handleKeyDown,
            defaultMinWidth,
            noHover,
            progress,
            loading: loadingProp,
            buttonIconAlign = 'left',
            loadingAppear,
            ...props
        }: ButtonProps,
        ref: any
    ) => {
        const [loading, setLoading] = useState<boolean>(false);

        useEffect(() => {
            if (!IsUndefined(loadingProp)) {
                setLoading(loadingProp);
            }
        }, [loadingProp]);

        const next = () => {
            setLoading(false);
        };

        const handleOnClick = (e: any) => {
            if (loading) {
                e.preventDefault();
                return;
            }
            if (progress) {
                setLoading(true);
                /* after few seconds button will be enabled */
                if (addTimeout) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 400);
                }
            }
            if (IsFunction(onClick)) {
                e.preventDefault();
                e.stopPropagation();
                onClick(next, e);
            }
        };

        const classes = cn(
            buttonVariants({
                shape,
                size,
                appearance,
                outline,
                wide,
                block,
                dashed,
                noAnimation,
                defaultMinWidth,
                noHover,
            }),
            className
        );

        return (
            <button
                className={classes}
                disabled={disabled}
                onClick={handleOnClick}
                onTouchStart={onTouchStart}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                type={type}
                ref={ref}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...props}
            >
                {/* Render the button contents */}
                {buttonIcon || loading ? (
                    <div
                        className={cn('flex items-center gap-2', {
                            'flex-row-reverse': buttonIconAlign === 'right',
                        })}
                    >
                        {loading ? (
                            <Loading color={loadingAppear} size='xs' />
                        ) : (
                            <Icon
                                iconColor={'text-primary-content'}
                                size={getIconSizeForButton(size)}
                                source={buttonIcon}
                                isSvg
                            />
                        )}
                        {children}
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);
