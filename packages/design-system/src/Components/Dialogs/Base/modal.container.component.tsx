import { forwardRef, ReactNode } from 'react';

import { EmptyFunction, useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Button } from '../../Inputs/Button/button.component';
import { CheckBox } from '../../Inputs/CheckBox/checkBox.component';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './dialog.core';

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
    title,
    children,
    className,
    titleClassName,
    noTitleBackground,
    withoutDialogTitle,
    withoutBackground = false,
}: {
    title?: ReactNode;
    children: any;
    className?: string;
    titleClassName?: string;
    noTitleBackground?: boolean;
    withoutDialogTitle?: boolean;
    withoutBackground?: boolean;
}) => {
    const { isArc } = useApp();

    return (
        <div
            className={cn(
                'col-flex overflow-y-hidden max-w-full max-h-screen relative h-full modal-component',
                {
                    'modal-background': !withoutBackground,
                },
                className
            )}
        >
            {title && withoutDialogTitle && (
                <h2
                    className={cn(
                        'border-b p-4 text-base text-base-content ',
                        { 'modal-title-background': !noTitleBackground },
                        { 'px-4 py-3': isArc },
                        titleClassName
                    )}
                >
                    {title}
                </h2>
            )}
            {title && !withoutDialogTitle ? (
                <DialogHeader
                    className={cn(
                        'border-b p-4 modal-title ',
                        { 'modal-title-background': !noTitleBackground },
                        { 'px-4 py-3': isArc },
                        titleClassName
                    )}
                >
                    <DialogTitle
                        className={cn('text-base text-base-content', {
                            'font-semibold': isArc,
                        })}
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>
            ) : null}
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
                'flex flex-col overflow-y-auto p-4 modal-body',
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
 * @param {string} rightComponentClassName - Optional classname for the right component.
 * @param {any} icon - Optional icon to be displayed beside the title.
 * @param {boolean} isSvgIcon - Optional boolean to determine if the icon is an SVG.
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
    rightComponentClassName,
    icon,
    isSvgIcon = true,
}: {
    title: string;
    titleClassName?: string;
    subtitle?: string;
    subtitleClassName?: string;
    rightComponent?: ReactNode;
    rightComponentClassName?: string;
    icon?: any;
    isSvgIcon?: boolean;
}) => {
    const { isArc } = useApp();

    return (
        <div className='justify-between flex-1 gap-4 row-flex'>
            <div className='items-center gap-4 row-flex'>
                {icon ? (
                    <div className='p-3 border rounded-lg'>
                        <Icon source={icon} isSvg={isSvgIcon} size={20} />
                    </div>
                ) : null}
                <div className='space-y-1.5'>
                    <DialogTitle
                        className={cn(
                            {
                                'text-base': isArc,
                            },
                            titleClassName
                        )}
                    >
                        {title}
                    </DialogTitle>
                    {subtitle ? (
                        <DialogDescription className={subtitleClassName}>
                            {subtitle}
                        </DialogDescription>
                    ) : null}
                </div>
            </div>
            {rightComponent ? (
                <div className={cn('mr-8', rightComponentClassName)}>
                    {rightComponent}
                </div>
            ) : null}
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
            className={cn(
                'border-t p-3 px-6 modal-title-background modal-footer',
                className
            )}
        >
            {children}
        </DialogFooter>
    );
};

/**
 * Renders a bottom modal button that displays a "Save" text and loads while
 * submitting. It has an optional "progress" prop that can be set to true to
 * display the loading state. It also has an optional prop "disableSubmit"
 * to disable the button. When clicked, it calls the "handleSubmit" callback.
 *
 * @param {boolean} [isSubmitting] - A boolean that indicates if the button is
 * currently submitting or not.
 * @param {boolean} [disableSubmit] - A boolean that indicates if the
 * button is enabled or not.
 * @param {boolean} [progress=false] - A boolean that indicates whether to
 * display the loading state or not.
 * @param {string} [submitText="Save"] - The text to display inside the button.
 * @param {Function} handleSubmit - A callback function that is called when the
 * button is clicked.
 * @return {JSX.Element} The JSX element that renders the modal button.
 *
 * @author Rumesh Udash
 */
export const ModalBottomButton = ({
    isSubmitting,
    isCreateAnother,
    setCreateAnother = EmptyFunction,
    // hideCreateAnother = true,
    // saveAnotherClassName = 'mt-10 pt-2   col-flex gap-2 border-t',
    // checkBoxClassName = '',
    // inVisibleSaveAnother = false,
    disableSubmit,
    // onChangeCreateAnother = EmptyFunction,
    progress = false,
    noMarginTop = false,
    submitText = 'Save',
    handleSubmit = () => {},
    hideCreateAnother = true,
}: {
    isCreateAnother?: boolean;
    isSubmitting?: boolean;
    setCreateAnother?: (value?: boolean) => void;
    disableSubmit?: boolean;
    progress?: boolean;
    submitText?: string;
    noMarginTop?: boolean;
    handleSubmit?: (...args: any) => void;
    hideCreateAnother?: boolean;
}) => {
    return (
        <div
            className={cn(
                'sticky bottom-0 col-flex gap-3 border-t w-full pt-3 ',
                {
                    'mt-6 pt-0': !noMarginTop,
                }
            )}
        >
            {!hideCreateAnother && (
                <div className='w-full'>
                    <CheckBox
                        checked={isCreateAnother}
                        onChange={(checked) => setCreateAnother(checked)}
                        rightLabel='save and create another'
                    />
                </div>
            )}
            <div className='flex-1 w-full'>
                <Button
                    disabled={disableSubmit}
                    appearance='primary'
                    block
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    className='min-w-[120px]'
                    progress={progress}
                >
                    {submitText}
                </Button>
            </div>
        </div>
    );
};
