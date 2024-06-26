import { ReactNode, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';

import {
    getIndianFiscalYear,
    GetItem,
    HOME_ROUTE,
    IsEmptyArray,
    SetItem,
    TitleRoutePayload,
    useFetchParams,
} from '@finnoto/core';
import {
    BasicFilterButton,
    Breadcrumbs,
    Container,
    dateFilterType,
    DateRangeFilterPicker,
    useDateRangeFilter,
    useFilter,
} from '@finnoto/design-system';
import { BasicFilterButtonProps } from '@finnoto/design-system/src/Components/Navigation/BasicFilter/basicFilter.types';

import GenericDefinitionListing from '@Components/GenericDocumentListing/genericDefinitionListing.component';
import { GenericDefinitionListingProps } from '@Components/GenericDocumentListing/genericDefinitionListing.types';
import { renderListingActionButton } from '@Components/GenericDocumentListing/genericDocumentListing.component';
import GenericAnimatedTabListing, {
    GenericAnimatedTabListingProps,
} from '@Components/GenericDocumentListing/genericTabAnimation.component';

import { DashboardViewSvgIcon, TableViewSvgIcon } from 'assets';

export const local_dashboard_table_view_key = '__dashboard_table_view';

const DashboardTableWrapper = ({
    title,
    dashboardComponent,
    noDateFilter,
    customFilter,
    actions,
    hideFilter,
    documentProps,
    isMultiDefinitionTab,
    muliDocumentProps,
    switchButtonSize,
}: {
    title: string;
    noDateFilter?: dateFilterType;
    customFilter?: ReactNode;
    hideFilter?: boolean;
    dashboardComponent: ReactNode;
    documentProps?: Omit<
        GenericDefinitionListingProps,
        'name' | 'dateFilter' | 'hideFilter'
    >;
    muliDocumentProps?: GenericAnimatedTabListingProps;
    actions?: GenericDefinitionListingProps['actions'];
    isMultiDefinitionTab?: boolean;
    switchButtonSize?: BasicFilterButtonProps['size'];
}) => {
    const { end_date, start_date } = getIndianFiscalYear(new Date());
    const { view = GetItem(local_dashboard_table_view_key) } = useFetchParams();
    const { defaultDateRange } = useDateRangeFilter({
        defaultDateRange: {
            min: start_date,
            max: end_date,
        },
    });
    const { handleFilterData, filterData } = useFilter({
        defaultValues: {
            date: defaultDateRange,
        },
    });

    useUpdateEffect(() => {
        SetItem(local_dashboard_table_view_key, view);
    }, [view]);

    const breadcrumbData: Array<TitleRoutePayload> = [
        {
            name: 'Home',
            link: HOME_ROUTE,
            className: 'text-base-tertiary',
        },
        {
            name: view === 'dashboard' ? `${title} (Dashboard)` : title,
            className: 'text-base-tertiary',
        },
    ];
    const renderTable = useCallback(() => {
        if (isMultiDefinitionTab)
            return (
                <GenericAnimatedTabListing
                    {...{ name: title, hideFilter }}
                    {...muliDocumentProps}
                    renderRightActionComponent={
                        <DashboardTabButton
                            activeView={view}
                            size={switchButtonSize}
                        />
                    }
                />
            );
        return (
            <GenericDefinitionListing
                {...documentProps}
                {...{ name: title, hideFilter }}
                renderRightActionComponent={
                    <DashboardTabButton
                        activeView={view}
                        size={switchButtonSize}
                    />
                }
            />
        );
    }, [
        documentProps,
        hideFilter,
        isMultiDefinitionTab,
        muliDocumentProps,
        switchButtonSize,
        title,
        view,
    ]);

    return (
        <Container className='h-full col-flex '>
            <div className='flex-1 col-flex'>
                {view === 'table' ? (
                    renderTable()
                ) : (
                    <>
                        <div className='flex items-center justify-between px-4 pt-4 mb-3'>
                            <Breadcrumbs title={title} route={breadcrumbData} />
                            {!hideFilter && (
                                <div className='flex items-center gap-4'>
                                    {!IsEmptyArray(actions) &&
                                        renderListingActionButton(actions)}
                                    <DashboardTabButton activeView={view} />
                                    {!noDateFilter && (
                                        <DateRangeFilterPicker
                                            value={filterData?.date}
                                            onChange={(value) => {
                                                handleFilterData({
                                                    date: value,
                                                });
                                            }}
                                        />
                                    )}
                                    {customFilter}
                                </div>
                            )}
                        </div>
                        <div className='px-4 pb-3'>{dashboardComponent}</div>
                    </>
                )}
            </div>
        </Container>
    );
};

export default DashboardTableWrapper;

const DashboardTabButton = ({
    activeView,
    size = 'normal',
}: {
    activeView?: any;
    size?: BasicFilterButtonProps['size'];
}) => {
    const viewFilter = [
        {
            key: 'dashboard',
            leftIcon: DashboardViewSvgIcon,
        },
        { key: 'table', leftIcon: TableViewSvgIcon },
    ];

    return (
        <BasicFilterButton
            active={activeView}
            filters={viewFilter}
            queryKey='view'
            size={size}
        />
    );
};
