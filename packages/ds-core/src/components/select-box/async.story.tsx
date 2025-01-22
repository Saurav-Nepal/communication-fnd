import React from 'react';

import { Meta } from '@storybook/react';

import { AsyncSelect } from './async-select';

const meta: Meta<typeof AsyncSelect> = {
    title: 'Component/AsyncSelect',
    component: AsyncSelect,
};
const dummyOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

const fetchOptions = (inputValue: string) => {
    return new Promise((resolve) => {
        // Simulate an API call with a delay
        setTimeout(() => {
            const filteredOptions = dummyOptions.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );

            resolve(filteredOptions);
        }, 1000);
    });
};

export const ParentComponent = () => {
    return (
        <div>
            <h1>Async Select Example</h1>
            <AsyncSelect
                loadOptions={fetchOptions}
                defaultOptions={true}
                cacheOptions
                placeholder='Select an option'
                onChange={(selected) => console.debug('Selected:', selected)}
                onSearchValue={(value) => console.debug('Search Value:', value)}
            />
        </div>
    );
};

export default meta;
