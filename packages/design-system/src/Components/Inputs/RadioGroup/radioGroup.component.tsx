import { cn } from '../../../Utils/common.ui.utils';
import { InputErrorMessage } from '../InputField/inputMessage.component';
import { Label } from '../InputField/label.component';
import {
    appearanceText,
    appearanceTypes,
    RadioGroupProps,
    sizeTypes,
} from './radioGroup.types';

/**
 * Creates a radio group component with a set of options and allows the user to select one of them.
 *
 * @param name - The name of the radio group.
 * @param value - The currently selected value of the radio group.
 * @param defaultValue - The default value of the radio group.
 * @param direction - The direction of the radio group options (horizontal or vertical).
 * @param options - The options available in the radio group.
 * @param appearance - The appearance style of the radio group.
 * @param size - The size of the radio group.
 * @param readOnly - Determines if the radio group is read-only.
 * @param disabled - Determines if the radio group is disabled.
 * @param onChange - The callback function invoked when the value of the radio group changes.
 * @returns The RadioGroup component.
 *
 * @author Rumesh Udash
 */
export const RadioGroup = ({
    name,
    value,
    defaultValue,
    direction = 'horizontal',
    options = [],
    appearance = 'default',
    variant = 'default',
    size = 'md',
    readOnly,
    disabled,
    onChange = () => {},
    label,
    required,
    error,
    containerClassName,
}: RadioGroupProps) => {
    // CSS class for the container element
    const containerClass = cn(
        'form-control gap-4',
        {
            'row-flex': direction === 'horizontal',
            'col-flex': direction === 'vertical',
        },
        containerClassName
    );

    return (
        <div className=' form-control col-flex'>
            {label && (
                <Label
                    label={label}
                    {...{ error, required }}
                    className='text-xs'
                />
            )}
            <div className={containerClass}>
                {options.map((option, idx) => (
                    <RadioGroupItem
                        key={idx + '' + option.value}
                        name={name}
                        label={option.label}
                        value={option.value}
                        checked={value === option.value}
                        defaultChecked={defaultValue === option.value}
                        appearance={appearance}
                        variant={variant}
                        size={size}
                        readOnly={readOnly}
                        disabled={disabled}
                        onChange={(e) => {
                            if (e.target.checked && !readOnly) {
                                onChange(option.value);
                            }
                        }}
                    />
                ))}
            </div>
            {error && <InputErrorMessage {...{ error }} />}
        </div>
    );
};

/**
 * Represents an item within a radio group.
 *
 * @param name - The name of the radio group.
 * @param label - The label for the radio group item.
 * @param value - The value of the radio group item.
 * @param checked - Determines if the radio group item is checked.
 * @param defaultChecked - Determines if the radio group item is default checked.
 * @param appearance - The appearance style of the radio group item.
 * @param size - The size of the radio group item.
 * @param readOnly - Determines if the radio group item is read-only.
 * @param disabled - Determines if the radio group item is disabled.
 * @param onChange - The callback function invoked when the value of the radio group item changes.
 * @returns The RadioGroupItem component.
 *
 * @author @rumeshudash
 */
export const RadioGroupItem = ({
    name,
    label,
    value,
    checked,
    defaultChecked,
    appearance,
    variant,
    size,
    readOnly,
    disabled,
    onChange = () => {},
}: {
    name?: any;
    label?: any;
    value?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    appearance?: keyof typeof appearanceTypes;
    variant?: any;
    size?: keyof typeof sizeTypes;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: any;
}) => {
    // CSS class for the radio element
    const radioClass = cn(
        'radio',
        appearanceTypes[appearance],
        sizeTypes[size]
    );

    const radioVariants = {
        default: '',
        block: cn('border bg-base-100 py-[2px] px-2 rounded', {
            'border-current': checked,
        }),
    };

    return (
        <label
            htmlFor={value}
            className={cn(
                'row-flex items-center space-x-2',
                { [appearanceText[appearance]]: checked },
                radioVariants[variant]
            )}
        >
            <input
                type='radio'
                className={radioClass}
                name={name}
                value={value}
                id={value}
                checked={checked}
                defaultChecked={defaultChecked}
                readOnly={readOnly}
                disabled={disabled}
                onChange={onChange}
            />
            <span>{label}</span>
        </label>
    );
};
