import { useCallback, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import {
    GENERIC_LISTING_REFETCH,
    LISTING_CONTROLLER_ROUTER,
} from '../../Constants';
import { GenericListingType } from '../../Types';
import { IsValidString, parseJSONString } from '../../Utils/common.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../../Utils/stateManager.utils';
import { FetchData } from '../useFetchData.hook';

interface GenericTableOptionTypes {
    controller?: string;
    method?: string;
    methodParams?: any;
    classParams?: any;
    definitionKey?: string;
    ignoreDto?: boolean;
    disable?: boolean;
    onSuccess?: (data: ObjectDto[]) => void;
}

export const useGenericTableListing = (
    type: GenericListingType | '',
    options: GenericTableOptionTypes = {}
) => {
    const {
        controller,
        method,
        methodParams,
        classParams,
        definitionKey,
        ignoreDto,
        disable,
        onSuccess,
    } = options || {};

    const className = controller || LISTING_CONTROLLER_ROUTER[type];

    const fetchDocumentList = useCallback(
        async (aggregate?: Record<string, string>, params = {}) => {
            if (!className) return null;

            const defaultClassParams = {
                ...classParams,
                ...params,
                listing_slug: definitionKey,
            };

            const result = await FetchData({
                className: className,
                method: method ?? 'list',
                methodParams,
                classParams: {
                    ...defaultClassParams,
                    document_type_identifier: type,
                    aggregate,
                    ignore_dto_all: ignoreDto,
                },
            });

            if (!result?.success) return result;

            onSuccess?.(result.response);
            return result;
        },
        [
            className,
            classParams,
            definitionKey,
            ignoreDto,
            method,
            methodParams,
            onSuccess,
            type,
        ]
    );

    const {
        isLoading,
        data,
        refetch: refetchList,
    } = useQuery({
        queryKey: [
            `${type}_list`,
            {
                classParams,
                method,
                methodParams,
                ignoreDto,
                className,
                definitionKey,
            },
        ],
        queryFn: () => fetchDocumentList(),
        enabled: !disable,
    });

    const downloadCsv = (definitionKey: string) => async (next: () => void) => {
        const { response, success } = await fetchDocumentList(undefined, {
            format: { csv: true },
            listing_slug: definitionKey,
        });
        if (success) {
            window.open(response?.url, '_blank');
        }
        next?.();
    };

    const aggregates = () => {
        const sum = ({ column }) => getAggregateData('sum', column);
        const avg = ({ column }) => getAggregateData('avg', column);
        const min = ({ column }) => getAggregateData('min', column);
        const max = ({ column }) => getAggregateData('max', column);

        const getAggregateData = async (fn: string, column: ObjectDto) => {
            const { success, response } = await fetchDocumentList({
                [fn]: column.filter_identifier || column.key,
            });

            if (!success) {
                throw new Error('Something went wrong');
            }

            return response;
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

        if (IsValidString(query)) {
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

    useEffect(() => {
        SubscribeToEvent({
            eventName: GENERIC_LISTING_REFETCH,
            callback: refetchList,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GENERIC_LISTING_REFETCH,
                callback: refetchList,
            });
        };
    }, [refetchList, type]);

    const { response } = data || {};
    const { metrics, records = [], stats } = response || {};

    return {
        loading: isLoading,
        metrics,
        records: Array.isArray(response) ? response : records ?? [],
        stats,
        downloadCsv,
        aggregates,
        createQuery,
        refetchList,
    };
};

export const refetchTableList = () => {
    StoreEvent({
        eventName: GENERIC_LISTING_REFETCH,
    });
};
