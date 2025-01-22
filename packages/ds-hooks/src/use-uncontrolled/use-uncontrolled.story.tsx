import React, { useState } from 'react';

import { useUncontrolled } from './use-uncontrolled';

export default { title: 'Hooks/State Management/useUncontrolled' };

export function Uncontrolled() {
    const [value, handleChange] = useUncontrolled({
        defaultValue: 'Default Value',
        onChange: (value) => {
            console.debug(value);
        },
    });

    return (
        <input
            className='px-2 py-1 border rounded'
            type='text'
            value={value}
            onChange={(event) => handleChange(event.currentTarget.value)}
        />
    );
}

export function Controlled() {
    const [data, setData] = useState('Initial Value');
    const [value, handleChange] = useUncontrolled({
        value: data,
        onChange: (value) => {
            setData(value);
        },
    });

    return (
        <input
            className='px-2 py-1 border rounded'
            type='text'
            value={value}
            onChange={(event) => handleChange(event.currentTarget.value)}
        />
    );
}
