import { useCallback, useMemo } from 'react';

import { useUpdateEffect } from '@slabs/ds-hooks';
import {
    isEmptyArray,
    isFunction,
    isValidString,
    ObjectDto,
    parseJSONString,
} from '@slabs/ds-utils';

import { useQuery } from '@tanstack/react-query';

import { LISTING_CONTROLLER_ROUTER } from '../constants/controller.router.constants';
import { useFilterContext } from '../filter/provider/filter.provider';
import { GenericListingType } from '../types/common.types';
import { parseCurrentDate } from '../utils/filter.utils';
import { FetchData } from './use-fetch-data.hook';
import { useFetchParams } from './use-fetch-params.hook';

export const useGenericDocumentListing = (
    type: GenericListingType,
    options?: any
) => {
    const {
        handleFilterData,
        removeFilterData,
        handleNavigationSearch,
        setPagination,
        filterData,
        filterJson,
        sqlFilterQuery,
        // listFilters: tableFilters,
    } = useFilterContext();

    const {
        initialPage,
        showViewFilter,
        tabFilterData,
        controller,
        searchMethodParams,
        sanitizeFilter,
    } = options || {};

    const className = controller || LISTING_CONTROLLER_ROUTER[type];

    const { view } = useFetchParams();

    const handleStatus = async (
        id: number,
        isActivate = true,
        fn_method = 'activate',
        callback: (data?: any) => void = () => {}
    ) => {
        const { success, response } = await FetchData({
            className: className,
            methodParams: id,
            method: isActivate ? `${fn_method}` : `de${fn_method}`,
        });
        callback();
        // if (!success) toastBackendError(response);
        // if (success) {
        //     Toast.success({ description: 'Status Changed' });
        //     fetchList();
        // }
    };

    const reportDefaultDate = useMemo(() => {
        if (options?.removeReportDate) return {};
        return {};
    }, [options?.removeReportDate, type]);

    const sanitizeData = useCallback(
        (data: any) => {
            const newData = { ...data };

            if (newData.amount && Object.keys(newData.amount).length < 2) {
                newData.amount = undefined;
            }
            if (newData?.date?.range?.min) {
                newData['date']['range']['min'] = parseCurrentDate(
                    newData?.date?.range?.min
                );
            }
            if (newData?.date?.range?.max) {
                newData['date']['range']['max'] = parseCurrentDate(
                    newData?.date?.range?.max
                );
            }

            if (isFunction(sanitizeFilter)) {
                return sanitizeFilter(newData);
            }

            return newData;
        },
        [sanitizeFilter]
    );

    const fetchDocumentList = useCallback(
        async (aggregate?: Record<string, string>, params = {}) => {
            if (!className) return null;

            const defaultClassParams = {
                ...options?.defaultClassParams,
                ...params,
            };

            const ignoreDtoTypes = ['fetch_report', 'vendor_report'];

            const { search, ...rest } = sanitizeData(filterData);

            return FetchData({
                className: className,
                method: options?.searchMethod || 'list',
                methodParams: searchMethodParams,
                classParams: {
                    ...reportDefaultDate, // sends default date if it is fetching for the report,
                    search: search && search.length >= 3 ? search : undefined,
                    ...rest,
                    ...defaultClassParams,
                    document_type_identifier: type,
                    ...tabFilterData,
                    filter_query: sqlFilterQuery,
                    filter_json: filterJson,
                    aggregate,
                    ignore_dto_all: ignoreDtoTypes.includes(type),
                },
            });
        },
        [
            className,
            filterData,
            filterJson,
            sqlFilterQuery,
            options?.defaultClassParams,
            options?.searchMethod,
            reportDefaultDate,
            sanitizeData,
            searchMethodParams,
            tabFilterData,
            type,
        ]
    );

    const enableFetching = () => {
        if (options?.disableNetworkCall) return false;
        if (!view && initialPage && showViewFilter && initialPage !== 'table')
            return false;
        return true;
    };

    const {
        isLoading,
        data,
        refetch: fetchList,
    } = useQuery({
        queryKey: [
            `${type}_list`,
            // { page: pagination.page, limit: pagination.limit },
            filterData,
            sqlFilterQuery,
            filterJson,
            tabFilterData,
            options.defaultClassParams,
            searchMethodParams,
        ],
        queryFn: () => fetchDocumentList(),
        enabled: enableFetching(),
    });

    // useEffect(() => {
    //     SubscribeToEvent({
    //         eventName: GENERIC_LISTING_REFETCH,
    //         callback: fetchList,
    //     });
    //     return () => {
    //         UnsubscribeEvent({
    //             eventName: GENERIC_LISTING_REFETCH,
    //             callback: fetchList,
    //         });
    //     };
    // }, [type]);

    const { response } = data || {};
    const { metrics, records = [], stats } = response || {};

    useUpdateEffect(() => {
        fetchList();
    }, [type]);

    const fetchSavedFilters = async () => {
        //empty fetch save filters
    };

    const clearFilterData = () => {
        handleNavigationSearch({});
    };

    const aggregate = () => {
        const sum = ({ column }: { column: ObjectDto }) =>
            getAggregateData('sum', column);
        const avg = ({ column }: { column: ObjectDto }) =>
            getAggregateData('avg', column);
        const min = ({ column }: { column: ObjectDto }) =>
            getAggregateData('min', column);
        const max = ({ column }: { column: ObjectDto }) =>
            getAggregateData('max', column);

        const getAggregateData = async (fn: string, column: ObjectDto) => {
            // const { hide = () => {} } = Functions.toastLoading({
            //     description: 'Calculating...',
            // });

            const { success, response } =
                (await fetchDocumentList({
                    [fn]: column.filter_identifier || column.key,
                })) || {};
            // hide();

            // if (!success) {
            //     Toast.error({ description: 'Something went wrong' });
            //     return;
            // }

            // Functions.openAggregateDetails(fn, column, response);
        };

        return {
            sum,
            avg,
            min,
            max,
        };
    };

    const createQuery = (rule: any, unique?: boolean, query?: string) => {
        let newQuery: any = {
            combinator: 'and',
            rules: [],
        };

        if (isValidString(query)) {
            newQuery = parseJSONString(query);
        }

        if (unique) {
            newQuery.rules = newQuery.rules.filter((queryRule: any) => {
                return (
                    queryRule.field !== rule.field ||
                    queryRule.operator !== rule.operator
                );
            });
        }

        newQuery.rules.push(rule);
        return newQuery;
    };

    const downloadCsv = async (next: any) => {
        const { response, success } =
            (await fetchDocumentList(undefined, {
                format: { csv: true },
                listing_slug: options?.definitionKey,
            })) || {};
        if (success) {
            window.open(response?.url, '_blank');
        }
        next();
    };

    return {
        loading: !options?.disableNetworkCall ? isLoading : false,
        filterData,
        metrics,
        pagination: {
            page: filterData.page,
            limit: filterData.limit,
            total: stats?.total,
        },
        records: Array.isArray(response)
            ? response
            : isEmptyArray(records)
              ? []
              : records,
        tabFilterData,
        // tableFilters,
        handleFilterData,
        clearFilterData,
        fetchSavedFilters,
        setPagination,
        aggregate,
        handleStatus,
        createQuery,
        downloadCsv,
        removeFilterData,
        handleNavigationSearch,
    };
};

// export const fetchDocumentList = () => {
//     StoreEvent({
//         eventName: GENERIC_LISTING_REFETCH,
//     });
// };
