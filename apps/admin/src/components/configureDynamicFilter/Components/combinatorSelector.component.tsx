import React from 'react';
import { CombinatorSelectorProps } from 'react-querybuilder';

import FilterSelectBox, {
    ParseToSelectBoxOption,
} from './filterSelectBox.component';

const CombinatorSelector = ({
    options,
    value,
    handleOnChange,
}: CombinatorSelectorProps) => {
    return (
        <FilterSelectBox
            value={value}
            options={ParseToSelectBoxOption(options, 'name')}
            valueKey='name'
            minWidth='100px'
            size='sm'
            onChange={(option) => handleOnChange(option.value)}
        />
    );
};

export default CombinatorSelector;
