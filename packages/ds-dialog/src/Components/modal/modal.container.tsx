import React, { ReactNode } from 'react';

import { cn } from '@slabs/ds-utils';

import {
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '../dialogs/dialog';

/**
 * Renders a modal container with an optional title and children.
 *
 * @param {ReactNode} title - The title to display in the modal header.
 * @param {any} children - The content to display within the modal.
 * @param {string} className - Additional class names to apply to the container.
 * @param {boolean} noTitleBackground - Whether or not to display a background on the modal header.
 * @return {JSX.Element} The rendered modal container.
 *
 * @author Rumesh Udash
 */
export const ModalContainer = ({
    children,
    className,
}: {
    children: any;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'flex overflow-y-hidden relative flex-col max-w-full h-full max-h-screen',
                className
            )}
        >
            {children}
        </div>
    );
};

/**
 * Renders the body of a modal with the provided children and optional className.
 *
 * @param {string} [className] - An optional className to apply to the container div.
 * @param {any} children - The children to render inside the body of the modal.
 * @return {JSX.Element} - The div container with the provided children and optional className.
 *
 * @author Rumesh Udash
 */
export const ModalBody = ({
    children,
    className,
}: {
    className?: string;
    children: any;
}) => {
    return (
        <div
            className={cn(
                'flex overflow-y-auto flex-col p-4 bg-dialog',
                className
            )}
        >
            {children}
        </div>
    );
};

/**
 * Renders a ModalTitle component that displays a title, subtitle, icon, and an optional right component.
 *
 * @param {string} title - The main title to be displayed.
 * @param {string} titleClassName - Optional classname for the title.
 * @param {string} subtitle - Optional subtitle to be displayed underneath the title.
 * @param {string} subtitleClassName - Optional classname for the subtitle.
 * @param {ReactNode} rightComponent - Optional component to be displayed on the right side.
 *
 * @return {JSX.Element} - The ModalTitle component.
 * @author Rumesh Udash
 */
export const ModalTitle = ({
    title,
    titleClassName,
    subtitle,
    subtitleClassName,
    rightComponent,
    className,
}: {
    title: string;
    titleClassName?: string;
    subtitle?: string;
    subtitleClassName?: string;
    rightComponent?: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'flex-1 gap-4 justify-between p-4 border-b row-flex bg-dialog-header text-dialog-header-foreground',
                className
            )}
        >
            <div className='gap-4 items-center row-flex'>
                <div className='space-y-1.5'>
                    <DialogTitle className={cn(titleClassName)}>
                        {title}
                    </DialogTitle>
                    {subtitle ? (
                        <DialogDescription className={subtitleClassName}>
                            {subtitle}
                        </DialogDescription>
                    ) : null}
                </div>
            </div>
            {rightComponent}
        </div>
    );
};

/**
 * Renders a modal footer component.
 *
 * @param {string} [className] - Optional class name to add to the component.
 * @param {any} children - The child elements to render inside the modal footer.
 * @return {JSX.Element} Returns the rendered modal footer component.
 *
 * @author Rumesh Udash
 */
export const ModalFooter = ({
    children,
    className,
}: {
    className?: string;
    children: any;
}) => {
    return (
        <DialogFooter
            className={cn('p-3 px-6 border-t bg-dialog-footer', className)}
        >
            {children}
        </DialogFooter>
    );
};
