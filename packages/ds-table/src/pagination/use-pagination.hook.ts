import { useCallback, useMemo } from 'react';

import { SelectBoxOptionType } from '@slabs/ds-core/src/components/select-box/select-box.types';
import { ObjectDto } from '@slabs/ds-utils';

export const usePagination = ({
    onPaginationChange,
    pagination,
    totalRecords,
}: {
    onPaginationChange: (data: ObjectDto) => void;
    pagination?: ObjectDto;
    totalRecords: number;
}) => {
    const constraint = 5;
    const { page = 1, limit = 20 } = pagination || {};

    const totalValue = useMemo(() => {
        return typeof pagination?.total !== 'undefined'
            ? pagination?.total
            : totalRecords;
    }, [pagination?.total, totalRecords]);

    const lastPage = useMemo(
        () => Math.ceil(totalValue / limit),
        [totalValue, limit]
    );

    const { paginationData } = usePaginationNavigation({
        constraint,
        lastPage,
        page,
        total: totalValue,
    });

    // Options for page limit select box
    const pageLimit: SelectBoxOptionType[] = [
        { label: '10 / Page', value: 10 },
        { label: '20 / Page', value: 20 },
        { label: '30 / Page', value: 30 },
        { label: '40 / Page', value: 40 },
        { label: '50 / Page', value: 50 },
        { label: '60 / Page', value: 60 },
        { label: '70 / Page', value: 70 },
        { label: '80 / Page', value: 80 },
        { label: '90 / Page', value: 90 },
        { label: '100 / Page', value: 100 },
    ];

    const endItemNumber = useMemo(() => page * limit, [page, limit]);

    // Function to handle pagination change
    const handlePaginationChange = (key: 'limit' | 'page', value: number) => {
        const newData: ObjectDto = { [key]: value };

        if (key === 'limit') newData.page = 1;
        onPaginationChange({
            limit,
            page,
            total: totalValue,
            ...newData,
        });
    };

    // Return an object with pagination-related values and functions
    return {
        handlePaginationChange,
        paginationData,
        pageLimit,
        endItemNumber,
        limit,
        total: totalValue,
        page,
    };
};

// Custom hook to calculate pagination navigation data
const usePaginationNavigation = ({
    page,
    constraint = 5,
    lastPage,
    total,
}: any) => {
    const setData = useCallback(
        (initial_pages: any[], middle_pages: any[], last_pages: any[]) => {
            if (constraint <= page && page + constraint - 2 < lastPage) {
                initial_pages.push(1);
                last_pages.push(lastPage);
                for (
                    let start = page - 1;
                    start < page + constraint - 3;
                    start++
                ) {
                    middle_pages.push(start);
                }
            } else if (page + constraint - 1 > lastPage) {
                initial_pages.push(1);
                const startPage =
                    page + constraint - 1 === lastPage
                        ? page
                        : lastPage + 1 - constraint;
                for (let start = startPage; start <= lastPage; start++) {
                    last_pages.push(start);
                }
            } else {
                last_pages.push(lastPage);
                for (let start = 1; start <= constraint; start++) {
                    initial_pages.push(start);
                }
            }
        },
        [constraint, lastPage, page]
    );
    const paginationData = useMemo(() => {
        let initial_pages: any[] = [];
        let middle_pages: any[] = [];
        let last_pages: any[] = [];

        if (typeof total === 'undefined') {
            initial_pages = [page];
        } else if (constraint >= lastPage) {
            for (let start = 1; start <= lastPage; start++) {
                initial_pages.push(start);
            }
        } else {
            setData(initial_pages, middle_pages, last_pages);
        }

        return { initial_pages, middle_pages, last_pages };
    }, [constraint, lastPage, page, setData, total]);

    return {
        paginationData,
    };
};
