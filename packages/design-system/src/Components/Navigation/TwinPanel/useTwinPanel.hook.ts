import { useCallback, useEffect, useMemo } from 'react';

import {
    FetchData,
    GENERIC_LISTING_REFETCH,
    GetObjectFromArray,
    IndexOfObjectInArray,
    IsEmptyObject,
    IsFunction,
    LISTING_CONTROLLER_ROUTER,
    SubscribeToEvent,
    UnsubscribeEvent,
    useGenericTableListing,
    useQuery,
    useUncontrolled,
} from '@finnoto/core';

import { IsEmptyArray } from '../../../Utils/common.ui.utils';
import { TwinPanelApiConfiguration } from './twinPanel.types';

const useTwinPanel = (props: TwinPanelApiConfiguration) => {
    const {
        className,
        definitionKey,
        method,
        methodParams,
        listingClassParams,
        cacheTime = 100,
        detailApiType,
        detailMethod,
        detailMethodParams,
        onDetailData,
        onListingData,
        isListMoveToTop,
        isListScrollable,
        onListActiveChange,
    } = props || {};

    const {
        loading: isListingLoading,
        records,
        stats,
        refetchList,
    } = useGenericTableListing(className, {
        definitionKey,
        method,
        methodParams,
        classParams: listingClassParams,
        onSuccess: onListingData,
    });

    const activeId = useMemo(() => {
        if (
            records?.length &&
            !records?.some((data) => data.id === props?.activeId)
        )
            return records[0].id;
        if (props?.activeId) return props?.activeId;
        if (!records) return undefined;
        return records[0]?.id;
    }, [props?.activeId, records]);

    const activeIndex = useMemo(() => {
        return IndexOfObjectInArray(records, 'id', activeId);
    }, [activeId, records]);

    const {
        data: detailData,
        isLoading: isDetailLoading,
        refetch: refetchDetail,
        isFetching: isDetailFetching,
    } = useQuery({
        enabled: !!records?.length,
        queryKey: [
            'twin_panel_detail',
            className,
            method,
            activeId,
            activeIndex,
            detailApiType,
            detailMethodParams,
        ],
        cacheTime: cacheTime,
        queryFn: async () => {
            let methodParams = activeId;

            if (IsFunction(detailMethodParams)) {
                methodParams = detailMethodParams(
                    activeId,
                    records[activeIndex]
                );
            } else if (!IsEmptyObject(detailMethodParams)) {
                methodParams = {
                    id: activeId,
                    ...detailMethodParams,
                };
            }

            const { success, response } = await FetchData({
                className:
                    LISTING_CONTROLLER_ROUTER[detailApiType || className],
                method: detailMethod || 'show',
                methodParams,
            });

            if (success) {
                onDetailData?.(response);

                if (props.activeId !== activeId) {
                    onListActiveChange(response, {
                        listingData: records,
                        isFirstItemEnds: false,
                        isLastItemEnds: false,
                    });
                }
                return response;
            }

            if (props.activeId !== activeId) {
                onListActiveChange(records[activeIndex], {
                    listingData: records,
                    isFirstItemEnds: false,
                    isLastItemEnds: false,
                });
            }
            throw new Error('');
        },
    });

    const isDetailLoadingOrFetching = isDetailLoading && isDetailFetching;

    const RearrangeListingBaseOnActiveId = useMemo(() => {
        if (IsEmptyArray(records)) return [];
        const selectedRecord = records.find((item) => item?.id === activeId);
        const filteredRecords = records.filter((item) => item?.id !== activeId);

        if (selectedRecord) {
            return [selectedRecord, ...filteredRecords];
        } else {
            return records;
        }
    }, [records, activeId]);

    const getNextPreviousItem = useCallback(
        (type: 'next' | 'previous') => {
            if (IsEmptyArray(records)) return;
            if (activeIndex === -1) return;
            if (activeIndex === 0 && type === 'previous')
                return [records[records.length - 1], true] as const;
            if (activeIndex === records.length - 1 && type === 'next')
                return [records[0], true] as const;
            if (type === 'next')
                return [records[activeIndex + 1], false] as const;
            return [records[activeIndex - 1], false] as const;
        },
        [activeIndex, records]
    );

    const handleListActiveChange = useCallback(
        (type: 'next' | 'previous') => {
            if (!IsFunction(onListActiveChange)) return;

            const [item, isLastOfList] = getNextPreviousItem(type);
            if (!item) return;

            onListActiveChange(item, {
                listingData: records,
                isFirstItemEnds: type === 'previous' && isLastOfList,
                isLastItemEnds: type === 'next' && isLastOfList,
            });
        },
        [getNextPreviousItem, onListActiveChange, records]
    );

    useEffect(() => {
        SubscribeToEvent({
            eventName: GENERIC_LISTING_REFETCH,
            callback: refetchDetail,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GENERIC_LISTING_REFETCH,
                callback: refetchDetail,
            });
        };
    }, [refetchDetail]);

    return {
        detailData,
        listingData:
            isListMoveToTop && !isListScrollable
                ? RearrangeListingBaseOnActiveId
                : records,
        stats,
        isDetailLoading: isDetailLoadingOrFetching,
        isListingLoading,
        activeId,
        activeIndex,
        refetchDetail,
        refetchList,
        handleListActiveChange,
    };
};

export default useTwinPanel;
