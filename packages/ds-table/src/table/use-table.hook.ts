import { useEffect, useMemo, useState } from 'react';

import { useList } from '@slabs/ds-hooks';
import { isEmptyObject, ObjectDto } from '@slabs/ds-utils';

import { SortArrayObjectBy } from '../utils';
import { TableColumn } from './table.types';

interface UseTableHookType {
    column: TableColumn[];
    data: any[];
    isInitialSelectAll?: boolean;
    defaultSelectedList?: ObjectDto[];
}

export const useTable = ({
    column,
    data,
    isInitialSelectAll,
    defaultSelectedList = [],
}: UseTableHookType) => {
    // State to track the selected rows
    const [
        selectedRows,
        {
            set: setSelected,
            removeAt: removeSelected,
            reset: resetSelected,
            push: pushSelected,
        },
    ] = useList(isInitialSelectAll ? data : defaultSelectedList);

    useEffect(() => {
        if (!isInitialSelectAll || !data?.length) return;

        setSelected(data);
    }, [data, defaultSelectedList, isInitialSelectAll, setSelected]);

    // State to track the sorted column
    const [sortedColumn, setSortedColumn] = useState<any>({});

    // Function to handle column sorting
    const handleColumnSort = (key: string, col: any) => {
        setSortedColumn({ sortOrder: key, key: col?.key });
    };

    // Function to clear sorted data
    const clearSortedData = () => {
        setSortedColumn({});
    };

    // Memoized table data with sorting applied
    const sanitizedTableData = useMemo(() => {
        if (!isEmptyObject(sortedColumn)) {
            return SortArrayObjectBy(
                data,
                sortedColumn?.key,
                sortedColumn?.sortOrder
            );
        }
        return data;
    }, [data, sortedColumn]);

    const sanitizedTableColumn = useMemo(() => {
        return (column || []).filter((column) => column?.visible !== false);
    }, [column]);

    const handleSelectDeselectAll = (checked: boolean) => {
        if (checked) {
            setSelected(sanitizedTableData);
        } else {
            resetSelected();
            setSelected([]);
        }
    };

    return {
        sanitizedTableData,
        sanitizedTableColumn,
        handleSelectDeselectAll,
        selectedRows,
        pushSelected,
        removeSelected,
        resetSelected,
        handleColumnSort,
        sortedColumn,
        clearSortedData,
    };
};
