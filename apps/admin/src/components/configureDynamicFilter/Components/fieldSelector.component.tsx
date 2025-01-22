import React from 'react';
import { FieldSelectorProps } from 'react-querybuilder';

import FilterSelectBox from './filterSelectBox.component';

const FieldSelector = ({
    options,
    value,
    handleOnChange,
}: FieldSelectorProps) => {
    return (
        <FilterSelectBox
            value={value}
            options={options}
            width='150px'
            size='sm'
            isSearchable
            onChange={(option) => handleOnChange(option.value)}
        />
    );
};

export default FieldSelector;
