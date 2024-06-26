import { ActionArrowDownSvgIcon } from 'assets';
import { DropdownMenu } from '../DropdownMenu/dropdownMenu.component';
import { IconButton } from '../Icon-Button/iconButton.component';
import { Button } from './button.component';
import { ReactNode } from 'react';
import {
    DropdownMenuActionProps,
    DropdownMenuProps,
} from '../DropdownMenu/dropdownMenu.types';
import { IconButtonProps } from '../Icon-Button/iconButton.types';
import { ButtonProps } from './button.types';
import { cn } from '../../../Utils/common.ui.utils';

export const ActionToggleButton = ({
    children,
    actions,
    dropDownButtonprops,
    dropDownProps,
    buttonProps,
    containerClassName,
}: {
    children: ReactNode; // This defines the button primary action name
    actions: DropdownMenuActionProps[];
    dropDownProps?: DropdownMenuProps;
    dropDownButtonprops?: Partial<IconButtonProps>;
    buttonProps?: ButtonProps;
    containerClassName?: string;
}) => {
    return (
        <div
            className={cn(
                'flex items-center overflow-hidden rounded w-fit',
                containerClassName
            )}
        >
            <div className='w-full border-r border-base-100'>
                <Button className='rounded-none' {...buttonProps}>
                    {children}
                </Button>
            </div>
            <DropdownMenu {...dropDownProps} actions={actions}>
                <IconButton
                    className='rounded-none'
                    icon={ActionArrowDownSvgIcon}
                    {...dropDownButtonprops}
                />
            </DropdownMenu>
        </div>
    );
};
