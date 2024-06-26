import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../backend/Dtos';
import { LISTING_CONTROLLER_ROUTER } from '../Constants';
import { GenericListingType } from '../Types';
import { useRecursiveFetch } from './CommonComponentHooks';
import { FetchData } from './useFetchData.hook';

export const useCustomQueryDetail = ({
    queryKey,
    type,
    method = 'show',
    methodParams,
    disableNetwork = false,
    queryOptions = {},
    classParams = {},
    controller,
}: {
    queryKey?: unknown;
    type?: GenericListingType;
    method?: string;
    controller?: any;
    methodParams?: any;
    disableNetwork?: boolean;
    queryOptions?: {
        onSuccess?: (data) => void;
        onError?: (error) => void;
    };
    classParams?: ObjectDto;
}) => {
    const fetchDetail = useCallback(async () => {
        const className = controller || LISTING_CONTROLLER_ROUTER[type];
        if (!className) return {};

        const { success, response } = await FetchData({
            className,
            method,
            methodParams,
            classParams,
        });
        if (!success) {
            queryOptions?.onError?.(response);
            return {};
        }

        queryOptions?.onSuccess?.(response);
        return response;
    }, [classParams, controller, method, methodParams, queryOptions, type]);

    const {
        data = {},
        isLoading,
        refetch,
        isFetching,
    } = useQuery({
        queryFn: fetchDetail,
        queryKey: [
            queryKey,
            type,
            method,
            methodParams,
            classParams,
            disableNetwork,
        ],
        retryDelay: 500,
        enabled: !disableNetwork,
    });
    const [recursiveFetch] = useRecursiveFetch(refetch);
    return {
        data,
        isLoading,
        refetch,
        isFetching,
        recursiveFetch,
    };
};
