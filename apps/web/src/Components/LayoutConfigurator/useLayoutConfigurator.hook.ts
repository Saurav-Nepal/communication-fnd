import { IndexOfObjectInArray, IsValidString } from '@finnoto/core';
import { useCallback, useMemo, useState } from 'react';
import { useList } from 'react-use';

export const useLayoutConfigurator = ({ definitions, preferences }) => {
    const [activeColumn, setActiveColumn] = useState<any>();
    const [searchText, setSearchText] = useState<string>('');
    const [
        selectedColumns,
        {
            push: pushSelectedColumn,
            insertAt: insertSelectedColumnAt,
            removeAt,
            updateAt: updateSelectedColumnAt,
        },
    ] = useList<any>(
        preferences.map((pref) => ({
            name: pref.name,
            display_name: pref.display_name,
            identifier: pref.identifier || pref.key,
        })) || []
    );

    const remainingColumns = useMemo(
        () =>
            definitions.filter((column) => {
                const index = IndexOfObjectInArray(
                    selectedColumns,
                    'identifier',
                    column.identifier
                );
                return index === -1;
            }),
        [definitions, selectedColumns]
    );

    const finalColumnList = useMemo(() => {
        if (!IsValidString(searchText)) return remainingColumns;
        return remainingColumns.filter((col) => {
            return col.name.toString().toLowerCase().indexOf(searchText) != -1;
        });
    }, [searchText, remainingColumns]);

    const activeColumnIndex = useMemo(() => {
        if (!activeColumn) return -1;

        return IndexOfObjectInArray(
            selectedColumns,
            'identifier',
            activeColumn.identifier
        );
    }, [selectedColumns, activeColumn]);

    const addSelectedColumn = (column, index?: number) => {
        let selectedColumnObj = {
            display_name: '',
            name: column.name,
            identifier: column.identifier,
        };

        if (index > -1) return insertSelectedColumnAt(index, selectedColumnObj);
        pushSelectedColumn(selectedColumnObj);
    };

    const changeSelectedColumnPos = useCallback(
        (index: number, newIndex: number) => {
            const tempCol = selectedColumns[index];
            removeAt(index);
            insertSelectedColumnAt(newIndex, tempCol);
        },
        [insertSelectedColumnAt, removeAt, selectedColumns]
    );

    const moveActiveColumn = (to: 'up' | 'down') => {
        if (activeColumnIndex === -1) return;
        if (to === 'up' && activeColumnIndex <= 1) return;
        if (to === 'down' && activeColumnIndex === selectedColumns.length - 1)
            return;
        changeSelectedColumnPos(
            activeColumnIndex,
            activeColumnIndex + (to === 'up' ? -1 : 1)
        );
    };

    return {
        searchText,
        selectedColumns,
        activeColumn,
        finalColumnList,
        setSearchText,
        addSelectedColumn,
        removeSelectedColumnAt: removeAt,
        updateSelectedColumnAt,
        changeSelectedColumnPos,
        setActiveColumn,
        moveActiveColumn,
    };
};
