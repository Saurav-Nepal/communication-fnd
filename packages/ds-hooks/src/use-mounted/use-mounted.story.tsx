import React from 'react';

import { useMounted } from './use-mounted';

export default { title: 'Hooks/LifeCycle/useMounted' };

export function Usage() {
    const isMounted = useMounted();

    return (
        <div style={{ padding: 40 }}>
            <p>Component is mounted: {isMounted ? 'Yes' : 'No'}</p>
        </div>
    );
}
