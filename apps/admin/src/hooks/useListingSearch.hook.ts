import { useCallback, useEffect, useState } from 'react';
import { add as AddQuery } from 'react-querybuilder';

import { isEmptyObject, ObjectDto } from '@slabs/ds-utils';

import { COLUMN_TYPE } from '@/constants/columnType.constants';
import { PICK_AFTER_LAST_DOTS } from '@/constants/regex.constants';
import { groupBy, SelectFromOptions } from '@/utils/common.utils';
import { Navigation } from '@/utils/navigation.utils';

export const useListingSearch = (props: any) => {
    const { dictionary = [], searchDetail, genericData, is_report } = props;

    const [groupedOptions, setGroupedOptions] = useState<any>();
    const [selectedColumn, setSelectedColumn] = useState<ObjectDto>(
        dictionary[0] || {}
    );
    const [referenceColumnValue, setReferenceColumnValue] = useState<ObjectDto>(
        {}
    );
    const [activeColumn, setActiveColumn] = useState<ObjectDto>(
        dictionary[0] || {}
    );
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        initialize();
    }, [dictionary, searchDetail, is_report]);

    const initialize = async () => {
        const searchQuery = (Navigation.search() as any).search;
        let selectedColumn;

        setActiveColumn(dictionary[0] || {});
        setSelectedColumn(dictionary[0] || {});

        if (searchQuery) {
            const queryObj = JSON.parse(searchQuery);

            const column =
                queryObj?.rules[0]?.field?.match(PICK_AFTER_LAST_DOTS)[0];

            if (is_report) {
                selectedColumn = SelectFromOptions(
                    dictionary,
                    column,
                    'column_name'
                );
            } else {
                selectedColumn = SelectFromOptions(dictionary, column, 'name');
            }

            setActiveColumn(selectedColumn);
            setQuery(queryObj?.rules[0]?.value);
        } else if (searchDetail && searchDetail.name) {
            const name = searchDetail.name.split(',')[0];
            selectedColumn = SelectFromOptions(dictionary, name.trim(), 'name');

            setActiveColumn(selectedColumn);
        }

        if (!isEmptyObject(selectedColumn)) {
            setSelectedColumn(selectedColumn);
        }
        createGroupedOptions();
    };

    const createGroupedOptions = () => {
        // const dict = dictionary.filter(
        //     (column) => column.type_id === COLUMN_TYPE.STRING
        // ); // Filter only string columns.

        const groupedColumns = groupBy(dictionary, 'parent');
        const groupedOptions: any[] = [];

        for (const label in groupedColumns) {
            // Show only parent model columns
            if (label !== genericData.starter) continue;

            groupedOptions.push({
                label: label,
                options: groupedColumns[label].map((column) => ({
                    ...column,
                    label: column.display_name,
                    value: column.path,
                })),
            });
        }
        setGroupedOptions(groupedOptions);
    };

    /**
     * Invoked when Filter is selected
     */
    const filterChange = (select) => {
        setQuery('');
        setReferenceColumnValue({});
        setSelectedColumn(select);
        setActiveColumn(select);
    };

    /**
     * To get path with parent and set url params
     * @param  {object} event
     */
    const callFunction = useCallback(
        (event) => {
            let query = {
                combinator: 'and',
                rules: [],
            };

            const urlParams: any = Navigation.search();

            if (event.target.value) {
                if (is_report) {
                    query = AddQuery(
                        query,
                        {
                            field: activeColumn.column_name,
                            operator:
                                activeColumn.type_id === COLUMN_TYPE.STRING
                                    ? 'contains'
                                    : '=',
                            value: event.target.value,
                        },
                        []
                    );
                } else {
                    query = AddQuery(
                        query,
                        {
                            field: `${activeColumn.parent}.${
                                activeColumn.referenced_column
                                    ? activeColumn.referenced_column
                                    : activeColumn.name
                            }`,
                            operator:
                                activeColumn.type_id === COLUMN_TYPE.STRING
                                    ? 'contains'
                                    : '=',
                            value: event.target.value,
                        },
                        []
                    );
                }
                urlParams.search = JSON.stringify(query);
                if (urlParams.page) {
                    // if global search is hit and user is currently on any other page, redirect back to page 1
                    urlParams.page = 1;
                }
            } else {
                delete urlParams.search;
            }
            // this.setState({ query: event.target.value });
            Navigation.search(urlParams, { reset: true });
        },
        [activeColumn]
    );

    return {
        query,
        groupedOptions,
        selectedColumn,
        filterChange,
        setQuery,
        callFunction,
    };
};
