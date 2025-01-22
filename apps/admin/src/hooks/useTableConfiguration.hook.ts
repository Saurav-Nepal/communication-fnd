import { useCallback, useMemo, useState } from 'react';
import { useEffectOnce, useList } from 'react-use';

import {
    indexOfObjectInArray,
    isEmptyObject,
    isUndefined,
    isValidString,
    uuidV4,
} from '@slabs/ds-utils';

import { LOGGED_USER } from '@/constants/state.constants';
import { COLUMN_DATA_TYPE, LAYOUT_TYPE, TableConfiguratorProps } from '@/types';
import { groupBy } from '@/utils/common.utils';
import { SetPreference } from '@/utils/preference.utils';
import { SubscribeToEvent, UnsubscribeEvent } from '@/utils/stateManager.utils';

const useTableConfiguration = ({
    columns,
    is_report,
    layout,
    userId,
    menuId,
    sourceId,
    listName,
    source,
    url,
    isFormConfigurator,
    onSubmit,
}: TableConfiguratorProps) => {
    const [formConfigurator, setFormConfigurator] = useState<boolean>(false);
    const [activeColumn, setActiveColumn] = useState<COLUMN_DATA_TYPE>();
    const [searchText, setSearchText] = useState<string>('');
    const [
        selectedColumns,
        {
            push: pushSelectedColumn,
            insertAt: insertSelectedColumnAt,
            removeAt,
            updateAt: updateSelectedColumnAt,
            filter: filterSelectedColumns,
        },
    ] = useList(layout?.column_definition || []);

    const columnArray = useMemo(() => Object.values(columns || {}), [columns]);

    const remainingColumns = useMemo(
        () =>
            columnArray.filter((column) => {
                const index = indexOfObjectInArray(
                    selectedColumns,
                    'index',
                    is_report ? column.parent + '.' + column.path : column.path
                );
                return index === -1;
            }),
        [columnArray, selectedColumns, is_report]
    );

    const finalColumnList = useMemo(() => {
        if (!isValidString(searchText)) return remainingColumns;
        return remainingColumns.filter((col) => {
            return (
                col[is_report ? 'column_name' : 'name']
                    ?.toString()
                    .toLowerCase()
                    .indexOf(searchText) != -1
            );
        });
    }, [searchText, remainingColumns]);

    const leftColumns = useMemo(
        () => groupBy(finalColumnList, 'parent'),
        [finalColumnList]
    );

    const columnKeys = useMemo(() => Object.keys(leftColumns), [leftColumns]);

    const activeColumnIndex = useMemo(() => {
        if (!activeColumn) return -1;

        if (activeColumn.split)
            return indexOfObjectInArray(
                selectedColumns,
                'label',
                activeColumn.label
            );

        return indexOfObjectInArray(
            selectedColumns,
            'index',
            activeColumn.index
        );
    }, [selectedColumns, activeColumn]);

    const addSelectedColumn = (column, index: number = -1) => {
        let selectedColumnObj = {
            headingCollapsed: true,
            heading: '',
            object: column.parent,
            column: column.name,
            index: isFormConfigurator
                ? column.name
                : column.parent + '.' + column.name,
        };

        if (is_report) {
            selectedColumnObj = {
                headingCollapsed: true,
                heading: '',
                object: column.parent,
                column: column.column_name,
                index: column.parent + '.' + column.column_name,
            };
        }

        if (index > -1) return insertSelectedColumnAt(index, selectedColumnObj);
        pushSelectedColumn(selectedColumnObj);
    };

    const removeSelectedColumnAt = (index: number) => {
        const column = selectedColumns[index];

        if (!column.split || column.separator) return removeAt(index);

        const splitId = column.label?.split('-split-')[1];
        filterSelectedColumns(
            (column) => !column.label?.includes(`-split-${splitId}`)
        );
        return;
    };

    const addSplit = (type: 'v-split' | 'h-split' = 'v-split') => {
        const splitObj = {
            label: 'Seperator',
            split: true,
        };

        if (type === 'h-split')
            return pushSelectedColumn({
                ...splitObj,
                label: 'Seperator',
                separator: true,
            });

        const ext = uuidV4().substring(0, 3);
        pushSelectedColumn({ ...splitObj, label: `s-split-${ext}` });
        pushSelectedColumn({ ...splitObj, label: `e-split-${ext}` });
    };

    const changeSelectedColumnPos = useCallback(
        (index: number, newIndex: number) => {
            const tempCol = selectedColumns[index];
            removeAt(index);
            insertSelectedColumnAt(newIndex, tempCol);
        },
        [selectedColumns]
    );

    const applyChanges = async (overRide?: boolean) => {
        if (isUndefined(layout)) return;

        let name = listName;
        if (isFormConfigurator && layout.name) {
            name = layout.name;
        }

        const { success, response } = await SetPreference({
            userId,
            source,
            menuId: sourceId || menuId,
            name,
            selectedColumns,
            layout,
            override_all: overRide ? 1 : 0,
            url,
        });

        if (!success) return;

        if (!isEmptyObject(layout)) {
            layout.column_definition = selectedColumns;
            onSubmit?.(layout);
            return;
        }

        layout = response as LAYOUT_TYPE;
        onSubmit?.(layout);
    };

    const userDataFetched = (data) => {
        setFormConfigurator(data.hasPermission('form-configurator') || false);
    };

    const moveActiveColumn = (to: 'up' | 'down') => {
        if (activeColumnIndex === -1) return;
        if (to === 'up' && activeColumnIndex === 0) return;
        if (to === 'down' && activeColumnIndex === selectedColumns.length - 1)
            return;
        changeSelectedColumnPos(
            activeColumnIndex,
            activeColumnIndex + (to === 'up' ? -1 : 1)
        );
    };

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: LOGGED_USER,
            callback: userDataFetched,
        });

        return () => {
            UnsubscribeEvent({
                eventName: LOGGED_USER,
                callback: userDataFetched,
            });
        };
    });

    return {
        searchText,
        columnKeys,
        leftColumns,
        columnArray,
        selectedColumns,
        formConfigurator,
        activeColumn,
        applyChanges,
        setSearchText,
        addSelectedColumn,
        removeSelectedColumnAt,
        updateSelectedColumnAt,
        changeSelectedColumnPos,
        setActiveColumn,
        moveActiveColumn,
        addSplit,
    };
};

export { useTableConfiguration };
