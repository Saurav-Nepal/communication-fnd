import React, { useEffect } from 'react';

import {
    readSessionStorageValue,
    useSessionStorage,
} from './use-session-storage';

export default { title: 'Hooks/Storage/useSessionStorage' };

const key = 'slab-local-storage1';

export function Usage() {
    const [id, set, remove] = useSessionStorage({
        // defaultValue: 123,
        getInitialValueInEffect: false,
        key,
    });

    const [storedValue, setStoredValue] = React.useState(null);

    useEffect(() => {
        setTimeout(() => {
            setStoredValue(readSessionStorageValue({ key }));
        }, 20);
    }, [id, set, remove]);

    return (
        <div style={{ padding: 40 }}>
            <p>Hook value: {id}</p>
            <p>Local storage value: {storedValue}</p>
            <div className='flex flex-row gap-2 '>
                <button
                    type='button'
                    onClick={() => set('test-value')}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    set
                </button>

                <button
                    type='button'
                    onClick={() => {
                        remove();
                    }}
                    className='px-4 py-2 text-white bg-red-500 rounded-md'
                >
                    remove
                </button>
            </div>
        </div>
    );
}
