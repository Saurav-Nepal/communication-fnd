import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { useUpdateEffect } from 'react-use';

import {
    EmptyFunction,
    IsArray,
    IsEmptyArray,
    IsEmptyObject,
    ObjectDto,
    parseJSONString,
    RemoveEmptyObjectKeys,
    uuidV4,
} from '@finnoto/core';

import { handleInlineModalToggle } from '../../../../../../Components';
import { FilterContextInterface, useFilterContext } from '../../../provider';

interface ListFormFilterContextInterface {
    onSave: () => void;
    onApply: () => void;
    onClear: (key?: string | string[]) => void;
    onReset: (key?: string | string[]) => void;
    listFilters: any[];
    handleFilterData: (data: ObjectDto) => void;
    getValues: (key?: string) => any;
    getDefaultValues: (key?: string) => any;
    onCloseForm: () => void;
    isAnyFilterApplied: boolean;
    filterData: ObjectDto;
    filterQuery: string;
    sqlFilterQuery: string;
    queryString: ObjectDto;
    clearAllFilter?: () => void;
    setFilterQuery?: (filterQuery: string) => any;
    innerListFilters?: ObjectDto[];
    sanitizedFilterQuery?: string;
    handleNavigationSearch?: FilterContextInterface['handleNavigationSearch'];
}
export const ListFormFilterContext =
    createContext<ListFormFilterContextInterface>({
        onSave: EmptyFunction,
        onApply: EmptyFunction,
        onClear: EmptyFunction,
        onReset: EmptyFunction,
        listFilters: [],
        handleFilterData: EmptyFunction,
        getValues: EmptyFunction,
        getDefaultValues: EmptyFunction,
        onCloseForm: EmptyFunction,
        isAnyFilterApplied: false,
        filterData: null,
        filterQuery: undefined,
        sqlFilterQuery: undefined,
        queryString: {},
        innerListFilters: [],
    });

export const ListFormFilterProvider = ({
    children,
    defaultFilterQuery,
}: any) => {
    const {
        listFilters,
        filterData: data,
        filterQuery: filter_query,
        sqlFilterQuery,
        queryString,
        defaultValues,
        innerListFilters,
        filterAliasKey,
        handleNavigationSearch,
    } = useFilterContext();

    const [filterQuery, setFilterQuery] = useState<string | undefined>(
        (filter_query as any) || defaultFilterQuery
    );
    const [filterData, setFilterData] = useState(data);

    const sanitizedFilterQuery = useMemo(() => {
        const filterRecursive = (rule: ObjectDto) => {
            if (rule?.rules?.length) {
                // If it's a group, recursively filter its child rules
                rule.rules = rule.rules.filter(filterRecursive);
                return rule.rules.length > 0; // Keep the group only if it has child rules
            } else {
                if (['null', 'notNull'].includes(rule?.operator)) return true;

                if (['between', 'notBetween'].includes(rule?.operator)) {
                    let valueArray = rule?.value;

                    if (!IsArray(valueArray))
                        valueArray = String(valueArray)?.split(',');
                    return (
                        valueArray?.filter((value) => Boolean(value))?.length >
                        1
                    );
                }

                // Keep the rule if it has a non-empty value
                const value = rule?.value;
                if (value === 0) return true;
                if (IsArray(value)) return !!value?.length;
                return !!value;
            }
        };
        const jsonData = parseJSONString(filterQuery);

        const rules = jsonData?.rules?.filter(filterRecursive);
        return {
            ...jsonData,
            rules,
        };
    }, [filterQuery]);

    useUpdateEffect(() => {
        setFilterData(data);
    }, [data]);

    useUpdateEffect(() => {
        setFilterQuery(filter_query);
    }, [filter_query]);

    const handleFilterData = useCallback((data: any) => {
        setFilterData((prev) => ({
            ...prev,
            ...data,
        }));
    }, []);
    const clearAllFilter = useCallback(() => {
        setFilterData({
            page: 1,
            limit: filterData?.limit || 20,
        });
        setFilterQuery(null);
    }, [filterData?.limit]);

    const onCloseForm = useCallback(() => {
        handleInlineModalToggle('filter');
    }, []);

    const onApply = useCallback(() => {
        handleNavigationSearch(
            {
                [filterAliasKey]: JSON.stringify(
                    RemoveEmptyObjectKeys({
                        ...filterData,
                        page: 1,
                        limit: filterData?.limit || 20,
                    })
                ),
                filter_query: sanitizedFilterQuery?.rules?.length
                    ? JSON.stringify(sanitizedFilterQuery)
                    : null,
            },
            false
        );

        onCloseForm();
    }, [
        filterAliasKey,
        filterData,
        handleNavigationSearch,
        onCloseForm,
        sanitizedFilterQuery,
    ]);

    const onClear = useCallback(
        (key) => {
            if (!key)
                return setFilterData({
                    ...defaultValues,
                });
            const newData = { ...filterData };
            if (IsArray(key)) {
                for (const k of key) {
                    newData[k as string] = undefined;
                }
            } else newData[key] = undefined;
            setFilterData({
                ...newData,
                ...defaultValues,
            });
        },
        [defaultValues, filterData]
    );

    const onSave = useCallback(() => {}, []);
    const onReset = useCallback(
        (key) => {
            onClear(key);
        },
        [onClear]
    );

    const getValues = useCallback(
        (key?: string) => {
            if (!key) return filterData;

            return filterData?.[key];
        },
        [filterData]
    );

    const isAnyFilterApplied = useMemo(() => {
        const { page, limit, ...rest } = filterData || {};

        return (
            !IsEmptyObject(RemoveEmptyObjectKeys(rest)) ||
            !!sanitizedFilterQuery?.rules?.length
        );
    }, [filterData, sanitizedFilterQuery?.rules?.length]);

    const getDefaultValues = useCallback(
        (key?: string) => {
            if (!key) return defaultValues;
            return defaultValues?.[key];
        },
        [defaultValues]
    );

    const value = useMemo(
        () => ({
            onSave,
            onApply,
            onReset,
            handleFilterData,
            onClear,
            listFilters,
            getValues,
            getDefaultValues,
            onCloseForm,
            isAnyFilterApplied,
            filterData,
            clearAllFilter,
            setFilterQuery,
            filterQuery,
            sqlFilterQuery,
            queryString,
            innerListFilters,
            sanitizedFilterQuery: JSON.stringify(sanitizedFilterQuery),
            handleNavigationSearch,
        }),
        [
            onSave,
            onApply,
            onReset,
            handleFilterData,
            onClear,
            listFilters,
            getValues,
            getDefaultValues,
            onCloseForm,
            isAnyFilterApplied,
            filterData,
            clearAllFilter,
            filterQuery,
            sqlFilterQuery,
            queryString,
            innerListFilters,
            sanitizedFilterQuery,
            handleNavigationSearch,
        ]
    );
    return (
        <ListFormFilterContext.Provider value={value}>
            {children}
        </ListFormFilterContext.Provider>
    );
};
export const useListFormFilterContext = () => {
    return useContext(ListFormFilterContext);
};

export const withListFormFilterProviderExport = <TProps extends any>(
    Component: React.ComponentType<TProps>
) => {
    return (props: TProps & { defaultAdvanceFilter?: any }) => {
        const { name, operators } = props?.defaultAdvanceFilter || {};
        let defaultQuery = '';

        if (name || !IsEmptyArray(operators)) {
            defaultQuery = JSON.stringify({
                combinator: 'and',
                not: false,
                rules: [
                    {
                        id: uuidV4(),
                        field: name,
                        operator: operators?.[0].name,
                    },
                ],
            });
        }

        return (
            <ListFormFilterProvider defaultFilterQuery={defaultQuery}>
                <Component {...props} />
            </ListFormFilterProvider>
        );
    };
};
