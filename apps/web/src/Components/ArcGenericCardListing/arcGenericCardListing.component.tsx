import { useMemo } from 'react';

import {
    ARC_HOME_ROUTE,
    IsEmptyArray,
    Navigation,
    ObjectDto,
    useFetchParams,
    useGenericTableListing,
} from '@finnoto/core';
import {
    ArcBreadcrumbs,
    ArcPagination,
    cn,
    Container,
    IndexFilter,
    NoDataFound,
    sanitizeFilterData,
    useFilterContext,
    withFilterProviderExport,
} from '@finnoto/design-system';
import { BreadcrumbsProps } from '@finnoto/design-system/src/Components/Navigation/Breadcrumbs/breadcrumbs.types';

import { renderListingActionButton } from '@Components/GenericDocumentListing/genericDocumentListing.component';

import ArcToggleListingButtonGroup from './arc.toggle.listing.button.group.component';
import { ArcGenericCardListingProps } from './arcGenericCard.types';

const ArcGenericCardListing = (props: ArcGenericCardListingProps) => {
    const {
        type,
        title,
        definitionKey,
        customBreadCrumbData,
        actions,
        tabs,
        filters,
        renderRightFilterComponent,
        renderRightActionComponent,
        tabFilterKey = 'tab',
        methodParams,
        defaultClassParams,
        isShowPagination = true,
        activeTab,
        defaultActiveTab = 'all',
        hideToggleView,
        splitDetailRoute,
        withLegacyFilter,
        method,
        onSplitButtonClick,
    } = props;

    const { tab, queryParams, status, approval } = useFetchParams();

    const tabValue = useMemo(
        () => queryParams[tabFilterKey] || defaultActiveTab,
        [defaultActiveTab, queryParams, tabFilterKey]
    );

    const breadcrumbData: BreadcrumbsProps = {
        title,
        route: [
            {
                name: 'Home',
                link: ARC_HOME_ROUTE,
            },
            {
                name: title,
            },
        ],
    };

    const tabParams = useMemo(() => {
        if (!tab && !tabValue) return {};

        if (!tabs?.length) return {};
        if (tabValue) {
            return tabs?.find((t) => t.key === tabValue)?.customFilterValue;
        }

        return tabs?.find((t) => t.key === tab)?.customFilterValue || {};
    }, [tab, tabValue, tabs]);

    const {
        filterData,
        sqlFilterQuery,
        filterJson,
        pagination,
        setPagination,
    } = useFilterContext();

    const { search, ...restFilters } = useMemo(
        () => sanitizeFilterData(filterData),
        [filterData]
    );

    const { records, stats } = useGenericTableListing(type, {
        methodParams,
        classParams: {
            search: search && search.length >= 3 ? search : undefined,
            ...(defaultClassParams || {}),
            ...tabParams,
            ...restFilters,
            filter_json: filterJson,
            filter_query: sqlFilterQuery,
        },
        method,
        definitionKey,
    });
    const first = records?.[0];

    const showAddAction = useMemo(
        () =>
            (!queryParams?.[tabFilterKey] && !queryParams?.saved_filter) ||
            ['all', 'active', 'open'].includes(queryParams?.[tabFilterKey]),
        [queryParams, tabFilterKey]
    );

    const sanitizedActions = useMemo(() => {
        const actions = props.actions || props.arcBreadcrumbActions;

        if (IsEmptyArray(actions)) return [];

        if (!showAddAction)
            return [...actions]?.filter((action) => action.type !== 'create');

        return actions;
    }, [showAddAction, props.actions, props.arcBreadcrumbActions]);

    return (
        <Container
            className={cn('px-5 overflow-hidden col-flex h-content-screen')}
        >
            <ArcBreadcrumbs
                mainClassName='rounded py-3 rounded-none'
                title={title}
                route={customBreadCrumbData || breadcrumbData.route}
                rightComponent={
                    <div>
                        {renderListingActionButton(sanitizedActions, records)}
                    </div>
                }
            />

            <div className='justify-between flex-1 gap-2 py-4 pt-0 overflow-y-auto col-flex'>
                <IndexFilter
                    className='border rounded-lg '
                    filters={filters}
                    filterTabs={tabs}
                    definitionKey={definitionKey}
                    defaultActiveTab={defaultActiveTab}
                    tabFilterQueryKey={tabFilterKey}
                    rightTabContent={
                        <div className='flex items-center gap-2'>
                            {renderRightFilterComponent}
                            {!hideToggleView && !IsEmptyArray(records) && (
                                <ArcToggleListingButtonGroup
                                    onToggle={(view) => {
                                        if (view === 'grid') {
                                            if (onSplitButtonClick) {
                                                onSplitButtonClick();
                                                return;
                                            }
                                            Navigation.navigate({
                                                url: `${splitDetailRoute}/${first?.id}`,
                                                withDefaultQueryParam: true,
                                            });
                                        }
                                    }}
                                    view='list'
                                />
                            )}
                            {renderRightActionComponent}
                            {!IsEmptyArray(actions) && (
                                <div className='col-flex'>
                                    <div className='flex-wrap justify-end gap-2 row-flex'>
                                        {renderListingActionButton(
                                            actions,
                                            records
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    withLegacyFilter={withLegacyFilter}
                />
                <RenderList {...{ records, props, showAddAction }} />
                {isShowPagination && (
                    <ArcPagination
                        pagination={{
                            page: Number(pagination?.page),
                            limit: Number(pagination?.limit),
                        }}
                        totalRecords={stats?.total}
                        onPaginationChange={(pagination) =>
                            setPagination({
                                page: pagination.page,
                                limit: pagination.limit,
                            })
                        }
                    />
                )}
            </div>
        </Container>
    );
};

export default withFilterProviderExport(ArcGenericCardListing);

const RenderList = ({
    records,
    props,
    showAddAction,
}: {
    records: ObjectDto[];
    props: ArcGenericCardListingProps;
    showAddAction: boolean;
}) => {
    const { gridCols = 3 } = props;

    const addAction = useMemo(() => {
        const actions = props.actions || props.arcBreadcrumbActions;
        return actions?.find((action) => action.type === 'create');
    }, [props.actions, props.arcBreadcrumbActions]);

    const noDataProps = useMemo(() => {
        const { button } = props.noDataProps || {};

        if (!showAddAction) {
            return {
                ...props.noDataProps,
                button: null,
            };
        }

        const buttonProps = {
            name: button?.name || props.title,
            onClick: button?.onClick || addAction?.action,
        };

        return {
            ...props.noDataProps,
            button: buttonProps?.onClick ? buttonProps : null,
        };
    }, [addAction?.action, showAddAction, props.noDataProps, props.title]);

    if (IsEmptyArray(records)) {
        return (
            <div className='flex-1 gap-3 col-flex'>
                <NoDataFound {...noDataProps} />
            </div>
        );
    }

    return (
        <div className='flex-1 overflow-y-auto'>
            <div
                className={cn('grid gap-2', {
                    'grid-cols-1': gridCols === 1,
                    'grid-cols-2': gridCols === 2,
                    'grid-cols-3': gridCols === 3,
                    'grid-cols-4': gridCols === 4,
                })}
            >
                {records.map((item) => props.renderCardItem?.(item))}
            </div>
        </div>
    );
};
