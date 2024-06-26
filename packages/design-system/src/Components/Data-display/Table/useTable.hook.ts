import { useEffect, useMemo, useState } from 'react';
import { useList } from 'react-use';

import {
    IsEmptyArray,
    ObjectDto,
    SortArrayObjectBy,
    useUncontrolledList,
} from '@finnoto/core';

import { IsEmptyObject } from '../../../Utils/common.ui.utils';
import { TableColumn } from './table.types';

interface useTableHookTypes {
    column: TableColumn[];
    data: any[];
    initialSelectAll?: boolean;
    defaultSelectedList?: ObjectDto[];
}

export const useTable = ({
    column,
    data,
    initialSelectAll,
    defaultSelectedList = [],
}: useTableHookTypes) => {
    // State to track the selected rows
    const [
        selectedRows,
        {
            set: setSelected,
            removeAt: removeSelected,
            reset: resetSelected,
            push: pushSelected,
        },
    ] = useList(initialSelectAll ? data : defaultSelectedList);

    useEffect(() => {
        if (!initialSelectAll || !data?.length) return;

        setSelected(data);
    }, [data, defaultSelectedList, initialSelectAll, setSelected]);

    // State to track the sorted column
    const [sortedColumn, setSortedColumn] = useState<any>({});

    // Function to handle column sorting
    const handleColumnSort = (key, col) => {
        setSortedColumn({ sortOrder: key, key: col?.key });
    };

    // Function to clear sorted data
    const clearSortedData = () => {
        setSortedColumn({});
    };

    // Memoized table data with sorting applied
    const sanitizedTableData = useMemo(() => {
        if (!IsEmptyObject(sortedColumn)) {
            return SortArrayObjectBy(
                data,
                sortedColumn?.key,
                sortedColumn?.sortOrder
            );
        }
        return data;
    }, [data, sortedColumn]);

    // Memoized table column
    const sanitizedTableColumn = useMemo(() => {
        return (column || []).filter((column) => column?.visible !== false);
    }, [column]);

    // Function to handle selecting/deselecting all rows
    const handleSelectDeselectAll = (checked) => {
        if (checked) {
            setSelected(sanitizedTableData);
        } else {
            resetSelected();
            setSelected([]);
        }
    };

    // Return the values and functions to be used by the consuming component
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
