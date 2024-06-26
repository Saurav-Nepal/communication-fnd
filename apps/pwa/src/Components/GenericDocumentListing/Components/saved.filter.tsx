import { useRef } from 'react';

import { Navigation, useFetchParams } from '@finnoto/core';
import {
    ListSelect,
    RadioGroupItem,
    useListFormFilterContext,
    useSaveFilter,
    withListFormFilterProviderExport,
} from '@finnoto/design-system';

// eslint-disable-next-line import/no-cycle
import { ListActionButton } from '../genericDocumentListing.component';

import { FilterIcon } from 'assets';

const SaveFilter = withListFormFilterProviderExport(
    ({ definitionKey }: { definitionKey?: string }) => {
        const { saved_filter } = useFetchParams();

        const selectRef = useRef<any>();

        const {
            isColumnDefinitionLoading,
            currentFilter,

            getSanitizedPreferences,
        } = useSaveFilter({ saved_filter, definitionKey });

        if (isColumnDefinitionLoading) return null;

        return (
            <ListSelect
                name='Saved Filters'
                options={getSanitizedPreferences()}
                ref={selectRef}
                fullScreen={true}
                className={'h-screen overflow-hidden'}
                value={currentFilter?.id}
                onSelect={(option) => {
                    if (!option)
                        return Navigation.search({
                            saved_filter: null,
                        });
                    const { filter_query, ...rest } =
                        option?.data?.query_definition || {};

                    Navigation.search({
                        saved_filter: option?.value || null,
                        filter: JSON.stringify(rest),
                        filter_query,
                    });
                }}
                renderItem={(value, option, onSelect) => {
                    const isSelected = option.value === currentFilter?.id;
                    const isDisabled = option.value !== currentFilter?.id;

                    return (
                        <div
                            className='flex flex-row items-center h-10 py-5 overflow-hidden border rounded bg-base-100 '
                            onClick={() => {
                                onSelect(option);
                            }}
                        >
                            <div className='flex flex-row w-[80%] items-center mx-2'>
                                <RadioGroupItem
                                    name='filter'
                                    size='sm'
                                    value={value}
                                    appearance='primary'
                                    checked={isSelected}
                                    readOnly
                                />

                                <div className='text-sm font-medium text-gray-900'>
                                    {option.label}
                                </div>
                            </div>
                            {option.tooltip && (
                                <div className='ml-2 '>
                                    <option.rightIcon
                                        className='w-4 text-gray-500'
                                        title={option.tooltip}
                                    />
                                </div>
                            )}
                        </div>
                    );
                }}
                footer={
                    saved_filter ? (
                        <div
                            className='flex-1 '
                            onClick={() => {
                                Navigation.search({ saved_filter: null });
                            }}
                        >
                            <span className='underline text-error'>
                                {' '}
                                Clear filter
                            </span>
                        </div>
                    ) : null
                }
            >
                <ListActionButton
                    title='Filters'
                    icon={FilterIcon}
                    iconSize={18}
                    name='saved_filter'
                    isSvg
                />
            </ListSelect>
        );
    }
);

export default SaveFilter;
