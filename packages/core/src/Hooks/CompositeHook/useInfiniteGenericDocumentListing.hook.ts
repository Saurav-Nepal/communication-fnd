import { endOfYear, format, startOfYear } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { useFilterContext } from '@finnoto/design-system';

import { useInfiniteQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import {
    CURRENT_EMPLOYEE,
    CURRENT_USER,
    GENERIC_LISTING_REFETCH,
} from '../../Constants';
import { LISTING_CONTROLLER_ROUTER } from '../../Constants/controller.router.constant';
import { GenericListingType } from '../../Types';
import { IsArray, IsEmptyObject } from '../../Utils/common.utils';
import { parseCurrentDate } from '../../Utils/filter.utils';
import {
    parseCurrentUserIds,
    parseUserEmployeeCurrentIds,
} from '../../Utils/function.utils';
import {
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../../Utils/stateManager.utils';
import { API_DATE_TIME_FORMAT } from '../../Utils/time.utils';
import { FetchData } from '../useFetchData.hook';

export const useInfiniteGenericDocumentListing = (
    type: GenericListingType,
    document_id?: number,
    options?: any
) => {
    const className = LISTING_CONTROLLER_ROUTER[type];

    const { listingMethod = 'list', tabFilterKey } = options;

    const [tabFilterData, setTabFilterData] = useState({});
    const {
        listFilters: tableFilters,
        handleFilterData,
        handleNavigationSearch,
        filterData,
        sqlFilterQuery,
        filterJson,
        removeFilterData,
        hasAnyFilter,
    } = useFilterContext();

    const reportDefaultDate = useMemo(() => {
        if (type === 'fetch_report') {
            return {
                start_time: format(
                    startOfYear(new Date()),
                    API_DATE_TIME_FORMAT
                ),
                end_time: format(endOfYear(new Date()), API_DATE_TIME_FORMAT),
            };
        }
        return {};
    }, [type]);

    const fetchDocumentList = async (context: ObjectDto) => {
        const defaultClassParams = options?.defaultClassParams || {};
        const { pageParam = 1 } = context || {};
        const pagination = {
            page: pageParam,
            limit: 20,
        };

        const { search, ...rest } = sanitizeData(filterData);

        const ignoreDtoTypes = ['fetch_report', 'vendor_report'];

        const { success, response } = await FetchData({
            className: className,
            method: listingMethod,
            classParams: {
                ...reportDefaultDate,

                search: search && search.length >= 3 ? search : undefined,
                ...rest,
                ...tabFilterData,
                ...pagination,
                ...defaultClassParams,
                filter_query: sqlFilterQuery,
                filter_json: filterJson,
                ignore_dto_all: ignoreDtoTypes.includes(type), // Ignoring the dto in the report call case
                document_type_identifier: type,
            },
        });
        if (success) return response;
        return [];
    };

    const enableQuery = useMemo(() => {
        if (options?.disableNetworkCall) return false;
        return true;
    }, [options?.disableNetworkCall]);

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch: fetchList,
    } = useInfiniteQuery({
        queryKey: [
            listingMethod,
            type,
            filterData,
            tabFilterData,
            options.defaultClassParams,
        ],
        queryFn: fetchDocumentList,
        getNextPageParam: (lastpage: any, pages: any) => {
            const { stats } = lastpage || {};
            if (!stats?.total) return undefined;
            const next_cursor = stats?.limit * stats?.page;

            if (next_cursor > stats?.total) return undefined;
            return (stats?.page || 1) + 1;
        },
        enabled: enableQuery,
        retry: 2,
        staleTime: 15 * 1000, // 15 seconds
    });

    const { pages } = data || {};

    // data is get from pages and it converted into simple array form
    const records = useMemo(() => {
        return (pages || []).reduce((prev, next) => {
            if (Array.isArray(next)) return [...prev, ...next];
            const next_records = [...(next?.records || [])];
            return [...prev, ...next_records];
        }, []);
    }, [pages]);

    useEffectOnce(() => {
        if (options?.dateFilter === false) return;
    });

    useEffect(() => {
        SubscribeToEvent({
            eventName: GENERIC_LISTING_REFETCH,
            callback: fetchList,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GENERIC_LISTING_REFETCH,
                callback: fetchList,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const saveFilter = async (next = () => {}, data: any = {}) => {
        next();
    };

    const clearFilterData = () => {
        handleFilterData({});
    };

    const sanitizeData = (data: any) => {
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
        for (let [key, value] of Object.entries(data)) {
            if (value && IsArray(value)) {
                //parse current user
                if (value.includes(CURRENT_USER))
                    newData[key] = parseCurrentUserIds(value);
                //parse current employee
                else if (value.includes(CURRENT_EMPLOYEE))
                    newData[key] = parseUserEmployeeCurrentIds(value);
            }
        }

        return newData;
    };

    const handleTabFilterChange = (value: any) => {
        if (IsEmptyObject(value)) setTabFilterData({});
        else setTabFilterData({ [tabFilterKey]: value });
    };

    return {
        loading: !options?.disableNetworkCall ? isLoading : false,
        filterData,
        handleFilterData,
        clearFilterData,
        removeFilterData,

        saveFilter,
        fetchNextPage,
        setTabFilterData,
        handleTabFilterChange,
        records,
        hasNextPage,
        isFetchingNextPage,
        tabFilterData,
        tableFilters,
        hasAnyFilter,
        handleNavigationSearch,
    };
};
