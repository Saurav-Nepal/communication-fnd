import React from 'react';

import { useEffectOnce } from './use-effect-once';

export default { title: 'Hooks/LifeCycle/useEffectOnce' };

export function Usage() {
    useEffectOnce(() => {
        console.debug('Only once');
    });

    return <div>Check console</div>;
}
