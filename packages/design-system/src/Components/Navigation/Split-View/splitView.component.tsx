'use client';

import { Navigation, ObjectDto, useFetchParams } from '@finnoto/core';
import { useRouter } from 'next/router';
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { useEffectOnce } from 'react-use';
import {
    GetObjectFromArray,
    IsEmptyArray,
    IsFunction,
    IsUndefinedOrNull,
    cn,
} from '../../../Utils/common.ui.utils';
import { NoDataFound } from '../../Data-display/NoDataFound/noDataFound.component';
import {
    ListViewProps,
    SplitViewProps,
    SplitViewSelectedKeyType,
    SplitViewViewChangeFunction,
} from './splitView.types';

/**
 *
 * @description  SplitView component That can be used to display list and list Content
 *
 * @author Saurav Nepal
 *
 */
export const SplitView = forwardRef(
    (
        {
            className,
            listViewClassName,
            data,
            dataKey,
            renderListView,
            renderList,
            children,
            listHeaderView,
            listFooterView,
            defaultActive,
            viewChangeHandler = () => {},
        }: SplitViewProps,
        ref
    ) => {
        // State for storing the selected key
        const [selectedKey, setSelectedKey] =
            useState<SplitViewSelectedKeyType>(defaultActive);

        // Access the current URL path and query parameters using Next.js useRouter hook
        const { asPath } = useRouter();
        const { queryString, split_view } = useFetchParams();

        // Callback function for handling view changes
        const onViewChange: SplitViewViewChangeFunction = useCallback(
            (key) => {
                setSelectedKey(key);
                viewChangeHandler(key);
                // Update the URL path and query parameters using the Navigation utility from '@finnoto/core'
                Navigation.navigate({
                    url: asPath.split('?')[0],
                    queryParam: {
                        ...queryString,
                        split_view: key,
                    },
                });
            },
            [asPath, queryString, viewChangeHandler]
        );

        // Trigger the onViewChange callback if a split_view query parameter exists in the URL
        useEffectOnce(() => {
            if (split_view) {
                onViewChange(Number(split_view));
            }
        });

        // Reset the selected view
        const onResetView = () => {
            setSelectedKey(undefined);
        };

        // Get the ListView component based on the provided props
        const getListView = useCallback(() => {
            if (renderListView || IsFunction(renderListView)) {
                // If a custom renderListView function is provided, use it
                return renderListView({ active: selectedKey, onViewChange });
            }

            // Otherwise, use the default ListView component
            return (
                <ListView
                    {...{
                        className: listViewClassName,
                        active: selectedKey,
                        data,
                        dataKey,
                        onViewChange,
                        renderList,
                        listHeaderView,
                        listFooterView,
                    }}
                />
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            renderListView,
            data,
            dataKey,
            renderList,
            selectedKey,
            listViewClassName,
            listHeaderView,
            listFooterView,
        ]);

        // Get the selected data based on the selected key
        const selectedData = useMemo(() => {
            if (!data) return null;
            if (typeof selectedKey === 'undefined') return null;
            if (!dataKey && typeof selectedKey === 'number')
                return data[selectedKey];
            if (dataKey) return GetObjectFromArray(data, dataKey, selectedKey);
            return null;
        }, [data, dataKey, selectedKey]);

        // Expose the onViewChange callback using useImperativeHandle and the provided ref
        useImperativeHandle(ref, () => ({ onViewChange }), [onViewChange]);

        // Render the SplitView component
        return (
            <div className={`row-flex w-full ${className ?? ''}`}>
                {getListView()}

                {typeof selectedKey !== 'undefined' && selectedData ? (
                    <div className='flex-1 col-flex min-w-[50%]'>
                        {children
                            ? children({
                                  active: selectedKey,
                                  data: selectedData,
                                  onResetView,
                              })
                            : null}
                    </div>
                ) : null}
            </div>
        );
    }
);

// ListView component
const ListView = ({
    className,
    data,
    active,
    dataKey,
    renderList,
    onViewChange,
    listHeaderView,
    listFooterView,
}: ListViewProps) => {
    // Get the key value for an item in the data array
    const getKeyValue = useCallback(
        (item, index) => {
            if (!dataKey) return index;

            return item[dataKey];
        },
        [dataKey]
    );

    // Check if an item is active based on the active key
    const isActive = useCallback(
        (item, index) => {
            if (IsUndefinedOrNull(active)) return false;
            if (getKeyValue(item, index) === active) return true;
            return false;
        },
        [active, getKeyValue]
    );

    // If the data array is empty or null, render the NoDataFound component
    if (!data || IsEmptyArray(data))
        return (
            <div className='relative w-full overflow-hidden rounded-lg col-flex'>
                {listHeaderView}
                <div className='flex items-center justify-center flex-1 bg-base-100'>
                    <NoDataFound />
                </div>
            </div>
        );

    // Render the ListView component
    return (
        <div
            className={cn(
                'col-flex  relative',
                !IsUndefinedOrNull(active) ? 'w-1/3' : 'w-full'
            )}
        >
            {listHeaderView}
            <div className={cn(className)}>
                {data.map((item, index) => {
                    if (renderList && IsFunction(renderList)) {
                        // If a custom renderList function is provided, use it
                        return renderList(item, {
                            index: index + '-' + item[dataKey || 'id'],
                            activeKey: active,
                            active: isActive(item, index),
                            onSelect: () =>
                                onViewChange(getKeyValue(item, index)),
                        });
                    }
                    // Otherwise, use the default ListCard component
                    return (
                        <ListCard
                            key={index + '-' + item[dataKey || 'id']}
                            data={item}
                            active={isActive(item, index)}
                            onSelect={() =>
                                onViewChange(getKeyValue(item, index))
                            }
                        />
                    );
                })}
            </div>
            {listFooterView}
        </div>
    );
};

// ListCard component
const ListCard = ({
    data,
    active,
    onSelect,
}: {
    data: ObjectDto;
    active: boolean;
    onSelect: () => void;
}) => {
    // Render a card representing an item in the ListView
    return (
        <div
            className={cn(
                'col-flex p-2 bg-base-100 rounded shadow-sm hover:shadow-md hover:bg-base-300/50 select-none transition-all cursor-pointer',
                active && 'bg-base-300/50'
            )}
            onClick={onSelect}
        >
            {data.name}
        </div>
    );
};
