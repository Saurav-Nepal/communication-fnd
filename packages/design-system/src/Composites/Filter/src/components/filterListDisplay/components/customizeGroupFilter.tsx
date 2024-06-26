import {
    EmptyFunction,
    AccessNestedObject,
    FormatDisplayDate,
    IsFunction,
} from '@finnoto/core';
import { useCallback, useMemo } from 'react';
import { FilterItemWrapper } from './filterItem.wrapper';

export const CustomizeGroupFilter = ({
    data = {},
    filter,
    removeFilterData = EmptyFunction,
}: any) => {
    const parseValue = useCallback(
        (group) => {
            const value: any = AccessNestedObject(data, group?.key);

            if (!value) return value;

            switch (group?.type) {
                case 'date':
                    return FormatDisplayDate(value);
                case 'date_time':
                    return FormatDisplayDate(value, true);
                default:
                    return value;
            }
        },
        [data]
    );
    const handleRemoveFilter = useCallback(() => {
        const groups = filter?.groups || [];
        removeFilterData(groups.map((group) => group?.key));
    }, [filter?.groups, removeFilterData]);

    const getFilterData = useCallback(
        (group) => {
            const value = parseValue(group);

            if (!value) return null;
            return `${group?.name} > ${value}`;
        },
        [parseValue]
    );
    const generateFilterList = useMemo(() => {
        const groups = filter?.groups || [];
        let data = [];
        for (let group of groups) {
            data.push(getFilterData(group));
        }
        return data.filter(Boolean);
    }, [filter?.groups, getFilterData]);

    if (IsFunction(filter?.renderFilter))
        return (
            <>
                {filter?.renderFilter(data, handleRemoveFilter, filter?.groups)}
            </>
        );
    if (!generateFilterList?.length) return <></>;
    return (
        <FilterItemWrapper
            className='items-center gap-2'
            onClick={handleRemoveFilter}
        >
            {generateFilterList.join(`${filter?.splitter || ', '}`)}
        </FilterItemWrapper>
    );
};
