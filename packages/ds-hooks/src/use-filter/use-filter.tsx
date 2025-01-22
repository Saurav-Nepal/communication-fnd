import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

interface Filters {
    [key: string]: string | number | boolean;
}

export interface FilterContextType {
    filters: Filters;
    setFilter: (key: string, value: string | number | boolean) => void;
    clearFilters: () => void;
    sortBy: string | null;
    sortDirection: 'asc' | 'desc';
    setSorting: (key: string) => void;
    currentPage: number;
    itemsPerPage: number;
    setItemsPerPage: (count: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
}

interface FilterProviderProps {
    children: React.ReactNode;
    defaultFilters?: Filters;
    options?: {
        isSyncWithQueryString?: boolean;
    };
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({
    children,
    defaultFilters = {},
    options = {},
}) => {
    const { isSyncWithQueryString = true } = options;

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const parseQueryStringParams = useCallback(() => {
        if (typeof window !== 'undefined' && isSyncWithQueryString) {
            const queryParams = new URLSearchParams(window.location.search);
            const filtersFromQuery: Filters = {};
            for (const [key, value] of queryParams.entries()) {
                if (
                    key !== 'sortBy' &&
                    key !== 'sortDirection' &&
                    key !== 'page' &&
                    key !== 'itemsPerPage'
                ) {
                    filtersFromQuery[key] = value;
                }
            }
            setFilters((prevFilters) => ({
                ...prevFilters,
                ...filtersFromQuery,
            }));
            setSortBy(queryParams.get('sortBy') || null);
            setSortDirection(
                (queryParams.get('sortDirection') as 'asc' | 'desc') || 'asc'
            );
            setCurrentPage(parseInt(queryParams.get('page') || '1', 10));
            setItemsPerPage(
                parseInt(queryParams.get('itemsPerPage') || '10', 10)
            );
        }
    }, [isSyncWithQueryString]);

    const updateQueryStringParams = useCallback(() => {
        if (typeof window !== 'undefined' && isSyncWithQueryString) {
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    queryParams.set(key, String(value));
                }
            });
            if (sortBy) queryParams.set('sortBy', sortBy);
            if (sortDirection) queryParams.set('sortDirection', sortDirection);
            queryParams.set('page', currentPage.toString());
            queryParams.set('itemsPerPage', itemsPerPage.toString());

            const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [
        filters,
        sortBy,
        sortDirection,
        currentPage,
        itemsPerPage,
        isSyncWithQueryString,
    ]);

    useEffect(() => {
        parseQueryStringParams();

        const handlePopState = () => {
            parseQueryStringParams();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [parseQueryStringParams]);

    useEffect(() => {
        updateQueryStringParams();
    }, [updateQueryStringParams]);

    const setFilter = (key: string, value: string | number | boolean) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters(defaultFilters);
        setCurrentPage(1);
    };

    const setSorting = (key: string) => {
        if (sortBy === key) {
            setSortDirection((prevDirection) =>
                prevDirection === 'asc' ? 'desc' : 'asc'
            );
        } else {
            setSortBy(key);
            setSortDirection('asc');
        }
    };

    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () =>
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const goToPage = (page: number) => setCurrentPage(page);

    const value: FilterContextType = {
        filters,
        setFilter,
        clearFilters,
        sortBy,
        sortDirection,
        setSorting,
        currentPage,
        itemsPerPage,
        setItemsPerPage,
        nextPage,
        prevPage,
        goToPage,
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};
