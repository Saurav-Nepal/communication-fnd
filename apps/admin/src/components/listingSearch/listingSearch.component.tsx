import React from 'react';

import { Input, SelectBox } from '@slabs/ds-core';

import { useListingSearch } from '@/hooks/useListingSearch.hook';
import { getColumnType } from '@/utils/common.utils';

import { formElements } from '../formElements/formElements.component';
import { COLUMN_TYPE } from './../../constants/columnType.constants';

const ListingSearch = (props: any) => {
    const {
        query,
        groupedOptions,
        selectedColumn,
        filterChange,
        setQuery,
        callFunction,
    } = useListingSearch(props);
    const { type_id: column_type_id } = selectedColumn || {};

    /**
     * on press enter,
     * @param  {} e
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            callFunction(e);
        }
    };

    return (
        <div className='flex gap-2 listing-search-tool'>
            <div className='listing-select-tool'>
                <SelectBox
                    className='min-w-44'
                    onOptionChange={(data) => {
                        filterChange(data);
                    }}
                    value={selectedColumn.value ?? selectedColumn.path}
                    options={groupedOptions}
                    placeholder='Column'
                    isClearable={false}
                    isSearchable
                />
            </div>
            <div className='listing-input-tool'>
                {[
                    COLUMN_TYPE.REFERENCE,
                    COLUMN_TYPE.SELECT,
                    COLUMN_TYPE.DATETIME,
                    COLUMN_TYPE.DATE,
                ].includes(column_type_id) ? (
                    formElements({
                        type: getColumnType(selectedColumn),
                        value: query,
                        className: 'input-select',
                        style: { height: '36px', minWidth: '120px' },
                        size: 'sm',
                        dict: selectedColumn,
                        onChange: (value) => {
                            setQuery(value);
                            callFunction({ target: { value } });
                        },
                    })
                ) : (
                    <Input
                        type='text'
                        className='input-select form-control'
                        placeholder={`Search ${selectedColumn.display_name}`}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        onKeyDown={handleKeyPress}
                    />
                )}
            </div>
        </div>
    );
};

export default ListingSearch;
