import { useRef } from 'react';

import { useKey } from '../use-key/use-key';

const useKeyUpDown = ({
    event,
    EventFunction,
}: {
    event: 'ArrowUp' | 'ArrowDown';
    EventFunction: () => void;
}) => {
    const listingContainerRef = useRef();
    useKey(
        event,
        () => {
            EventFunction();
        },
        {
            target: listingContainerRef.current,
        },
        [EventFunction]
    );

    return { listingContainerRef };
};

export { useKeyUpDown };
