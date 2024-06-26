import { useRef } from 'react';

import { IsEmptyArray, Navigation, useFetchParams } from '@finnoto/core';
import {
    SelectableDropdownMenu,
    useListFormFilterContext,
    useSaveFilter,
    withListFormFilterProviderExport,
} from '@finnoto/design-system';

import { openSavedFilters } from '@Utils/functions.utils';

const SaveFilter = withListFormFilterProviderExport(
    ({ definitionKey }: { definitionKey?: string }) => {
        const { saved_filter } = useFetchParams();

        const { filterData, listFilters } = useListFormFilterContext();
        const selectRef = useRef<any>();

        const {
            isColumnDefinitionLoading,
            filterPreferences,
            currentFilter,
            refetch,
            getSanitizedPreferences,
        } = useSaveFilter({ saved_filter, definitionKey });

        if (isColumnDefinitionLoading || IsEmptyArray(filterPreferences))
            return null;

        return (
            <SelectableDropdownMenu
                ref={selectRef}
                options={getSanitizedPreferences()}
                searchPlaceholder='Search saved filter'
                align='end'
                value={currentFilter?.id}
                onChange={(pref) => {
                    if (!pref) return Navigation.search({});
                    const { filter_query, ...rest } =
                        pref.data?.query_definition || {};

                    Navigation.search({
                        saved_filter: pref.value || null,
                        filter: JSON.stringify(rest),
                        filter_query,
                    });
                }}
                side='bottom'
                placeholder='Select saved filter'
                footer={
                    <div className='items-center justify-between gap-4 px-2 text-sm row-flex'>
                        {' '}
                        <div
                            onClick={() => {
                                selectRef?.current?.handleClose();
                                openSavedFilters(definitionKey, {
                                    refetchPreferences: refetch,
                                    listFilters,
                                });
                            }}
                            className='w-full text-center link link-hover'
                        >
                            Configure
                        </div>
                    </div>
                }
            />
        );
    }
);

export default SaveFilter;
