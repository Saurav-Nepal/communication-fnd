import { useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Button } from '../../Inputs/Button/button.component';
import { ModalBody, ModalContainer } from '../Base/modal.container.component';

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
 * @author Rumesh Udash
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
        primary: 'bg-[#4CC3C71A]/10 text-primary',
        success: 'bg-success/10 text-success',
        error: 'bg-error/10 text-error',
        warning: 'bg-warning/10 text-warning',
    };

    return (
        <ModalContainer noTitleBackground>
            <ModalBody className={cn('mx-auto bg-base-100 w-full px-4')}>
                {!!icon && (
                    <div className='flex items-center justify-center mb-4'>
                        <div
                            className={cn(
                                'h-12 w-12 rounded-full flex items-center justify-center',
                                iconAppearances[iconAppearance]
                            )}
                        >
                            <Icon source={icon} isSvg size={32} />
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
                <div className='mx-auto mt-2 text-sm font-normal text-center text-base-secondary'>
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
                                return 'Success';
                            }
                            return 'base';
                        };

                        return actionText ? (
                            <Button
                                key={index + 23}
                                appearance={handleAppearance()}
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
