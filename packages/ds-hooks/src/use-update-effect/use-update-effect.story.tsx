import React from 'react';

import { useUpdateEffect } from './use-update-effect';

export default { title: 'Hooks/LifeCycle/useUpdateEffect' };

export function Usage() {
    const [state, setState] = React.useState(0);
    useUpdateEffect(() => {
        console.debug('Only on update');
    }, [state]);

    return (
        <div className='flex flex-col gap-2'>
            <button
                onClick={() => setState(state + 1)}
                className='w-24 px-4 py-2 text-white bg-blue-500 rounded-md '
            >
                Update
            </button>
            <div>Check console</div>
        </div>
    );
}
