import { forwardRef } from 'react';
import { IsValidString } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Tooltip } from '../../Data-display/Tooltip/Tooltip.component';
import { Button } from '../Button/button.component';
import { IconButtonProps } from './iconButton.types';

/**
 * @author Saurav Nepal
 *
 * @description IconButton Component This component renders an icon button with optional tooltip functionality.
 *
 * @param {string} name - The tooltip message to be displayed when hovering over the button (optional).
 * @param {string} icon - The source of the icon to be displayed.
 * @param {boolean} outline - Boolean indicating whether the button should have an outline style (optional).
 * @param {string} shape - The shape of the button, default is 'square' (optional).
 * @param {string} size - The size of the button, default is 'md' (optional).
 * @param {function} onClick - The function to be called when the button is clicked, default is an empty function.
 * @param {string} appearance - The appearance style of the button (optional).
 *
 * @returns {JSX.Element} - The rendered IconButton component.
 */
export const IconButton = forwardRef(
    (
        {
            name,
            icon,
            shape = 'square',
            iconClass,
            iconSize,
            ...props
        }: IconButtonProps,
        ref
    ) => {
        // Rendered with tooltip if there is name.
        if (IsValidString(name))
            return (
                <Tooltip message={name}>
                    <Button
                        ref={ref}
                        shape={shape}
                        data-title={name}
                        {...props}
                    >
                        <Icon
                            size={iconSize}
                            iconClass={iconClass}
                            source={icon}
                            isSvg
                        />
                    </Button>
                </Tooltip>
            );

        // Rendered Without tooltip
        return (
            <Button ref={ref} shape={shape} {...props}>
                <Icon
                    size={iconSize}
                    iconClass={iconClass}
                    source={icon}
                    isSvg
                />
            </Button>
        );
    }
);
