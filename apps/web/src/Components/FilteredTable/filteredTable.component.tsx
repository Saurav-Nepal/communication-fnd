import React from 'react';
import { TAB_ITEM, Tab, Table, TableProps, cn } from '@finnoto/design-system';

interface FilteredTableProps extends TableProps {
    className?: string;
    onFilterChange?: (key: string) => void;
    filters: {
        preferences?: {
            active?: string;
            contentContainerClass?: string;
            containerClassName?: string;
            querykey?: string;
        };
        tabs: TAB_ITEM[];
    };
}
const FilteredTable = ({
    className,
    filters,
    onFilterChange,
    ...restProps
}: FilteredTableProps) => {
    const { preferences, tabs } = filters || {};

    const {
        active = 'all',
        querykey = 'tableFilter',
        containerClassName,
        contentContainerClass,
    } = preferences || {};

    return (
        <>
            <Tab
                tabs={tabs}
                active={active || tabs[0].key}
                querykey={querykey}
                onTabChange={onFilterChange}
                containerClassName={containerClassName}
                contentContainerClass={'hidden'}
            />
            <Table {...restProps} />
        </>
    );
};

export default FilteredTable;
