import React from 'react';

import { useThrottledEffect } from './use-throttled-effect';

export default { title: 'Hooks/LifeCycle/useThrottledEffect' };

export function Usage() {
    useThrottledEffect(
        () => {
            console.debug('useThrottledEffect');
        },
        1000,
        []
    );
    return (
        <div style={{ padding: 40 }}>
            <p>Check console for log</p>
        </div>
    );
}
