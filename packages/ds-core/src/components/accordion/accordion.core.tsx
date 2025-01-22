import React from 'react';

import { cn } from '@slabs/ds-utils';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        value: string;
        isUnstyled?: boolean;
    }
>(({ children, className, isUnstyled = false, ...props }, forwardedRef) => (
    <Accordion.Item
        className={cn(
            'mt-px overflow-hidden first:mt-0 focus-within:relative focus-within:z-10',
            {
                'border bg-card': !isUnstyled,
            },
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.HTMLAttributes<HTMLButtonElement> & {
        asChild?: boolean;
        showArrowIcon?: boolean;
        isUnstyled?: boolean;
        arrowSize?: number;
        arrowClassName?: string;
    }
>(
    (
        {
            children,
            className,
            asChild,
            showArrowIcon = true,
            isUnstyled = false,
            arrowSize = 16,
            arrowClassName,
            ...props
        },
        forwardedRef
    ) => (
        <Accordion.Header className='flex'>
            <Accordion.Trigger
                className={cn(
                    'group flex flex-1 cursor-pointer items-center justify-between ',
                    'text-left text-sm font-medium',
                    {
                        'px-5 py-4 text-foreground hover:bg-background/50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75':
                            !isUnstyled,
                    },
                    className
                )}
                asChild={asChild}
                {...props}
                ref={forwardedRef}
            >
                {children}
                {showArrowIcon && (
                    <ChevronDownIcon
                        className={cn(
                            'text-foreground ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180',
                            arrowClassName
                        )}
                        aria-hidden
                        width={arrowSize}
                        height={arrowSize}
                    />
                )}
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        isUnstyled?: boolean;
    }
>(({ children, className, isUnstyled = false, ...props }, forwardedRef) => (
    <Accordion.Content
        className={cn(
            'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div
            className={cn({ 'px-5 py-4 text-sm text-foreground': !isUnstyled })}
        >
            {children}
        </div>
    </Accordion.Content>
));

export { AccordionItem, AccordionTrigger, AccordionContent };
