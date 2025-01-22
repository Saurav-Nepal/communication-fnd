import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps {
    hasMore: boolean;
    onLoadMore: () => void;
    isLoading?: boolean;
    isReset?: boolean;
    delay?: number; // New: delay in milliseconds
    distance?: number; // New: distance from the bottom of the container in pixels
}

const useInfiniteScroll = ({ props }: { props: UseInfiniteScrollProps }) => {
    const {
        hasMore,
        onLoadMore,
        isLoading,
        isReset = false,
        delay = 200, // Default delay of 200ms
        distance = 50, // Default distance of 50px
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [isThrottled, setIsThrottled] = useState(false);

    useEffect(() => {
        if (isReset) {
            setPage(0);
        }
    }, [isReset]);

    const handleScroll = useCallback(() => {
        if (containerRef.current && hasMore && !isLoading && !isThrottled) {
            const { scrollTop, scrollHeight, clientHeight } =
                containerRef.current;
            if (scrollHeight - scrollTop <= clientHeight + distance) {
                setIsThrottled(true);
                setPage((prev) => prev + 1);
                onLoadMore();

                // Delay before allowing the next load
                setTimeout(() => {
                    setIsThrottled(false);
                }, delay);
            }
        }
    }, [hasMore, isLoading, isThrottled, delay, distance, onLoadMore]);

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    return { containerRef, page };
};

export { useInfiniteScroll };
