import { X } from 'lucide-react';
import { useMemo } from 'react';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Button } from '../../Inputs/Button/button.component';
import { ModalBody, ModalContainer } from '../Base/modal.container.component';

import {
    ArcCheckSvgIcon,
    ArcCircleCheckSvgIcon,
    ArcErrorSvgIcon,
    ArcInfoSvgIcon,
    ArcModalWarningSvgIcon,
} from 'assets';

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

const confirmModalAppearance = {
    info: {
        icon: ArcInfoSvgIcon,
        iconAppearance: 'bg-polaris-bg-surface-info text-polaris-icon-info',
        buttonAppearance: 'polaris-info' as const,
    },
    success: {
        icon: ArcCircleCheckSvgIcon,
        iconAppearance:
            'bg-polaris-bg-surface-success text-polaris-icon-success',
        buttonAppearance: 'polaris-success' as const,
    },
    error: {
        icon: ArcErrorSvgIcon,
        iconAppearance:
            'bg-polaris-bg-surface-critical text-polaris-icon-critical',
        buttonAppearance: 'polaris-error' as const,
    },
    warning: {
        icon: ArcModalWarningSvgIcon,
        iconAppearance:
            'bg-polaris-bg-surface-warning text-polaris-icon-warning',
        buttonAppearance: 'polaris-warning' as const,
    },
};

export const ArcConfirmModal = ({
    title = 'Confirm',
    noHeader,
    message,
    actions = [],
    isReverseAction = false,
    icon,
    appearance = 'info',
    onClose,
    closable,
    customContent,
    footerButtonsType = 'full',
    hideIcon = false,
}: {
    title?: string;
    noHeader?: boolean;
    message: any;
    icon?: any;
    actions: any[];
    isReverseAction?: boolean;
    appearance?: 'info' | 'success' | 'error' | 'warning';
    onClose?: () => void;
    closable?: boolean;
    customContent?: React.ReactNode;
    footerButtonsType?: 'compact' | 'full';
    hideIcon?: boolean;
}) => {
    const utilAppearance = confirmModalAppearance[appearance];

    const sanitizedActions = useMemo(() => {
        if (appearance === 'error' || appearance === 'warning') {
            const tempActions = [...actions];
            const tempAppearance = tempActions[0]?.appearance;
            tempActions[0].appearance = tempActions[1]?.appearance;
            tempActions[1].appearance = tempAppearance;
            return [...tempActions].reverse();
        }
        return actions;
    }, [actions, appearance]);

    return (
        <ModalContainer className='arc-confirm-modal'>
            <ModalBody className='w-full gap-6 p-6 col-flex'>
                {customContent || (
                    <div
                        className={cn('flex gap-6', {
                            'justify-center text-center gap-0': hideIcon,
                        })}
                    >
                        {!hideIcon && (
                            <div
                                className={cn(
                                    'h-14 w-14 rounded-lg flex items-center justify-center',
                                    utilAppearance.iconAppearance
                                )}
                            >
                                <Icon
                                    source={utilAppearance.icon}
                                    isSvg
                                    size={24}
                                />
                            </div>
                        )}
                        <div className='justify-center gap-2 col-flex'>
                            <p className='text-xl font-semibold leading-6'>
                                {title}
                            </p>
                            <p className='text-sm text-polaris-text-secondary'>
                                {message}
                            </p>
                        </div>
                    </div>
                )}
                <div
                    className={cn('flex gap-4', {
                        'justify-end': footerButtonsType === 'compact',
                    })}
                >
                    {[...sanitizedActions].reverse().map((action) => (
                        <Button
                            key={action?.actionText}
                            appearance={
                                action?.appearance ||
                                utilAppearance.buttonAppearance
                            }
                            size='sm'
                            className={cn({
                                'w-fit': footerButtonsType === 'compact',
                                'flex-1':
                                    footerButtonsType === 'full' || hideIcon,
                            })}
                            onClick={action?.actionClick}
                        >
                            {action?.actionText}
                        </Button>
                    ))}
                </div>
            </ModalBody>
        </ModalContainer>
    );
};
