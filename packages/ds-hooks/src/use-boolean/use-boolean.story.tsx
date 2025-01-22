import React from 'react';

import { useBoolean } from './use-boolean';

export default { title: 'Hooks/State Management/useBoolean' };

export function Demo() {
    const [isValue, toggle] = useBoolean(false);

    return (
        <button
            className='px-4 rounded bg-primary text-primary-foreground'
            onClick={() => toggle()}
        >
            {isValue ? 'Yes' : 'No'}
        </button>
    );
}
