import {
    IndexOfObjectInArray,
    IsValidString,
    SortArrayObjectBy,
} from '@finnoto/core';
import { useCallback, useMemo, useState } from 'react';
import { useList, useUpdateEffect } from 'react-use';

export const useColumnConfigurator = ({ definitions, preferences }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [
        columns,
        {
            set: setSelectedColumn,
            insertAt: insertSelectedColumnAt,
            removeAt,
            updateAt: updateSelectedColumnAt,
        },
    ] = useList<any>(getSelectedColumns());

    function getSelectedColumns() {
        const columns = definitions.map((def) => {
            const prefIndex = IndexOfObjectInArray(
                preferences,
                'key',
                def.identifier
            );
            const pref = prefIndex > -1 ? preferences[prefIndex] : undefined;

            return {
                ...def,
                display_name: pref?.display_name,
                selected: !!pref,
                priority: prefIndex > -1 ? prefIndex : 999999,
            };
        });

        return SortArrayObjectBy(columns, 'priority');
    }

    useUpdateEffect(() => {
        setSelectedColumn(getSelectedColumns);
    }, [definitions, preferences]);

    const updateColumn = (key: string, item: any) => {
        const index = IndexOfObjectInArray(columns, 'identifier', key);

        if (index === -1) return;
        updateSelectedColumnAt(index, item);
    };

    const filteredColumns = useMemo(() => {
        if (!IsValidString(searchText)) return columns;
        return columns.filter((col) => {
            return (
                col.name
                    .toString()
                    .toLowerCase()
                    .indexOf(searchText.toLowerCase()) != -1
            );
        });
    }, [searchText, columns]);

    const changeSelectedColumnPos = useCallback(
        (index: number, newIndex: number) => {
            const tempCol = columns[index];
            removeAt(index);
            insertSelectedColumnAt(newIndex, tempCol);
        },
        [insertSelectedColumnAt, removeAt, columns]
    );

    return {
        searchText,
        columns,
        filteredColumns,
        setSearchText,
        updateColumn,
        changeSelectedColumnPos,
    };
};
