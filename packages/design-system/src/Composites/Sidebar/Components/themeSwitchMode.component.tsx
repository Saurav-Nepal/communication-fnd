import { Capitalize, ModeOptions, useTheme } from '@finnoto/core';
import { ModeSwitchSvgIcon } from 'assets';
import { HoverCard } from '../../../Components/Data-display/Hover-Card/hoverCard.component';
import { Icon } from '../../../Components/Data-display/Icon/icon.component';
import { ConfirmModal } from '../../../Components/Dialogs/ConfirmModal/confirmModal.component';
import { Modal } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';

/**
 *
 * Theme Mode Switch Component for Menu
 *
 *
 * @author Saurav Nepal
 */
export const ThemeModeSwitch = () => {
    // Access theme mode and setMode function from useTheme hook
    const { mode, setMode } = useTheme();

    // Function to handle mode change confirmation
    const handleChangeMode = (mode: ModeOptions) => {
        // Open a confirmation modal
        return Modal.open({
            modalSize: 'sm',
            component: () => {
                return ConfirmModal({
                    actions: [
                        {
                            actionText: 'No',
                            appearance: 'error',
                            actionClick: () => {
                                Modal.close();
                            },
                        },
                        {
                            actionText: 'Yes',
                            appearance: 'success',
                            actionClick: () => {
                                setMode(mode);
                                Modal.close();
                            },
                        },
                    ],
                    message: `Do you want to switch the theme to  ${Capitalize(
                        mode
                    )}?`,
                });
            },
        });
    };

    // Array of mode change actions
    const actions = [
        {
            name: 'Dark',
            key: 'dark',
            action: () => {
                handleChangeMode('dark');
            },
        },
        {
            name: 'Light',
            key: 'light',
            action: () => {
                handleChangeMode('light');
            },
        },
        {
            name: 'Sync',
            key: 'sync',
            action: () => {
                handleChangeMode('sync');
            },
        },
    ];

    return (
        <HoverCard
            openDelay={100}
            closeDelay={100}
            position='right'
            align='start'
            offSet={18}
            contentClassName='zoom-in-95'
            content={
                <div className='sidebar-dropdown sidebar-dropdown-always'>
                    <div className='sidebar-drop-content'>
                        <span className='sidebar-drop-title'>Switch Mode</span>
                        {/* Render mode change options */}
                        {actions.map((value: any, index: number) => {
                            return (
                                <p
                                    key={index}
                                    onClick={value.action}
                                    className={cn(
                                        'text-sm sidebar-item dropdown dropdown-right dropdown-hover dropdown-end',
                                        { active: value.key === mode }
                                    )}
                                >
                                    <span className='sidebar-item-title'>
                                        {value.name}
                                    </span>
                                </p>
                            );
                        })}
                    </div>
                </div>
            }
        >
            <span className='sidebar-item'>
                {/* Icon for mode switch */}
                <Icon
                    source={ModeSwitchSvgIcon}
                    isSvg
                    size={20}
                    iconColor='text-current'
                />

                <span className='sidebar-item-title'> Switch Mode</span>
                {/* Icon for dropdown indicator */}
                <Icon
                    className='ml-auto dropdown-icon'
                    source={'arrow_right'}
                    isSvg
                    size={24}
                />
            </span>
        </HoverCard>
    );
};
