import { cn } from '../../../Utils/common.ui.utils';
import { RangeAppreances, RangeProps, RangeSizes } from './range.types';

/**
 * Range component for selecting a value within a range.
 *
 *
 * @author Saurav Nepal
 */
export const Range = ({
    /**
     * The maximum value of the range.
     * Default: 100
     */
    max = 100,

    /**
     * The minimum value of the range.
     * Default: 0
     */
    min = 0,

    /**
     * The current value of the range.
     */
    value,

    /**
     * The appearance style of the range.
     * Default: 'primary'
     */
    appreance = 'primary',

    /**
     * Additional CSS class name(s) for the range component.
     */
    className,

    /**
     * The size of the range component.
     * Default: 'xs'
     */
    size = 'xs',

    /**
     * The step increment/decrement for the range component.
     */
    step,

    /**
     * Callback function called when the range value changes.
     * Receives the new value and the event object as parameters.
     * Default: () => {}
     */
    onChange = () => {},

    /**
     * Specifies whether the exact value should be returned as a number.
     * If false, the value is returned as a string.
     * Default: false
     */
    giveExactvalue = false,
}: RangeProps) => {
    /**
     * Handles the change event of the range component.
     * Converts the value to a number and calls the onChange callback.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const formattedVal = giveExactvalue ? parseFloat(val) : val;

        onChange(Number(formattedVal), e);
    };

    return (
        <input
            type='range'
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={handleChange}
            className={cn(
                'range',
                RangeAppreances[appreance],
                RangeSizes[size],
                className
            )}
        />
    );
};
