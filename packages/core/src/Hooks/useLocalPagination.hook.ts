import { useMemo, useState } from 'react';

export const useLocalPagination = <T>(
    data: T[],
    options?: { defaultPage?: number; defaultLimit?: number }
) => {
    const { defaultPage = 1, defaultLimit = 20 } = options || {};

    const [page, setPage] = useState(defaultPage);
    const [limit, setLimit] = useState(defaultLimit);

    const total = useMemo(() => data.length, [data.length]);

    const paginatedData = useMemo(
        () => data.slice((page - 1) * limit, page * limit),
        [page, limit, data]
    );

    const setPagination = ({ page, limit }) => {
        if (page) setPage(page);
        if (limit) setLimit(limit);
    };

    return {
        page,
        limit,
        total,
        paginatedData,
        setPage,
        setLimit,
        setPagination,
    };
};
