import React, { useMemo } from 'react';

import { Button } from '@slabs/ds-core';
import {
    cn,
    getObjectFromArrayByValue,
    isEmptyArray,
    isEmptyObject,
    isFunction,
    ObjectDto,
} from '@slabs/ds-utils';

import { Container } from '../components/container.component';
import { useGenericDocumentListing } from '../hooks/use-generic-document-listing.hook';
import { useLocalSearch } from '../hooks/use-local-search.hook';
import { RightClickRowOptionProps } from '../right-click/right-click.types';
import { Table } from '../table/table';
import { GenericDocumentListingProps } from './generic-document-listing.types';

const GenericDocumentListing = ({
    name,
    type,
    tableNumbering = true,
    table,
    tabs,
    // filters,
    searchFilter,
    // dateFilter = false,
    // amountFilter = false,
    hideFilter,
    disableNetworkCall,
    rowActions,
    actions = [],
    // customBreadcrumbData,
    showViewFilter = false,
    defaultActiveTab,
    defaultDbSort,
    preferences = {},
    tableClass,
    disableAggregation,
    searchMethod = 'list',
    tabFilterKey = 'approval',
    handleSelectedData = () => {},
    // customNoData,
    defaultClassParams,
    definitionKey,
    asInnerTable = false,
    renderRightFilterComponent,
    renderRightActionComponent,
    enableCsvDownload = true,
    removeReportDate,
    searchMethodParams,
    allColumns,
    tableWrapperClassName,
    hideSaveFilter,
    onlyDisplayQueryFilter,
    containerClassName,
    tableType = 'normal',
    renderMiddleComponent,
    hidePagination,
    withLegacyFilter,
    renderContentBeforeTable,
    sanitizeFilter,
    filterTitle,
    disableFilterOut = false,
    disableContextAction = false,
    ...props
}: GenericDocumentListingProps) => {
    const {
        loading,
        filterData,
        records,
        pagination,
        // tableFilters,
        handleFilterData,
        removeFilterData,
        handleNavigationSearch,
        setPagination,
        aggregate,
        handleStatus,
        createQuery,
        downloadCsv,
    } = useGenericDocumentListing(type, {
        // dateFilter,
        // amountFilter,
        disableNetworkCall,
        defaultDbSort,
        showViewFilter,
        searchMethod,
        searchFilter,
        tabFilterKey,
        defaultClassParams,
        // filters,
        definitionKey,
        name,
        removeReportDate,
        searchMethodParams,
        sanitizeFilter,
    });

    const {
        searchQuery,
        setSearchQuery,
        searchResult: localSearchRecords,
    } = useLocalSearch(
        records,
        (searchFilter !== false && searchFilter?.localSearchAttrs) || ''
    );

    const { container, selectable } = preferences;

    const contextActions: RightClickRowOptionProps[] = useMemo(
        () => [
            {
                name: 'Aggregation',
                visible: ({ column }) =>
                    !disableAggregation &&
                    !column.disableAggregation &&
                    ['number', 'currency', 'date', 'date_time'].includes(
                        column.type
                    ),
                actions: [
                    {
                        name: 'Sum',
                        visible: ({ column }) =>
                            ['number', 'currency'].includes(column.type),
                        onClick: aggregate().sum,
                    },
                    {
                        name: 'Avg',
                        visible: ({ column }) =>
                            ['number', 'currency'].includes(column.type),
                        onClick: aggregate().avg,
                    },
                    {
                        name: 'Min',
                        onClick: aggregate().min,
                    },
                    {
                        name: 'Max',
                        onClick: aggregate().max,
                    },
                ],
            },
        ],
        [
            aggregate,
            createQuery,
            disableAggregation,
            disableFilterOut,
            filterData,
            handleNavigationSearch,
            pagination?.limit,
        ]
    );

    const sanitizeActions = useMemo(() => {
        if (isEmptyArray(actions)) return [];
        return actions?.filter((action) => action.type !== 'create');
    }, [actions]);

    const dataNotFoundContent = useMemo(() => {
        let addAction = getObjectFromArrayByValue(
            sanitizeActions,
            'type',
            'create'
        );
        if (!addAction) {
            addAction = getObjectFromArrayByValue(
                sanitizeActions,
                'type',
                'icon_btn'
            );
        }

        let noData: any = {
            title: `No Data Found`,
            description: addAction
                ? `To add a new ${name}, click on the button below`
                : '',
            button: {
                name: addAction?.name,
                onClick: addAction?.action || null,
            },
            enableAddNew: !!addAction?.visible,
            name,
        };

        if (!noData.button?.onClick) {
            noData.enableAddNew = false;
            delete noData.button;
        }
        return {
            ...noData,
            // ...(customNoData || {}),
        };
    }, [name, sanitizeActions]);

    const isLocalSearchEnabled = useMemo(() => {
        if (!searchFilter) return false;
        if (!searchFilter.local) return false;

        if (filterData?.search?.length) return false;

        return true;
    }, [filterData?.search?.length, searchFilter]);

    const sort = useMemo(() => {
        const order = filterData?.order;
        if (!order) return {};
        if (isEmptyObject(order)) return {};

        return {
            column: Object.keys(order)[0],
            order: Object.values(order)[0] as any,
        };
    }, [filterData?.order]);

    return (
        <Container
            offContainer={container || asInnerTable}
            className={cn(
                'relative flex flex-col p-4 overflow-hidden h-full print:bg-transparent ap-container generic-document-listing',
                asInnerTable && '!px-0',
                containerClassName
            )}
            pageTitle={name}
        >
            <div
                className={cn(
                    'relative flex-1 gap-3 flex flex-col print:p-0',
                    tableWrapperClassName
                )}
            >
                {!asInnerTable && (
                    <div className='flex items-center justify-between '>
                        {/* <Breadcrumbs
                            title={name}
                            route={customBreadcrumbData || breadcrumbData}
                        /> */}
                        <div className='flex items-center gap-4'>
                            {renderRightActionComponent}
                            {!isEmptyArray(sanitizeActions) && (
                                <div className='flex flex-col'>
                                    <div className='flex-wrap justify-end gap-4 row-flex'>
                                        {renderListingActionButton(
                                            sanitizeActions,
                                            records
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* {isFunction(renderContentBeforeTable)
                    ? renderContentBeforeTable({
                          clearAllFilter,
                      })
                    : renderContentBeforeTable} */}
                <TabTableWrapper
                    tabs={tabs}
                    tabTableWrapperClass={cn(tableWrapperClassName)}
                >
                    {/* <IndexFilter
                        className='mb-2 border rounded-lg'
                        filters={filters}
                        filterTabs={tabs}
                        defaultActiveTab={defaultActiveTab || 'all'}
                        definitionKey={definitionKey}
                        tabFilterQueryKey={tabFilterKey}
                        onlyDisplayQueryFilter={onlyDisplayQueryFilter}
                        searchString={
                            isLocalSearchEnabled
                                ? searchQuery || ''
                                : filterData?.search || ''
                        }
                        filterTitle={filterTitle}
                        searchFilter={searchFilter}
                        hideFilter={hideFilter}
                        hideSaveFilter={hideSaveFilter}
                        rightTabContent={
                            <div className='flex items-center gap-2'>
                                {renderRightFilterComponent}
                            </div>
                        }
                        onSearchChange={(value:any) => {
                            if (!value.length) {
                                removeFilterData('search');
                                setSearchQuery('');
                                return;
                            }
                            if (isLocalSearchEnabled) {
                                return setSearchQuery(value);
                            }
                            if (value.length >= 3) {
                                handleFilterData({
                                    search: value,
                                });
                            }
                        }}
                        withLegacyFilter={withLegacyFilter}
                    /> */}
                    <div className={cn('h-full overflow-y-auto', tableClass)}>
                        {tableType === 'normal' && (
                            <Table
                                rowAction={{
                                    display:
                                        isFunction(rowActions) ||
                                        rowActions?.some(
                                            (action: any) =>
                                                action.visible !== false
                                        ),
                                    menuActions: rowActions,
                                }}
                                contextActions={contextActions}
                                disableContextActions={disableContextAction}
                                data={
                                    isLocalSearchEnabled
                                        ? localSearchRecords
                                        : records
                                }
                                isHideSummary
                                column={table}
                                rowNumbering={tableNumbering}
                                showToltip={true}
                                pagination={{
                                    display: !hidePagination,
                                    pagination,
                                    onPaginationChange: setPagination,
                                }}
                                sorting={{
                                    sorting: {
                                        column: sort.column as string,
                                        order: sort.order || 'asc',
                                    },
                                    onSortingChange: ({ column, order }) => {
                                        handleFilterData({
                                            order: { [column]: order },
                                        });
                                    },
                                }}
                                select={{
                                    display: selectable,
                                    handleSelectedData,
                                }}
                                loading={loading}
                                preferences={{
                                    appearance: 'neutral',
                                    isFullHeight: true,
                                    hasRoundedCorners: true,
                                    ...preferences,
                                }}
                                // handleStatus={(
                                //     id: number,
                                //     isActive?: boolean,
                                //     method?: string,
                                //     callback?: (data?: any) => void
                                // ) => {
                                //     handleStatus(
                                //         id,
                                //         isActive,
                                //         method || 'activate',
                                //         callback
                                //     );
                                // }}
                            />
                        )}
                    </div>
                </TabTableWrapper>
                {/* )} */}
            </div>
        </Container>
    );
};

const TabTableWrapper = ({ children, tabs, tabTableWrapperClass }: any) => {
    if (!tabs?.length)
        return (
            <div className={cn('h-full flex flex-col', tabTableWrapperClass)}>
                {children}
            </div>
        );
    return (
        <div className={cn('h-full flex flex-col', tabTableWrapperClass)}>
            {children}
        </div>
    );
};

export const renderListingActionButton = (actions: any, records?: any) => {
    if (isEmptyArray(actions)) return null;

    return actions?.map((value: any, index: number) => {
        if (isFunction(value?.visible) && !value?.visible(records)) return null;
        if (value?.visible === false) return null;

        const buttonActions = value?.buttonActions?.map((val: ObjectDto) => ({
            ...val,
            action: () => val?.action?.(records),
        }));

        switch (value.type) {
            // case 'action_btn':
            //     return (
            //         <DropdownActionButton actions={buttonActions} size='md' />
            //     );

            // case 'icon_btn':
            //     return (
            //         <IconButton
            //             key={index}
            //             shape='square'
            //             outline={value?.outline}
            //             appearance='primary'
            //             icon={value?.icon}
            //             onClick={() => value.action(null)}
            //             name={value?.name}
            //             size='md'
            //         />
            //     );
            case 'normal':
                return (
                    <Button
                        key={index}
                        variant='default'
                        size='md'
                        onClick={() => value.action(records)}
                        disabled={value?.outline ?? false}
                    >
                        <div className='items-center gap-2 row-flex'>
                            {value.name}
                        </div>
                    </Button>
                );

            default:
                return (
                    <Button
                        key={value?.key}
                        variant='default'
                        size='md'
                        onClick={() => value.action(null)}
                    >
                        {value.name}
                    </Button>
                );
        }
    });
};

export { GenericDocumentListing };
