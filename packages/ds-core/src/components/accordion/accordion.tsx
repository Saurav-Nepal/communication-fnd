import React from 'react';

import { cn } from '@slabs/ds-utils';

import * as RadixAccordion from '@radix-ui/react-accordion';

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './accordion.core';
import {
    AccordionProps,
    MultipleAccordionProps,
    SingleAccordionProps,
} from './accordion.types';

const Accordion = React.forwardRef<
    HTMLDivElement,
    AccordionProps & (SingleAccordionProps | MultipleAccordionProps)
>(
    (
        {
            showArrowIcon,
            items,
            className,
            variant = 'connected',
            isRounded,
            itemClassName,
            triggerClassName,
            contentClassName,
            isUnstyled,
            arrowSize,
            arrowClassName,
            ...props
        },
        ref
    ) => {
        return (
            <RadixAccordion.Root
                className={cn(
                    {
                        '-space-y-px': variant === 'connected',
                        'space-y-3': variant === 'separated',
                    },
                    className
                )}
                ref={ref}
                {...props}
            >
                {items.map((item) => (
                    <AccordionItem
                        value={item.key}
                        key={item.key}
                        className={cn(
                            {
                                'rounded-lg': isRounded,
                            },
                            itemClassName
                        )}
                        isUnstyled={isUnstyled}
                    >
                        <AccordionTrigger
                            {...{
                                showArrowIcon,
                                className: triggerClassName,
                                isUnstyled,
                                arrowSize,
                                arrowClassName,
                            }}
                        >
                            {item.trigger}
                        </AccordionTrigger>
                        <AccordionContent
                            className={contentClassName}
                            isUnstyled={isUnstyled}
                        >
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </RadixAccordion.Root>
        );
    }
);

export { Accordion };
