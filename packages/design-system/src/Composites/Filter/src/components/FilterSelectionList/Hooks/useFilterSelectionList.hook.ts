import { useCallback, useMemo, useState } from 'react';
import {
    add as addQuery,
    remove as removeQuery,
    update,
} from 'react-querybuilder';

import {
    GetObjectFromArray,
    IsArray,
    IsEmptyArray,
    IsUndefined,
    ObjectDto,
    RESTRICTED_FILTERS,
    SortArrayObjectBy,
} from '@finnoto/core';

import { useFilterContext } from '../../../provider';
import { ListFormFilterProps } from '../../list-filter-form';
import { parseDefinitionColumnTypes } from '../filterSelectionList.utils';

export const useFilterSelectionList = () => {
    const [tempSelectedFilter, setTempSelectedFilter] = useState<string>(null);

    const {
        definitionFilterColumns,
        listFilters,
        filterData,
        filterJson,
        queryString,
        removeFilterData,
        handleFilterData,
        handleNavigationSearch,
        clearAllFilter,
    } = useFilterContext();

    const { [RESTRICTED_FILTERS]: restricted_filters } = queryString ?? {};
    const newListFilters = useMemo<ListFormFilterProps[]>(() => {
        let list = [...(listFilters ?? [])];

        definitionFilterColumns.forEach((definitionColumn) => {
            if (GetObjectFromArray(list, 'key', definitionColumn.name)) return;

            const listType = parseDefinitionColumnTypes(definitionColumn.type);
            if (!listType) return;

            list.push({
                title: definitionColumn.label,
                key: definitionColumn.name,
                controller_type: definitionColumn.controller_type,
                type: listType.type,
                ...listType.props,
                methodParams: definitionColumn.methodParams,
                filterClassParams: definitionColumn.classParams,
                operators: definitionColumn.operators,
                definition: definitionColumn,
                ...(definitionColumn.attributes ?? {}),
                isDefinitionQueryFilter: true,
            });
        });

        return SortArrayObjectBy(list, 'title');
    }, [definitionFilterColumns, listFilters]);

    const remainingListFilters = useMemo(() => {
        return newListFilters.filter(
            (filter) =>
                (filter as any).isDefinitionQueryFilter ||
                !Object.keys(filterData).includes(filter.key)
        );
    }, [filterData, newListFilters]);

    const appliedFilters = useMemo(() => {
        let list = [];

        Object.keys(filterData).forEach((filterKey) => {
            const config = GetObjectFromArray(newListFilters, 'key', filterKey);
            if (!config) return;
            if (config.isDefinitionQueryFilter) return;
            if (config.isOuterFilter) return;

            list.push({
                key: filterKey,
                value: filterData[filterKey],
                config,
            });
        });

        if (filterJson) {
            filterJson?.rules?.forEach((rule) => {
                if (!IsEmptyArray(rule.rules)) return;
                const config = GetObjectFromArray(
                    newListFilters,
                    'key',
                    rule.field
                );
                if (!config) return;
                if (!config.isDefinitionQueryFilter) return;

                list.push({
                    key: rule.field,
                    value: rule.value,
                    config: {
                        id: rule.id,
                        selectedOperator: rule.operator,
                        path: rule.path,
                        ...config,
                    },
                });
            });
        }

        return list;
    }, [filterData, filterJson, newListFilters]);

    const handleFilterChange = useCallback(
        (value: any, config: ObjectDto) => {
            if (!config.isDefinitionQueryFilter) {
                return handleFilterData({ [config.key]: value });
            }

            const appliedFilter = GetObjectFromArray(
                appliedFilters,
                'key',
                config.key
            );

            let newQueryFilter = filterJson ?? {
                rules: [],
                path: [],
                combinator: 'and',
                not: false,
            };

            if (appliedFilter) {
                if (
                    IsUndefined(value) ||
                    (IsArray(value) && IsEmptyArray(value))
                ) {
                    newQueryFilter = removeQuery(
                        newQueryFilter as any,
                        appliedFilter?.config?.path || []
                    );
                }
                newQueryFilter = update(
                    newQueryFilter as any,
                    'value',
                    value,
                    appliedFilter?.config?.path || []
                );
                newQueryFilter = update(
                    newQueryFilter as any,
                    'operator',
                    config.selectedOperator ?? 'in',
                    appliedFilter?.config?.path || []
                );
            } else {
                newQueryFilter = addQuery(
                    newQueryFilter as any,
                    {
                        field: config.key,
                        value,
                        operator: config.selectedOperator ?? 'in', // TODO: Add default operator
                        path: [newQueryFilter.rules.length],
                    },
                    []
                );
            }

            handleNavigationSearch(
                {
                    ...queryString,
                    filter_query: newQueryFilter
                        ? JSON.stringify(newQueryFilter)
                        : undefined,
                },
                false
            );
        },
        [
            appliedFilters,
            filterJson,
            handleFilterData,
            handleNavigationSearch,
            queryString,
        ]
    );
    const removeFilter = (key: string) => {
        const filter = GetObjectFromArray(appliedFilters, 'key', key);

        if (!filter) return;

        if (!filter.config?.isDefinitionQueryFilter)
            return removeFilterData(key);

        let newQueryFilter = removeQuery(filterJson as any, filter.config.path);

        if (IsEmptyArray(newQueryFilter.rules)) {
            newQueryFilter = undefined;
        }

        if (!IsEmptyArray(newQueryFilter?.rules)) {
            newQueryFilter = {
                ...newQueryFilter,
                rules: newQueryFilter.rules?.map((rule, index) => {
                    return {
                        ...rule,
                        path: [index],
                    };
                }),
            };
        }

        if (!newQueryFilter && !queryString.filter) return clearAllFilter();

        handleNavigationSearch(
            {
                ...queryString,
                filter_query: newQueryFilter
                    ? JSON.stringify(newQueryFilter)
                    : undefined,
            },
            false
        );
    };

    return {
        appliedFilters,
        listFilters: newListFilters,
        remainingListFilters,
        tempSelectedFilter,
        setTempSelectedFilter,
        handleFilterChange,
        removeFilter,
        restricted_filters,
    };
};
