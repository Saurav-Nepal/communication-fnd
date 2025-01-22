import React from 'react';

import { useShallowEffect } from './use-shallow-effect';

export default { title: 'Hooks/LifeCycle/useShallowEffect' };

export function Usage() {
    useShallowEffect(() => {
        console.debug('useShallowEffect');
    }, []);
    return (
        <div style={{ padding: 40 }}>
            <p>Check console for log</p>
        </div>
    );
}
