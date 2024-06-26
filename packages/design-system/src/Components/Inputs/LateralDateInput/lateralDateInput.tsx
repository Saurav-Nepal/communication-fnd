import { useMemo } from 'react';
import { InputField } from '../InputField/input.component';
import { SelectBox } from '../SelectBox/selectBox.component';
import { SelectBoxOption } from '../SelectBox/selectBox.types';
import { LateralDateInputProps } from './lateralDateInput.types';

/**
 * Renders a lateral date input component that allows the user to select a number of days, a direction (before or after),
 * and a specific date to filter results.
 *
 * @param {Array<number>} value - The current value of the input fields.
 * @param {number} size - The size of the input fields.
 * @param {Array<SelectBoxOption>} customLateralDates - An array of custom lateral date options to render.
 * @param {Function} onChange - The function to call when the input fields change.
 * @return {JSX.Element} The lateral date input component.
 *
 * @author Rumesh Udash
 */
export const LateralDateInput = ({
    value = [],
    size,
    customLateralDates = [],
    onChange = () => {},
}: LateralDateInputProps) => {
    const lateralDateOptions: SelectBoxOption[] = useMemo(
        () => [
            {
                label: 'Today',
                value: 'today',
            },
            // {
            //     label: 'Tomorrow',
            //     value: 'tomorrow',
            // },
            // {
            //     label: 'Yesterday',
            //     value: 'yesterday',
            // },
            ...customLateralDates,
        ],
        [customLateralDates]
    );

    const handleOnChange = (
        key: 'days' | 'direction' | 'lateral_date',
        val: any
    ) => {
        const newValue = [value[0], value[1] || 'before', value[2] || 'today'];
        if (key === 'days') {
            newValue[0] = val;
        }
        if (key === 'direction') {
            newValue[1] = val;
        }
        if (key === 'lateral_date') {
            newValue[2] = val;
        }
        onChange(newValue);
    };

    return (
        <div className='gap-2 row-flex'>
            <InputField
                type='number'
                groupClassName='!min-w-0'
                inputClassName='!min-w-[40px] !w-[70px]'
                size={size}
                suffix='Days'
                onChange={(value) => handleOnChange('days', value)}
            />
            <SelectBox
                defaultValue={'before'}
                options={[
                    {
                        label: 'Before',
                        value: 'before',
                    },
                    {
                        label: 'After',
                        value: 'after',
                    },
                ]}
                width={100}
                size={size}
                onChange={(option) => handleOnChange('direction', option.value)}
            />
            <SelectBox
                defaultValue={'today'}
                options={lateralDateOptions}
                width={240}
                size={size}
                onChange={(option) =>
                    handleOnChange('lateral_date', option.value)
                }
            />
        </div>
    );
};
