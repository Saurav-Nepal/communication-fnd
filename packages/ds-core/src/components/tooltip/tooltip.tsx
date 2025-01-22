import React from 'react';

import { cn } from '@slabs/ds-utils';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import {
    tooltipArrowVariants,
    TooltipProps,
    tooltipVariants,
} from './tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    message,
    variant,
    className,
    open,
    defaultOpen,
    radius,
    delayDuration,
    type,
    position,
    arrow,
    sideOffset,
    onOpenChange,
    ...props
}) => {
    const messageClass = cn(
        tooltipVariants({
            variant,
            radius,
        }),
        className
    );
    const arrowClass = cn(
        tooltipArrowVariants({
            variant,
        })
    );
    return (
        <TooltipPrimitive.TooltipProvider>
            <TooltipPrimitive.Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                delayDuration={delayDuration}
            >
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    className={messageClass}
                    side={type}
                    align={position}
                    sideOffset={sideOffset}
                    {...props}
                >
                    {message}
                    {arrow && <TooltipPrimitive.Arrow className={arrowClass} />}
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.TooltipProvider>
    );
};
