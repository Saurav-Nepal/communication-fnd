import React from 'react';

import { Button } from '@slabs/ds-core';
import { cn } from '@slabs/ds-utils';

import { ModalBody, ModalContainer } from '../modal/modal.container';

/**
 * Renders a modal dialog box that prompts the user for confirmation and displays a message.
 *
 * @param {string} [title='Confirm'] - The title of the modal dialog box.
 * @param {boolean} [noHeader] - A flag to indicate if the header should not be displayed.
 * @param {(string | any)} message - The message to be displayed in the modal dialog box.
 * @param {any[]} [actions=[]] - An array of action objects to be displayed in the modal dialog box.
 * @param {boolean} [isReverseAction=false] - A flag to indicate if the order of the actions should be reversed.
 * @param {any} [icon] - The icon to be displayed in the modal dialog box.
 * @param {'primary' | 'success' | 'error' | 'warning'} [iconAppearance='primary'] - The appearance of the icon.
 * @returns {JSX.Element} - The modal dialog box.
 *
 */
export const ConfirmModal = ({
    title = 'Confirm',
    noHeader,
    message,
    actions = [],
    isReverseAction = false,
    icon,
    iconAppearance = 'primary',
}: {
    title?: string;
    noHeader?: boolean;
    message: any;
    icon?: any;
    actions: any[];
    isReverseAction?: boolean;
    iconAppearance?: 'primary' | 'success' | 'error' | 'warning';
}) => {
    const iconAppearances = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        error: 'bg-error/10 text-error',
        warning: 'bg-warning/10 text-warning',
    };

    return (
        <ModalContainer>
            <ModalBody className={cn('px-4 mx-auto w-full bg-secondary/25')}>
                {!!icon && (
                    <div className='flex justify-center items-center mb-4'>
                        <div
                            className={cn(
                                'flex justify-center items-center w-12 h-12 rounded-full',
                                iconAppearances[iconAppearance]
                            )}
                        >
                            {icon}
                        </div>
                    </div>
                )}

                {noHeader ? (
                    <></>
                ) : (
                    <div className='text-xl font-medium text-center'>
                        {title}
                    </div>
                )}
                <div className='mx-auto mt-2 text-sm font-normal text-center text-foreground'>
                    {message}
                </div>
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    {actions.map((item, index) => {
                        if (item?.visible === false) return null;
                        let {
                            actionClick = () => {},
                            actionText,
                            appearance,
                        } = item || {};

                        const handleAppearance = () => {
                            if (appearance) return appearance;
                            if (
                                (index === 0 && isReverseAction) ||
                                (!isReverseAction && index === 1)
                            ) {
                                return 'success';
                            }
                            return 'secondary';
                        };

                        return actionText ? (
                            <Button
                                key={index + 23}
                                color={handleAppearance()}
                                onClick={actionClick}
                                size='md'
                            >
                                <span className=''>{actionText}</span>
                            </Button>
                        ) : null;
                    })}
                </div>
            </ModalBody>
        </ModalContainer>
    );
};
