import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../backend/Dtos';
import { LISTING_CONTROLLER_ROUTER } from '../Constants';
import { GenericListingType, PaginationType } from '../Types';
import { EmptyFunction, toastBackendError } from '../Utils/common.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../Utils/stateManager.utils';
import { Toast } from '../Utils/toast.utils';
import { FetchData } from './useFetchData.hook';

type listType = GenericListingType;
const GENERIC_QUERY_LIST_REFETCH = 'gENERIC_QUERY_LIST_REFETCH';

export const useCustomQueryList = ({
    type,
    controller,
    method = 'list',
    classParams,
    disableNetwork,
    queryOptions,
    methodParams,
    pagination: paginationProps,
    queryDefinition,
    disablePagination,
    ignoreDto,
    ...rest
}: {
    type?: listType | '';
    controller?: any;
    method?: string;
    classParams?: ObjectDto;
    pagination?: PaginationType;
    methodParams?: any;
    disableNetwork?: boolean;
    queryDefinition?: string;
    disablePagination?: boolean;
    ignoreDto?: boolean;
    queryOptions?: {
        onSuccess?: (data) => void;
        onError?: (error) => void;
    };
    [key: string]: any;
}) => {
    const [pagination, setPagination] = useState({
        page: paginationProps?.page ?? 1,
        limit: paginationProps?.limit ?? 20,
    });

    const className = useMemo(
        () => controller || LISTING_CONTROLLER_ROUTER[type],
        [controller, type]
    );

    const fetchList = useCallback(async () => {
        if (!className) return [];

        const { success, response } = await FetchData({
            ...rest,
            className,
            method,
            methodParams: methodParams,
            classParams: {
                ...(!disablePagination ? pagination : {}),
                ...classParams,
                ignore_dto_all: ignoreDto,
            },
        });

        if (success) {
            queryOptions?.onSuccess?.(response);
            return response;
        }

        queryOptions?.onError?.(response);
        return [];
    }, [
        className,
        classParams,
        disablePagination,
        ignoreDto,
        method,
        methodParams,
        pagination,
        queryOptions,
        rest,
    ]);

    useEffect(() => {
        SubscribeToEvent({
            eventName: GENERIC_QUERY_LIST_REFETCH,
            callback: refetch,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GENERIC_QUERY_LIST_REFETCH,
                callback: refetch,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const {
        data = {},
        isLoading,
        refetch,
        isSuccess,
        isInitialLoading,
        isFetching,
    } = useQuery({
        queryFn: fetchList,
        queryKey: [
            type,
            method,
            classParams,
            pagination,
            rest,
            controller,
            disableNetwork,
            methodParams,
            queryDefinition,
        ],
        enabled: !disableNetwork,
    });
    const handleStatus = async (
        id: number,
        isActivate = true,
        fn_method = 'activate',
        callback: (data?: any) => void = EmptyFunction
    ) => {
        const { success, response } = await FetchData({
            className: className,
            methodParams: id,
            method: isActivate ? `${fn_method}` : `de${fn_method}`,
        });
        callback();
        if (!success) toastBackendError(response);
        if (success) {
            Toast.success({ description: 'Status Changed' });
            refetch();
        }
    };
    return {
        data: Array.isArray(data) ? data : data?.records || [],
        absoluteData: data,
        isLoading,
        isFetching,
        pagination: {
            ...(data?.stats || {}),
        },
        setPagination,
        refetch,
        handleStatus,
        isSuccess,
        isInitialLoading,
    };
};

export const fetchQueryList = () => {
    StoreEvent({
        eventName: GENERIC_QUERY_LIST_REFETCH,
    });
};
