import React from 'react';

import { useList } from './use-list';

export default { title: 'Hooks/Utils/useList' };

export function Usage() {
    const initList = [
        {
            name: 'John',
            age: 20,
        },
        {
            name: 'Doe',
            age: 30,
        },
    ];
    const [list, { updateAt, removeAt, push, set }] = useList(initList);

    const newList = [
        {
            name: 'Absalom',
            age: 26,
        },
        {
            name: 'Kingsley',
            age: 37,
        },
    ];

    return (
        <div className='flex flex-col gap-2'>
            {'List:'}

            {list.map((item, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        <p>{item.name}</p>
                        <p>{item.age}</p>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <button
                            type='button'
                            onClick={() =>
                                updateAt(index, { name: 'Updated', age: 100 })
                            }
                            className='w-24 px-4 py-2 text-white bg-blue-500 rounded-md'
                        >
                            update
                        </button>

                        <button
                            type='button'
                            onClick={() => removeAt(index)}
                            className='w-24 px-4 py-2 text-white bg-red-500 rounded-md'
                        >
                            remove
                        </button>
                    </div>
                </div>
            ))}

            <div className='flex flex-row gap-2'>
                <button
                    type='button'
                    onClick={() => push({ name: 'New', age: 100 })}
                    className='w-24 px-4 py-2 text-white bg-green-500 rounded-md'
                >
                    Add
                </button>
                <button
                    type='button'
                    onClick={() => set(newList)}
                    className='w-24 px-4 py-2 text-white bg-orange-500 rounded-md'
                >
                    Set
                </button>
            </div>
        </div>
    );
}
