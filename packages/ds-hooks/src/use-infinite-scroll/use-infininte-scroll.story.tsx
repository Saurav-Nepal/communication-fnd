import React, { useEffect, useState } from 'react';

import { useInfiniteScroll } from './use-infinite-scroll';

export default { title: 'Hooks/Utils/useInfiniteScroll' };

export const MyComponent = () => {
    const [items, setItems] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setItems(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
    }, []);

    const loadMore = () => {
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setItems((prevItems: any) => [
                ...prevItems,
                ...Array.from(
                    { length: 20 },
                    (_, i) => `Item ${prevItems.length + i + 1}`
                ),
            ]);
            setIsLoading(false);
            setHasMore(items.length + 20 < 100); // Assume we have 100 items in total
        }, 1000);
    };

    const { containerRef: ref } = useInfiniteScroll({
        props: {
            onLoadMore: loadMore,
            hasMore,
            isLoading,
        },
    });

    return (
        <div ref={ref} style={{ height: '400px', overflow: 'auto' }}>
            {items.map((item: any, index: any) => (
                <div
                    key={index}
                    style={{ padding: '20px', border: '1px solid #ccc' }}
                >
                    {item}
                </div>
            ))}
            {isLoading && <div>Loading more...</div>}
        </div>
    );
};
