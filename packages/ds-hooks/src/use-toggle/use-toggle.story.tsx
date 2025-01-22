import React from 'react';

import { useToggle } from './use-toggle';

export default { title: 'Hooks/State Management/useToggle' };

export function Demo() {
    const [mode, toggle] = useToggle(['dark', 'light', 'system']);

    return (
        <button
            className='px-4 rounded bg-primary text-primary-foreground'
            onClick={() => toggle()}
        >
            {mode}
        </button>
    );
}
export function Demo2() {
    const [mode, toggle] = useToggle([
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'System', value: 'system' },
    ]);

    return (
        <button
            className='px-4 rounded bg-primary text-primary-foreground'
            onClick={() => toggle()}
        >
            {mode?.label}
        </button>
    );
}
