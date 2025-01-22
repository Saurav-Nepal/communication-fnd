import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { FilterProvider, useFilter } from './use-filter';
import { withFilter } from './with-filter';

// Mock the window.history.replaceState
const mockReplaceState = jest.fn();
Object.defineProperty(window, 'history', {
    writable: true,
    value: { replaceState: mockReplaceState },
});

// Test component using the useFilter hook
const TestComponent: React.FC = () => {
    const {
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
    } = useFilter();

    return (
        <div>
            <div data-testid='filters'>{JSON.stringify(filters)}</div>
            <div data-testid='sort'>{`${sortBy}:${sortDirection}`}</div>
            <div data-testid='pagination'>{`${currentPage}:${itemsPerPage}`}</div>
            <button onClick={() => setFilter('status', 'active')}>
                Set Filter
            </button>
            <button onClick={clearFilters}>Clear Filters</button>
            <button onClick={() => setSorting('name')}>Set Sorting</button>
            <button onClick={() => setItemsPerPage(20)}>
                Set Items Per Page
            </button>
            <button onClick={nextPage}>Next Page</button>
            <button onClick={prevPage}>Prev Page</button>
            <button onClick={() => goToPage(3)}>Go To Page 3</button>
        </div>
    );
};

describe('useFilter', () => {
    it('provides default values', () => {
        render(
            <FilterProvider>
                <TestComponent />
            </FilterProvider>
        );

        expect(screen.getByTestId('filters')).toHaveTextContent('{}');
        expect(screen.getByTestId('sort')).toHaveTextContent('null:asc');
        expect(screen.getByTestId('pagination')).toHaveTextContent('1:10');
    });

    it('sets and clears filters', () => {
        render(
            <FilterProvider>
                <TestComponent />
            </FilterProvider>
        );

        fireEvent.click(screen.getByText('Set Filter'));
        expect(screen.getByTestId('filters')).toHaveTextContent(
            '{"status":"active"}'
        );

        fireEvent.click(screen.getByText('Clear Filters'));
        expect(screen.getByTestId('filters')).toHaveTextContent('{}');
    });

    it('sets sorting', () => {
        render(
            <FilterProvider>
                <TestComponent />
            </FilterProvider>
        );

        fireEvent.click(screen.getByText('Set Sorting'));
        expect(screen.getByTestId('sort')).toHaveTextContent('name:asc');

        fireEvent.click(screen.getByText('Set Sorting'));
        expect(screen.getByTestId('sort')).toHaveTextContent('name:desc');
    });

    it('handles pagination', () => {
        render(
            <FilterProvider>
                <TestComponent />
            </FilterProvider>
        );

        fireEvent.click(screen.getByText('Next Page'));
        expect(screen.getByTestId('pagination')).toHaveTextContent('2:10');

        fireEvent.click(screen.getByText('Prev Page'));
        expect(screen.getByTestId('pagination')).toHaveTextContent('1:10');

        fireEvent.click(screen.getByText('Go To Page 3'));
        expect(screen.getByTestId('pagination')).toHaveTextContent('3:10');

        fireEvent.click(screen.getByText('Set Items Per Page'));
        expect(screen.getByTestId('pagination')).toHaveTextContent('3:20');
    });

    it('syncs with query string', () => {
        render(
            <FilterProvider options={{ isSyncWithQueryString: true }}>
                <TestComponent />
            </FilterProvider>
        );

        fireEvent.click(screen.getByText('Set Filter'));
        fireEvent.click(screen.getByText('Set Sorting'));
        fireEvent.click(screen.getByText('Next Page'));

        expect(mockReplaceState).toHaveBeenCalledWith(
            {},
            '',
            expect.stringContaining(
                '?status=active&sortBy=name&sortDirection=asc&page=2&itemsPerPage=10'
            )
        );
    });
});

describe('withFilter HOC', () => {
    const WrappedComponent: React.FC<any> = ({
        filters,
        setFilter,
        sortBy,
    }) => (
        <div>
            <div data-testid='filters'>{JSON.stringify(filters)}</div>
            <div data-testid='sort'>{sortBy}</div>
            <button onClick={() => setFilter('status', 'active')}>
                Set Filter
            </button>
        </div>
    );

    const ComponentWithFilter = withFilter(WrappedComponent, {
        defaultFilters: { category: 'all' },
        isSyncWithQueryString: true,
    });

    it('passes filter props to wrapped component', () => {
        render(<ComponentWithFilter />);

        expect(screen.getByTestId('filters')).toHaveTextContent(
            '{"category":"all"}'
        );

        fireEvent.click(screen.getByText('Set Filter'));
        expect(screen.getByTestId('filters')).toHaveTextContent(
            '{"category":"all","status":"active"}'
        );
    });
});
