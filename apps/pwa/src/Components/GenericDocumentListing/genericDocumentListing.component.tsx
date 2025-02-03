import { endOfDay, startOfDay } from 'date-fns';
import { PlusCircle, XCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import {
    API_DATE_TIME_FORMAT,
    APIDateFormat,
    Capitalize,
    EmptyFunction,
    GENERIC_LISTING_REFETCH,
    GetObjectFromArray,
    IsArray,
    IsEmptyArray,
    IsEmptyObject,
    IsUndefinedOrNull,
    ObjectDto,
    RemoveEmptyObjectKeys,
    StoreEvent,
    useFetchParams,
    useInfiniteGenericDocumentListing,
} from '@finnoto/core';
import {
    AnimatedTabs,
    cn,
    dateRangeFilterType,
    Icon,
    IconButton,
    InputField,
    Loading,
    MobileDatePickerRange,
    Modal,
    withFilterProviderExport,
} from '@finnoto/design-system';

import AppHeader from '@Components/AppHeader/appHeader.component';
import GenericCardListing from '@Components/GenericCardListing/genericCardListing';

import ListActions, {
    TriggerListingAction,
} from './Components/listActions.component';
import SaveFilter from './Components/saved.filter';
import { GenericDocumentListingProps } from './genericDocumentListing.types';

import { DashboardViewSvgIcon, TableViewSvgIcon } from 'assets';

const GenericDocumentListing = ({
    filters,
    dateFilter,
    definitionKey,
    amountFilter = false,
    searchFilter,
    defaultName,
    cardIcon,
    name,
    type,
    document_id,
    list,
    actions,
    disableNetworkCall,
    queries,
    dashboardComponent,
    showViewFilter = false,
    listingMethod,
    tabs,
    tabFilterKey = 'approval',
    defaultActiveTab,
    defaultClassParams,
    onTabFilterChange: onControlTabFilterChange = EmptyFunction,
    noDataProps,
    noAppHeader,
    onBackPress,
}: GenericDocumentListingProps) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const {
        isFetchingNextPage,
        filterData,
        handleFilterData,
        clearFilterData,
        fetchNextPage,
        hasNextPage,
        records,
        loading,
        tabFilterData,
        handleTabFilterChange,
        setTabFilterData,
        tableFilters,
        hasAnyFilter,
        removeFilterData,
    } = useInfiniteGenericDocumentListing(type, document_id, {
        dateFilter,
        disableNetworkCall,
        filters,
        queries,
        listingMethod,
        tabFilterKey,
        defaultClassParams,
    });

    const { queryString, filter_query, view } = useFetchParams();

    const tabFilter = useMemo(
        () => queryString[tabFilterKey] || defaultActiveTab,
        [defaultActiveTab, queryString, tabFilterKey]
    );
    useUpdateEffect(() => {
        onControlTabFilterChange(tabFilterData, tabFilter);
    }, [tabFilterData]);
    useEffectOnce(() => {
        if (tabFilter) {
            const activeTab = GetObjectFromArray(tabs, 'key', defaultActiveTab);

            setTabFilterData(
                activeTab?.customFilterValue || { [tabFilterKey]: tabFilter }
            );
        }
    });

    const [viewState, setViewState] = useState(view || 'dashboard');
    const viewFilter = [
        {
            key: 'dashboard',
            leftIcon: DashboardViewSvgIcon,
        },
        { key: 'table', leftIcon: TableViewSvgIcon },
    ];

    const hasDashboard =
        dashboardComponent && viewState === 'dashboard' && showViewFilter;

    const hasAddActions = useMemo(() => {
        return !!actions?.some(
            (action: any) =>
                action.visible !== false && action?.type !== 'dropdown'
        );
    }, [actions]);

    useUpdateEffect(() => {
        if (!IsUndefinedOrNull(view)) return;
        setViewState('table');
    }, [view]);

    const [sentryRef] = useInfiniteScroll({
        loading: isFetchingNextPage || loading,
        hasNextPage,
        onLoadMore: fetchNextPage,
        delayInMs: 300,
        // When there is an error, we stop infinite isFetchingNextPage.
        // It can be reactivated by setting "error" state as undefined.
        // disabled: !!error,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });

    const renderTabs = useCallback(() => {
        if (!IsEmptyArray(tabs)) {
            return (
                <AnimatedTabs
                    active={tabFilter || defaultActiveTab}
                    tabs={tabs}
                    contentContainerClass='hidden'
                    tabListClassName='rounded-none shadow z-20'
                    querykey={tabFilterKey}
                />
            );
        }
        return null;
    }, [defaultActiveTab, tabFilter, tabFilterKey, tabs]);

    const onChangeTabFilter = () => {
        if (!tabFilter || tabFilter === 'all') {
            handleTabFilterChange(undefined);
            return;
        }
        const activeTab = GetObjectFromArray(tabs, 'key', tabFilter);

        if (activeTab?.customFilterValue) {
            setTabFilterData(activeTab.customFilterValue);
            return;
        }

        handleTabFilterChange({ [tabFilter]: true });
    };

    const openActions = () => {
        const filteredActions = actions.filter(
            (action: ObjectDto) =>
                action.visible !== false && action?.type !== 'dropdown'
        );

        if (filteredActions.length === 1) {
            const action = filteredActions.pop();
            TriggerListingAction(action);
            return;
        }

        Modal.open({
            component: ListActions,
            // headingTitle: 'Actions',
            // headingTitle: Capitalize(name) + ' Actions',
            closeIcon: false,
            props: { actions },
        });
    };

    const finalFilters = useMemo(() => {
        if (!IsArray(filters)) return filters;

        const filter: any[] = filters?.filter(
            (filter: any) => filter?.visible !== false
        );

        if (amountFilter) {
            filter.unshift({
                title: amountFilter.name,
                key: 'amount',
                type: 'amount_range',
            });
        }
        return filter;
    }, [amountFilter, filters]);

    useEffectOnce(() => {
        onChangeTabFilter();
    });

    useUpdateEffect(() => {
        onChangeTabFilter();
    }, [tabFilter]);
    const renderDatePicker = useCallback(() => {
        if (dateFilter === false) return null;
        const dateValue = filterData?.date;

        return (
            <MobileDatePickerRange
                value={dateValue}
                onRangeSelect={(data) => {
                    const range = data;

                    if (IsEmptyObject(range)) {
                        return handleFilterData(undefined);
                    }

                    if (!range?.startDate && !range?.endDate) {
                        const range = RemoveEmptyObjectKeys({ ...data });
                        const newData = {
                            ...range,
                        };
                        return handleFilterData({ date: newData });
                    }

                    const startDate = startOfDay(range?.startDate);
                    const endDate = endOfDay(range?.endDate);
                    const dateRange: dateRangeFilterType = {
                        min: APIDateFormat({
                            date: startDate,
                            format: API_DATE_TIME_FORMAT,
                        }),
                        max: APIDateFormat({
                            date: endDate,
                            format: API_DATE_TIME_FORMAT,
                        }),
                    };

                    handleFilterData({
                        date: dateRange && { range: dateRange },
                    });
                }}
            />
        );
    }, [dateFilter, filterData?.date, handleFilterData]);

    return (
        <div
            className={cn('relative flex-1 col-flex', {
                'overflow-hidden': tabs?.length > 0,
            })}
        >
            {!noAppHeader && (
                <AppHeader
                    title={defaultName || Capitalize(name)}
                    // onBack={() => {
                    //     Navigation.navigate({
                    //         url: '/',
                    //     });
                    // }}
                    onBack={onBackPress}
                    withBack
                    rightActions={actions?.filter(
                        (action: any) =>
                            action?.type === 'dropdown' &&
                            action?.visible !== false
                    )}
                    rightComponent={renderDatePicker()}
                />
            )}

            {searchFilter !== false && showSearch && !hasDashboard && (
                <div className='fixed top-0 p-2 z-50 items-center w-full gap-2 bg-base-100 row-flex animate-in slide-in-from-top-1/4 fade-in-90 h-[var(--header-height)] border-b w-screen sm:w-[420px]'>
                    <InputField
                        className='flex-1'
                        type='text'
                        name='search_item'
                        placeholder={
                            searchFilter?.placeholder ||
                            'Search ( min: 3 characters )'
                        }
                        addonStart={
                            <Icon
                                source={'search'}
                                iconColor='text-base-secondary'
                            />
                        }
                        addonEnd={
                            <IconButton
                                shape='square'
                                icon={() => <XCircle />}
                                appearance='plain'
                                size='xs'
                                className='text-error'
                                onClick={() => {
                                    setShowSearch((prev) => !prev);
                                    removeFilterData('search');
                                }}
                            />
                        }
                        value={filterData.search || ''}
                        onDebounceChange={(value: string) => {
                            if (value.length >= 3) {
                                handleFilterData({ search: value });

                                return;
                            }

                            if (filterData.search && !value.length) {
                                removeFilterData('search');
                            }
                        }}
                        autoFocus
                    />
                </div>
            )}

            {renderTabs()}
            <div
                className={cn('h-full col-flex', {
                    'h-[calc(100vh-57px-52px)] overflow-hidden overflow-y-auto ':
                        tabs?.length,
                })}
            >
                {hasDashboard ? (
                    dashboardComponent()
                ) : (
                    <div className={cn('flex-1 pb-28 h-full col-flex')}>
                        <GenericCardListing
                            data={records || []}
                            list={list}
                            page={filterData.page || 1}
                            limit={filterData.limit || 20}
                            loading={loading}
                            defaultIcon={cardIcon}
                            showCardIcon
                            empty_title={`No ${name} records found`}
                            noDataProps={noDataProps}
                        />
                        <div
                            className={cn('hidden justify-center pt-4', {
                                'row-flex': hasNextPage,
                            })}
                            ref={sentryRef}
                        >
                            <Loading size='md' color='primary' />
                        </div>
                        {!hasNextPage && !IsEmptyArray(records) && (
                            <div className='pt-4 text-center text-base-tertiary'>
                                End of page
                            </div>
                        )}
                        <div className='fixed bottom-8 left-1/2 z-10 gap-4 -translate-x-1/2 row-flex actions'>
                            {searchFilter !== false && records?.length > 0 && (
                                <ListActionButton
                                    icon={'search'}
                                    onClick={() => setShowSearch(true)}
                                    name='search_in_list'
                                />
                            )}
                            {definitionKey && (
                                <SaveFilter definitionKey={definitionKey} />
                            )}
                            {hasAddActions && (
                                <ListActionButton
                                    icon={() => <PlusCircle size={24} />}
                                    onClick={openActions}
                                    name='action_in_list'
                                    isSvg
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const ListActionButton = ({
    title,
    icon,
    isSvg,
    onClick = () => {},
    name,
    iconSize = 24,
    isActive,
}: {
    title?: string;
    icon: any;
    isSvg?: boolean;
    onClick?: (e: any) => void;
    name?: string;
    iconSize?: number;
    isActive?: boolean;
}) => {
    return (
        <div
            data-title={name}
            className={cn(
                'gap-2 justify-center items-center h-12 rounded-full cursor-pointer select-none row-flex shadow-modal bg-base-100 min-w-[48px] active:bg-base-200',
                { 'px-4': title }
            )}
            onClick={onClick}
        >
            <div className='relative'>
                {' '}
                <Icon
                    source={icon}
                    size={iconSize}
                    isSvg={isSvg}
                    iconColor='text-primary'
                />
                {isActive && <span className='filter-applied'></span>}
            </div>
            {title ? <span>{title}</span> : null}
        </div>
    );
};

export const RefetchGenericListing = () => {
    StoreEvent({ eventName: GENERIC_LISTING_REFETCH });
};

export default withFilterProviderExport(GenericDocumentListing);
