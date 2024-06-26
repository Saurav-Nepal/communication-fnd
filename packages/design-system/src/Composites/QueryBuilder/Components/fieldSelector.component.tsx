import { ParseToSelectBoxOption } from '@finnoto/core';

import { SelectBox } from '../../../Components/Inputs/SelectBox/selectBox.component';

/**
 * Renders a FieldSelector component that displays a SelectBox with the provided
 *  and allows users to select one of them. When the user selects an option,
 * the handleOnChange function is called with the selected option's value as an argument.
 *
 * @param {Array} options - An array of objects to be displayed as options in the SelectBox.
 * @param {any} value - The selected value of the SelectBox.
 * @param {boolean} disabled - Whether the SelectBox is disabled or not.
 * @param {Function} handleOnChange - A callback function to be called when the user
 * selects an option. It receives the selected option's value as an argument.
 * @return {JSX.Element} The rendered FieldSelector component.
 *
 * @author Rumesh Udash
 */
const FieldSelector = ({ options, value, disabled, handleOnChange }: any) => {
    return (
        <SelectBox
            value={value}
            options={ParseToSelectBoxOption(options, 'name', 'label', {
                disallowGrouping: true,
            })}
            mainClassName='w-full max-w-[250px]'
            className='query-builder-field-selector'
            size='sm'
            isSearchable
            isDisabled={disabled}
            onChange={(option) => {
                handleOnChange(option.value);
            }}
        />
    );
};

export default FieldSelector;
