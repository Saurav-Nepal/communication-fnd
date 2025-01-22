import React from 'react';

import { useCopyToClipboard } from './use-copy-to-clip-board';

export default { title: 'Hooks/Utils/useCopyToClipboard' };

export function Component() {
    const [copiedText, copy] = useCopyToClipboard();

    const handleCopy = (text: string) => () => {
        copy(text)
            .then(() => {
                console.debug('Copied!', { text });
            })
            .catch((error) => {
                console.error('Failed to copy!', error);
            });
    };

    return (
        <>
            <h1 className='pb-2'>Click to copy:</h1>
            <div className='flex flex-row gap-2 pb-2'>
                <button
                    onClick={handleCopy('A')}
                    className='px-4 py-2 text-white bg-blue-500 rounded-md'
                >
                    A
                </button>
                <button
                    onClick={handleCopy('B')}
                    className='px-4 py-2 text-white bg-red-500 rounded-md'
                >
                    B
                </button>
                <button
                    onClick={handleCopy('C')}
                    className='px-4 py-2 text-white bg-green-500 rounded-md'
                >
                    C
                </button>
            </div>
            <p>
                Copied value:{' '}
                {copiedText
                    ? `'${copiedText}' is copied to clipboard`
                    : 'Nothing is copied yet!'}
            </p>
        </>
    );
}
