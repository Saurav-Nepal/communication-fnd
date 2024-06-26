import { GetObjectFromArray, ObjectDto, useFetchParams } from '@finnoto/core';
import { Tab, Table, TableProps, cn } from '@finnoto/design-system';
import { useEffect, useMemo } from 'react';

type filterListItem = {
    title: string;
    key: string;
    customFilterValue?: ObjectDto;
};

interface FilterTabTable extends TableProps {
    filters: filterListItem[];
    onFilterChange?: (filterProps: ObjectDto, filterValue?: string) => void;
    className?: string;
    filterKey?: string;
}

const FilterTabTable = ({
    filters = [],
    filterKey = 'tableFilter',
    onFilterChange,
    className,
    ...rest
}: FilterTabTable) => {
    const { [filterKey]: tableFilter } = useFetchParams();

    const generateTabs = useMemo(() => {
        return filters.map((filter) => ({
            ...filter,
            component: <Table {...rest} />,
        }));
    }, [filters, rest]);
    useEffect(() => {
        const currentFilter = GetObjectFromArray(filters, 'key', tableFilter);
        const filterValue = currentFilter?.customFilterValue || {
            [filterKey]: tableFilter,
        };
        onFilterChange(filterValue, tableFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <Tab
            tabs={generateTabs}
            querykey={filterKey}
            active={tableFilter || filters[0]?.key}
            containerClassName={cn('h-full', className)}
        />
    );
};

export default FilterTabTable;
