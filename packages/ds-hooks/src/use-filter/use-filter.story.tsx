import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import { FilterProvider, useFilter } from './use-filter';
import { withFilter } from './with-filter';

export default {
    title: 'Hooks/Filter/useFilter',
    component: FilterProvider,
} as Meta;

// Basic usage with FilterProvider and useFilter
export const BasicUsage: StoryFn = () => {
    const ExampleComponent = () => {
        const {
            filters,
            setFilter,
            clearFilters,
            sortBy,
            sortDirection,
            setSorting,
            currentPage,
            nextPage,
            prevPage,
        } = useFilter();

        return (
            <div>
                <h3>Filters</h3>
                <div>Current filters: {JSON.stringify(filters)}</div>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setFilter('status', 'active')}
                    >
                        Set Status Active
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setFilter('category', 'books')}
                    >
                        Set Category Books
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>

                <h3>Sorting</h3>
                <div>
                    Sort by: {sortBy || 'None'}, Direction: {sortDirection}
                </div>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setSorting('name')}
                    >
                        Sort by Name
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setSorting('price')}
                    >
                        Sort by Price
                    </button>
                </div>

                <h3>Pagination</h3>
                <div>Current Page: {currentPage}</div>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={prevPage}
                    >
                        Previous Page
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={nextPage}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        );
    };

    return (
        <FilterProvider
            defaultFilters={{ status: 'all' }}
            options={{ isSyncWithQueryString: true }}
        >
            <ExampleComponent />
        </FilterProvider>
    );
};

// Usage with withFilter HOC
const ExampleComponent = ({
    filters,
    setFilter,
    clearFilters,
    sortBy,
    sortDirection,
    setSorting,
    currentPage,
    nextPage,
    prevPage,
}: any) => (
    <div>
        <h3>Filters</h3>
        <div>Current filters: {JSON.stringify(filters)}</div>
        <div className='flex gap-2'>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={() => setFilter('status', 'active')}
            >
                Set Status Active
            </button>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={() => setFilter('category', 'books')}
            >
                Set Category Books
            </button>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={clearFilters}
            >
                Clear Filters
            </button>
        </div>

        <h3>Sorting</h3>
        <div>
            Sort by: {sortBy || 'None'}, Direction: {sortDirection}
        </div>
        <div className='flex gap-2'>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={() => setSorting('name')}
            >
                Sort by Name
            </button>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={() => setSorting('price')}
            >
                Sort by Price
            </button>
        </div>

        <h3>Pagination</h3>
        <div>Current Page: {currentPage}</div>
        <div className='flex gap-2'>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={prevPage}
            >
                Previous Page
            </button>
            <button
                className='p-1 rounded bg-primary text-primary-foreground'
                onClick={nextPage}
            >
                Next Page
            </button>
        </div>
    </div>
);

const ExampleComponentWithFilter = withFilter(ExampleComponent, {
    defaultFilters: { status: 'all' },
    isSyncWithQueryString: true,
});

export const WithHOC: StoryFn = () => <ExampleComponentWithFilter />;

// Example of using FilterContext with a data list
export const DataListExample: StoryFn = () => {
    const DataList = () => {
        const {
            filters,
            setFilter,
            sortBy,
            sortDirection,
            setSorting,
            currentPage,
            nextPage,
            prevPage,
        } = useFilter();

        // Mock data
        const allItems = [
            { id: 1, name: 'Item 1', category: 'books', price: 10 },
            { id: 2, name: 'Item 2', category: 'electronics', price: 20 },
            { id: 3, name: 'Item 3', category: 'books', price: 15 },
            { id: 4, name: 'Item 4', category: 'electronics', price: 25 },
            { id: 5, name: 'Item 5', category: 'books', price: 12 },
        ];

        // Apply filters
        const filteredItems = allItems.filter(
            (item) => !filters.category || item.category === filters.category
        );

        // Apply sorting
        const sortedItems = [...filteredItems].sort((a: any, b: any) => {
            if (!sortBy) return 0;
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            return sortDirection === 'asc'
                ? valueA > valueB
                    ? 1
                    : -1
                : valueB > valueA
                  ? 1
                  : -1;
        });

        return (
            <div>
                <h3>Filters</h3>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setFilter('category', 'books')}
                    >
                        Show Books
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setFilter('category', 'electronics')}
                    >
                        Show Electronics
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setFilter('category', '')}
                    >
                        Show All
                    </button>
                </div>

                <h3>Sorting</h3>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setSorting('name')}
                    >
                        Sort by Name
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={() => setSorting('price')}
                    >
                        Sort by Price
                    </button>
                </div>

                <h3>Items</h3>
                <ul>
                    {sortedItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.category} - ${item.price}
                        </li>
                    ))}
                </ul>

                <h3>Pagination</h3>
                <div>Current Page: {currentPage}</div>
                <div className='flex gap-2'>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={prevPage}
                    >
                        Previous Page
                    </button>
                    <button
                        className='p-1 rounded bg-primary text-primary-foreground'
                        onClick={nextPage}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        );
    };

    return (
        <FilterProvider>
            <DataList />
        </FilterProvider>
    );
};
