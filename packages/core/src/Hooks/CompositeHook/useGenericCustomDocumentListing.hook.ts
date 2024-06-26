import { useQuery } from '@tanstack/react-query';

import { subMonths } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useEffectOnce, useSetState } from 'react-use';
import { GENERIC_MESSAGE_LISTING_REFETCH } from '../../Constants';
import { LISTING_CONTROLLER_ROUTER } from '../../Constants/controller.router.constant';
import { ObjectDto } from '../../backend/Dtos';
import { GenericListingType, PaginationType } from '../../Types';
import {
    Debounce,
    IsEmptyArray,
    IsEmptyObject,
    RemoveEmptyObjectKeys,
} from '../../Utils/common.utils';
import { parseCurrentDate } from '../../Utils/filter.utils';
import { Navigation } from '../../Utils/navigation.utils';
import {
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../../Utils/stateManager.utils';
import { APIDateFormat } from '../../Utils/time.utils';
import { FetchData } from '../useFetchData.hook';

export const useGenericCustomDocumentListing = (
    type: GenericListingType,
    options?: any
) => {
    const className = LISTING_CONTROLLER_ROUTER[type];

    const [filterData, setFilterData] = useState<ObjectDto>({});
    const [pagination, setPagination] = useSetState<PaginationType>({
        limit: 20,
        page: 1,
    });
    const sanitizeData = useCallback((data: any) => {
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

        return newData;
    }, []);

    const fetchDocumentList = useCallback(async () => {
        const { search, ...rest } = sanitizeData(filterData);
        const { success, response } = await FetchData({
            className: className,
            method: 'list',
            classParams: {
                search: search && search.length >= 3 ? search : undefined,
                ...rest,
                ...pagination,
                document_type_identifier: type,
            },
        });

        if (success) return response;

        return [];
    }, [className, filterData, pagination, sanitizeData, type]);

    const {
        isLoading: loading,
        data: listData,
        refetch: fetchList,
    } = useQuery({
        queryKey: [
            `${type}_list`,
            { page: pagination.page, limit: pagination.limit },
            filterData,
        ],
        queryFn: fetchDocumentList,
        enabled: !options?.disableNetworkCall,
    });

    useEffect(() => {
        SubscribeToEvent({
            eventName: GENERIC_MESSAGE_LISTING_REFETCH,
            callback: fetchList,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GENERIC_MESSAGE_LISTING_REFETCH,
                callback: fetchList,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    useEffect(() => {
        if (options?.disableNetworkCall === true) return;
        fetchDebounceList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterData, pagination, className]);

    useEffectOnce(() => {
        if (options?.dateFilter === false) return;

        handleFilterData('date', {
            range: {
                min: APIDateFormat({ date: subMonths(new Date(), 6) }),
                max: APIDateFormat({ date: new Date() }),
            },
        });
    });

    const { metrics, records, stats } = listData || {};

    const fetchDebounceList = Debounce(fetchList, 100);

    const handleFilterData = (key: string, value: any) => {
        setFilterData((prev: any) => {
            let newData = { ...prev, [key]: value };

            if (key === 'date') {
                newData.date = !IsEmptyObject(newData.date.range)
                    ? { ...newData.date, range: newData.date.range }
                    : { ...newData.date, range: undefined };
            }

            newData = RemoveEmptyObjectKeys(newData);
            if (
                typeof newData[key] === 'object' &&
                IsEmptyObject(newData[key])
            ) {
                delete newData[key];
            }
            return newData;
        });
    };

    const clearFilterData = () => {
        setFilterData({});

        Navigation.navigate({
            url: window.location.pathname,
            queryParam: {},
        });
    };

    const removeFilterData = (key: string) => {
        let newFilter: any = { ...filterData };

        delete newFilter[key];
        setFilterData(newFilter);
    };

    return {
        loading: !options?.disableNetworkCall ? loading : false,
        filterData,
        metrics,
        pagination: { ...pagination, total: stats?.total },
        handleFilterData,
        clearFilterData,
        removeFilterData,
        setFilterData,
        setPagination,
        records: IsEmptyArray(records) ? listData : records,
    };
};
