import React from 'react';

import { useQueue } from './use-queue';

export default { title: 'Hooks/Storage/useQueue' };

export function Usage() {
    const initValues = ['a', 'b', 'c', 'd', 'e'];
    const { state, queue, add, cleanQueue, update } = useQueue({
        initialValues: initValues,
        limit: 5,
    });

    return (
        <div className='flex flex-col gap-2'>
            <div>
                <h2>State</h2>
                <div>{state.join(', ')}</div>
            </div>
            <div>
                <h2>Queue</h2>
                <div>{queue.join(', ')}</div>
            </div>
            <div className='flex flex-row gap-2'>
                <button
                    onClick={() => add('k', 'l', 'm')}
                    className='px-2 py-1 text-white bg-blue-500 rounded'
                >
                    Add
                </button>

                <button
                    onClick={cleanQueue}
                    className='px-2 py-1 text-white bg-red-500 rounded'
                >
                    Clean Queue
                </button>
                <button
                    onClick={() =>
                        update((state) => state.filter((i) => i !== 'a'))
                    }
                    className='px-2 py-1 text-white bg-green-500 rounded'
                >
                    Update
                </button>
            </div>
        </div>
    );
}
