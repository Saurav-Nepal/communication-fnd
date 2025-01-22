import React from 'react';

import { cn } from '@slabs/ds-utils';

import * as RadixHoverCard from '@radix-ui/react-hover-card';

import { polymorphicFactory } from '../polymorphic-component/polymorphic-component';
import { HoverCardProps } from './hover.card.types';

const HoverCard = polymorphicFactory<HTMLDivElement, HoverCardProps>(
    (
        {
            className,
            children,
            triggerClassName,
            trigger,
            openDelay = 0,
            closeDelay = 0,
            offsetX = 0,
            offsetY = 8,
            ...props
        },
        ref
    ) => {
        return (
            <RadixHoverCard.Root openDelay={openDelay} closeDelay={closeDelay}>
                <RadixHoverCard.Trigger className={triggerClassName} asChild>
                    {trigger}
                </RadixHoverCard.Trigger>
                <RadixHoverCard.Portal>
                    <RadixHoverCard.Content
                        className={cn(
                            'z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                            'rounded bg-white data-[state=open]:transition-all p-4 shadow-sm',
                            className
                        )}
                        ref={ref}
                        sideOffset={offsetY}
                        alignOffset={offsetX}
                        {...props}
                    >
                        {children}
                    </RadixHoverCard.Content>
                </RadixHoverCard.Portal>
            </RadixHoverCard.Root>
        );
    }
);

export { HoverCard };
