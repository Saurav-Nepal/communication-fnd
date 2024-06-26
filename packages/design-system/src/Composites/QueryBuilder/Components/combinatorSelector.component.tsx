import { ParseToSelectBoxOption } from '@finnoto/core';

import { SelectBox } from '../../../Components/Inputs/SelectBox/selectBox.component';
import { cn } from '../../../Utils/common.ui.utils';

/**
 * Renders a selector component with given options, value, disabled, handleOnChange.
 *
 * @param {any} options - The array of options to populate the selector.
 * @param {any} value - The value to be pre-selected in the selector.
 * @param {boolean} disabled - Indicates whether the selector is disabled or not.
 * @param {(value: any) => void} handleOnChange - The function to be called when a new option is selected.
 * @return {JSX.Element} The rendered selector component.
 *
 * @author Rumesh Udash
 */
const CombinatorSelector = ({
    options,
    value,
    disabled,
    handleOnChange,
    className,
}: any) => {
    return (
        <SelectBox
            value={value}
            options={ParseToSelectBoxOption(options, 'name')}
            mainClassName={cn('w-full max-w-[220px]', className)}
            size='sm'
            isDisabled={disabled}
            onChange={(option) => {
                handleOnChange(option.value);
            }}
        />
    );
};

export default CombinatorSelector;
