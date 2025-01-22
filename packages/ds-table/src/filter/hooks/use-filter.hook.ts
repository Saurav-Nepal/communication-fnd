import { useCallback, useMemo } from 'react';
import { GetItem, SetItem } from 'storage-utility';

import {
    isArray,
    isEmptyObject,
    isValidString,
    ObjectDto,
    parseJSONString,
    removeEmptyObjectKeys,
} from '@slabs/ds-utils';

import {
    getDefaultFilterQueries,
    parseFilterQueryString,
    parseFilterQueryToSql,
} from '../../utils/filter.utils';
import { useQueryState } from './use-query-state.hook';

export const useFilter = ({
    defaultValues = {},
    defaultFilterQueries,
    defaultRestrictedQueries,
    filterAliasKey = 'filter',
    filterStoreKey,
    disableNav,
}: {
    defaultValues?: ObjectDto;
    defaultFilterQueries?: ObjectDto;
    defaultRestrictedQueries?: string;
    filterAliasKey?: string;
    filterStoreKey?: string;
    disableNav?: boolean;
}) => {
    const defaultQueries = getDefaultFilterQueries(
        defaultFilterQueries,
        defaultRestrictedQueries
    );

    const [queryString, setQueryString] = useQueryState<ObjectDto>({
        defaultQueries,
        disableQuery: disableNav,
    });

    const { filter_query: paramsFilterQuery, [filterAliasKey]: filterParams } =
        queryString || {};

    const setStoreFilter = useCallback(
        (data: any) => {
            if (!filterStoreKey) return;
            SetItem(filterStoreKey, data);
        },
        [filterStoreKey]
    );
    const getStoreFilters = useCallback(
        (filterAliasKey?: string) => {
            if (!filterStoreKey) return {};
            if (!filterAliasKey) return GetItem(filterStoreKey);
            try {
                return (
                    JSON.parse(GetItem(filterStoreKey)[filterAliasKey]) || {}
                );
            } catch (e) {
                return {};
            }
        },
        [filterStoreKey]
    );

    const filterData = useMemo(() => {
        const defaultLimit = 20;

        const storeFilters = getStoreFilters(filterAliasKey) || {};

        try {
            const jsonFilters = filterParams ? JSON.parse(filterParams) : {};

            return {
                limit: defaultLimit,
                ...defaultValues,
                ...storeFilters,
                ...jsonFilters,
            };
        } catch (error) {
            return {
                limit: defaultLimit,
                ...defaultValues,
            };
        }
    }, [defaultValues, filterAliasKey, filterParams, getStoreFilters]);

    const filterQuery = useMemo(() => {
        if (paramsFilterQuery) {
            return paramsFilterQuery;
        }

        const storeFilters = getStoreFilters() || {};
        return storeFilters?.filter_query;
    }, [getStoreFilters, paramsFilterQuery]);

    const filterJson = useMemo(() => {
        const filterJson = parseJSONString(filterQuery);
        if (!filterJson || isEmptyObject(filterJson)) return;

        return filterJson;
    }, [filterQuery]);

    const sqlFilterQuery = useMemo(() => {
        return parseFilterQueryToSql(parseFilterQueryString(filterQuery));
    }, [filterQuery]);

    const clearAllFilter = useCallback(
        (queries = queryString) => {
            const newQueryString = { ...queries };
            delete newQueryString.filter;
            delete newQueryString.filter_query;
            delete newQueryString.saved_filter;

            setQueryString(newQueryString, true);
        },
        [queryString, setQueryString]
    );

    const isAnyFilterApplied = useMemo(() => {
        const { page, limit, ...rest } = filterData || {};

        if (!rest) return null;
        const filterKeys = Object.keys(rest);
        return filterKeys.length > 0 || isValidString(filterQuery);
    }, [filterData, filterQuery]);

    //it helps to maintain the state by navigating the state in url
    const handleNavigationSearch = useCallback(
        (
            data: ObjectDto,
            isAliasing: boolean = true,
            options?: {
                isPaginationChanged?: boolean;
                reset?: boolean;
            }
        ) => {
            const newQueryString = { ...queryString };
            const { _, __, ...rest } = data || {};
            if (isEmptyObject(rest) && !options?.isPaginationChanged) {
                setStoreFilter(null);
                if (!paramsFilterQuery) return clearAllFilter();
                delete newQueryString[filterAliasKey];
                return setQueryString(newQueryString);
            }

            if (!isAliasing) {
                setStoreFilter(data);
                return setQueryString(data, options?.reset);
            }

            const query = {
                [filterAliasKey]: JSON.stringify(data),
            };

            setStoreFilter(query);
            setQueryString(query, options?.reset);
        },
        [
            clearAllFilter,
            filterAliasKey,
            paramsFilterQuery,
            queryString,
            setQueryString,
            setStoreFilter,
        ]
    );

    const handleFilterData = useCallback(
        (data: ObjectDto) => {
            const newData = {
                ...filterData,
                ...data,
            };

            if (newData?.page) {
                newData.page = 1;
            }

            handleNavigationSearch(removeEmptyObjectKeys(newData));
        },
        [filterData, handleNavigationSearch]
    );

    const removeFilterData = (key: string | string[]) => {
        const newData = { ...filterData };
        if (filterQuery) {
            newData.filter_query = filterQuery;
        }
        if (isArray(key)) {
            for (const valueKey of key) delete newData[valueKey];
        } else delete newData[key as string];

        handleNavigationSearch(newData);
    };
    return {
        handleFilterData,
        handleNavigationSearch,
        filterData,
        filterQuery,
        sqlFilterQuery,
        filterJson,
        removeFilterData,
        clearAllFilter,
        setStoreFilter,
        queryString,
        isAnyFilterApplied,
        defaultQueries,
    };
};
