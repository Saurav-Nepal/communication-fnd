import React from 'react';

import { usePagination } from './use-pagination';

export default { title: 'Hooks/Utils/usePagination' };

export function Usage() {
    const { active, range, setPage, next, previous, first } = usePagination({
        total: 10,
    });

    const sanitizedRange = range.map((item) =>
        item === 'dots' ? '...' : item
    );

    return (
        <div style={{ padding: 40 }} className='flex flex-col gap-4'>
            <p>Active page: {active}</p>
            <p>Range: {sanitizedRange.join(', ')}</p>
            <div className='flex flex-row gap-2 '>
                <button
                    type='button'
                    onClick={() => setPage(5)}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    set page 5
                </button>

                <button
                    type='button'
                    onClick={next}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    next
                </button>

                <button
                    type='button'
                    onClick={previous}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    previous
                </button>

                <button
                    type='button'
                    onClick={first}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    first
                </button>
            </div>
        </div>
    );
}
