import { cn } from '../../../Utils/common.ui.utils';
import { SwitchColors, SwitchProps, SwitchSizes } from './switch.types';

/**
 * @author Saurav Nepal
 *
 * @param color - The color of the switch. Defaults to 'accent'.
 * @param size - The size of the switch.
 * @param disabled - Indicates if the switch is disabled.
 * @param onChange - Event handler for when the switch value changes.
 * @param checked - Indicates if the switch is checked. Defaults to false.
 * @returns The Switch component.
 */
export const Switch = ({
    color = 'accent',
    size,
    disabled,
    onChange,
    checked = false,
}: SwitchProps) => {
    return (
        <input
            onChange={(e) => {
                e.stopPropagation();
                onChange?.(e.target.checked, e);
            }}
            type='checkbox'
            disabled={disabled}
            className={cn('toggle ', SwitchColors[color], SwitchSizes[size])}
            checked={checked}
        />
    );
};
