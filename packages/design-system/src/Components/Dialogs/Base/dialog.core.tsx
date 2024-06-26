'use client';

import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '../../../Utils/common.ui.utils';

/**
 * This module exports several components related to dialogs in a UI library.
 *
 * @module Dialogs
 * @author Rumesh Udash
 */

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
    children,
    ...props
}: DialogPrimitive.DialogPortalProps) => (
    <DialogPrimitive.Portal {...props}>
        <div className='fixed inset-0 z-50 flex justify-center'>{children}</div>
    </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
        withScrollableModal?: boolean;
    }
>(({ className, children, withScrollableModal, ...props }, ref) => (
    <>
        <DialogPrimitive.Overlay
            ref={ref}
            className={cn(
                'fixed inset-0 z-50 flex justify-center bg-black/75 p-4 overflow-y-auto transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
                className
            )}
            {...props}
        >
            {withScrollableModal ? children : null}
        </DialogPrimitive.Overlay>
        {!withScrollableModal ? children : null}
    </>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogVariants = cva('data-[state=open]:sm:slide-in-from-bottom-0', {
    variants: {
        position: {
            top: 'self-start data-[state=open]:slide-in-from-top-10',
            bottom: 'self-end data-[state=open]:slide-in-from-bottom-10',
        },
        size: {
            xs: 'sm:max-w-[350px] w-full',
            sm: 'sm:max-w-[500px] w-full',
            md: 'sm:max-w-[750px] w-full',
            lg: 'sm:max-w-[1000px] w-full',
            xl: 'sm:max-w-[1550px] w-full',
            wide: 'sm:max-w-[90%] w-full',
            full: 'w-full h-full sm:max-w-full',
            auto: 'w-full sm:w-auto sm:max-w-full',
        },
    },
    compoundVariants: [
        {
            size: ['xs', 'sm', 'md', 'lg', 'xl', 'wide', 'auto'],
            position: 'top',
            className: 'rounded-b-lg',
        },
        {
            size: ['xs', 'sm', 'md', 'lg', 'xl', 'wide', 'auto'],
            position: 'bottom',
            className: 'rounded-t-lg',
        },
    ],
    defaultVariants: { position: 'bottom' },
});

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        closeable?: boolean;
        closeIcon?: boolean;
        closeClassName?: string;
        mobilePosition?: 'bottom' | 'top';
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full' | 'auto';
        withScrollableModal?: boolean;
    }
>(
    (
        {
            className,
            children,
            closeable = true,
            closeIcon = true,
            closeClassName,
            mobilePosition = 'bottom',
            size = 'md',
            title,
            withScrollableModal,
            ...props
        },
        ref
    ) => {
        return (
            <DialogPortal>
                <DialogOverlay withScrollableModal={withScrollableModal}>
                    <DialogPrimitive.Content
                        ref={ref}
                        className={cn(
                            'relative m-4 z-50 flex flex-col w-full max-h-screen bg-base-100 overflow-clip shadow-modal modal-dialog animate-in data-[state=open]:fade-in-90 sm:rounded-lg sm:zoom-in-90 sm:self-center',
                            {
                                'max-h-none sm:self-start m-0':
                                    withScrollableModal,
                            },
                            className,
                            dialogVariants({ position: mobilePosition, size })
                        )}
                        {...props}
                        tabIndex={undefined}
                        title={title}
                    >
                        {title && (
                            <div className='p-4 border-b shadow row-flex'>
                                <span className='font-medium'>{title}</span>
                            </div>
                        )}
                        {children}
                        {closeable && closeIcon && (
                            <DialogPrimitive.Close
                                className={cn(
                                    'dialog-close',
                                    'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-base-100 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-base-secondary',
                                    closeClassName
                                )}
                            >
                                <X className='w-4 h-4' />
                                <span className='sr-only'>Close</span>
                            </DialogPrimitive.Close>
                        )}
                    </DialogPrimitive.Content>
                </DialogOverlay>
            </DialogPortal>
        );
    }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col space-y-1.5 text-center sm:text-left',
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2',
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        role='heading'
        className={cn(
            'text-lg font-medium leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('text-sm text-base-secondary font-normal', className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
};
