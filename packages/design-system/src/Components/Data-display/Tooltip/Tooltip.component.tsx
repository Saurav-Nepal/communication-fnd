/**
 * @author Sirjan Tamang
 */
'use client';

import { forwardRef, useState } from 'react';

import { cn } from '../../../Utils/common.ui.utils';
import {
    RootTooltip,
    ToolTipArrow,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './Tooltip.core';
import { TooltipInterface } from './tooltip.types';

/**
 * Tooltip component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string | ReactNode} props.message - The tooltip message.
 * @param {string} [props.trigger='hover'] - The trigger event for displaying the tooltip. Defaults to 'hover'.
 * @param {number} [props.displayDelay=400] - The delay duration (in milliseconds) before displaying the tooltip. Defaults to 400.
 * @param {ReactNode} props.children - The child elements of the Tooltip component.
 * @param {boolean} props.open - Indicates whether the tooltip is open for controlled case.
 * @param {function} props.onOpenChange - Callback function called when the tooltip open state changes.
 * @param {boolean} props.isArrow - Indicates whether the tooltip has an arrow.
 * @returns {ReactElement} The rendered Tooltip component.
 */
export const Tooltip = forwardRef(
    (
        {
            message,
            trigger = 'hover',
            displayDelay = 400,
            children,
            open: openProps,
            onOpenChange,
            isArrow,
            className,
            align,
            sideOffset,
            asChild = true,
            messageClassName,
            triggerClassName,
            ...props
        }: TooltipInterface,
        ref: any
    ) => {
        const [open, setOpen] = useState<boolean>(
            trigger === 'click' ? false : openProps
        );

        return (
            <TooltipProvider delayDuration={displayDelay}>
                <RootTooltip open={open} onOpenChange={onOpenChange}>
                    <TooltipTrigger
                        onClick={() => {
                            trigger === 'click' && setOpen(true);
                        }}
                        asChild={asChild}
                        className={cn(triggerClassName)}
                        {...props}
                        ref={ref}
                    >
                        {children}
                    </TooltipTrigger>
                    <TooltipContent
                        className={className}
                        onPointerDownOutside={() =>
                            trigger === 'click' && setOpen(false)
                        }
                        sideOffset={sideOffset}
                        {...{ align }}
                    >
                        <p className={cn(messageClassName)}>{message}</p>
                        {isArrow && <ToolTipArrow asChild={false} />}
                    </TooltipContent>
                </RootTooltip>
            </TooltipProvider>
        );
    }
);
