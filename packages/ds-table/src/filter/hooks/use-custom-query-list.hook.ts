import { StoreEvent } from 'state-manager-utility';

import 'storage-utility';

import { useCallback, useMemo, useState } from 'react';

import { ObjectDto } from '@slabs/ds-utils';

import { useQuery } from '@tanstack/react-query';

import { LISTING_CONTROLLER_ROUTER } from '../../constants/controller.router.constants';
import { FetchData } from '../../hooks/use-fetch-data.hook';
import { PaginationType } from '../../pagination/pagination.types';
import { GenericListingType } from '../../types/common.types';
import { EmptyFunction } from '../../utils/common.utils';

type ListType = GenericListingType;
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
    type?: ListType | '';
    controller?: any;
    method?: string;
    classParams?: ObjectDto;
    pagination?: PaginationType;
    methodParams?: any;
    disableNetwork?: boolean;
    queryDefinition?: string;
    disablePagination?: boolean;
    ignoreDto?: boolean;
    cacheTime?: number;
    queryOptions?: {
        onSuccess?: (data: ObjectDto) => void;
        onError?: (error: ObjectDto) => void;
    };
    [key: string]: any;
}) => {
    const [pagination, setPagination] = useState({
        page: paginationProps?.page ?? 1,
        limit: paginationProps?.limit ?? 20,
    });

    const className = useMemo(
        () => controller || LISTING_CONTROLLER_ROUTER['test'],
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

    // useEffect(() => {
    //     SubscribeToEvent({
    //         eventName: GENERIC_QUERY_LIST_REFETCH,
    //         callback: refetch,
    //     });
    //     return () => {
    //         UnsubscribeEvent({
    //             eventName: GENERIC_QUERY_LIST_REFETCH,
    //             callback: refetch,
    //         });
    //     };
    // }, [type]);

    const {
        data = {},
        isLoading,
        refetch,
        isSuccess,
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
        // if (!success) toastBackendError(response);
        if (success) {
            // Toast.success({ description: 'Status Changed' });
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
    };
};

export const fetchQueryList = () => {
    StoreEvent({
        eventName: GENERIC_QUERY_LIST_REFETCH,
    });
};
