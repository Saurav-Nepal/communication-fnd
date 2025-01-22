import { useCopyToClipboard } from 'react-use';

import { Button, Card } from '@slabs/ds-core';
import { Modal } from '@slabs/ds-dialog';
import { HotkeyItem, useHotkeys } from '@slabs/ds-hooks';
import { cn, isEmptyArray, isEmptyObject } from '@slabs/ds-utils';

import { TableConfigurator } from '@/components/configurator/tableConfigurator/tableConfigurator.component';
import ConfigureDynamicFilter from '@/components/configureDynamicFilter/configureDynamicFilter.component';
import CustomAction from '@/components/customAction/customAction.component';
import ListingPagination from '@/components/listingPagination/listingPagination.component';
import ListingSearch from '@/components/listingSearch/listingSearch.component';
import GenericLoader from '@/components/loader/genericLoader.component';
import PortletTable from '@/components/portletTable/portletTable.component';
import { useGenericListing } from '@/hooks/useGenericListing.hook';
import { GENERIC_LISTING_PROPS } from '@/types';
import { FilterTableJson, GetAggregation } from '@/utils/genericListing.utils';
import { Navigation } from '@/utils/navigation.utils';
import { Toast } from '@/utils/toast.utils';

import DynamicFilter from '../../components/dynamicFilter/dynamicFilter.component';

const GenericListingScene = (props: GENERIC_LISTING_PROPS) => {
    const {
        isLoading,
        currentUser,
        genericData,
        filterContent,
        resetGenericListing,
        refreshGenericListing,
        exportGenericListingTable,
        toggleAdvancedFilter,
        filterColumn,
    } = useGenericListing(props);

    const [_, CopyToClipboard] = useCopyToClipboard();

    const { menuDetail, source: propsSource, parentData, portlet } = props;
    const source = propsSource || 'menu';

    const { listing = [], finalColumns = [] } = genericData || {};

    const keys: HotkeyItem = {
        hotKey: 'meta+r', //Introducing Command + R buttons
        handler: (e: KeyboardEvent) => resetGenericListing(e), // RefreshPage function contains the function to be refreshed
    };

    useHotkeys([keys]);

    const onLayoutChanges = (layout) => {
        menuDetail.layout = layout;
        resetGenericListing();
        Modal.close();
    };

    // Preparing option for right click
    const rowOptions = [
        {
            id: 0,
            name: 'Copy Row Id',
            icon: 'fa-copy',
            subMenu: false,
            onClick: (data: any) => {
                const id = data.listingRow[data.starter + '.id'];
                CopyToClipboard(id);
                Toast.success({
                    description: 'Id - ' + id + ' has been copied',
                    title: 'Copy Id',
                });
            },
            disabled: false,
        },
        { subMenu: null },
        {
            id: 1,
            name: 'Show Matching',
            icon: 'fa-retweet',
            subMenu: false,
            onClick: (data: any) => {
                FilterTableJson(data, [' LIKE ', ' = ']);
                return true;
            },
            disabled: false,
        },
        {
            id: 2,
            name: 'Filter Out',
            icon: 'fa-columns',
            subMenu: false,
            onClick: (data: any) => {
                FilterTableJson(data, [' NOT LIKE ', ' != ']);
                return true;
            },
            disabled: false,
        },
        {
            id: 3,
            name: 'Filter More',
            icon: 'fa-filter',
            subMenu: false,
            onClick: (data: any) => {
                filterColumn(data.selectedColumn);
                return true;
            },
            disabled: false,
        },
        {
            id: 4,
            name: 'Aggregation',
            icon: 'fa-line-chart',
            onClick: (data: any, _, operator: any) => {
                GetAggregation(
                    operator.name.toLowerCase(),
                    operator.name +
                        ' of ' +
                        data.selectedColumn.display_name +
                        ' equals : ',
                    data
                );
            },
            subMenu: true,
        },
        {
            id: 4,
            name: 'Redirect Menu Detail',
            icon: 'fa-deaf',
            subMenu: false,
            onClick: () => {
                Navigation.navigate({ url: '/menu/' + genericData.menuId });
            },
            disabled: false,
        },
        {
            id: 4,
            name: 'Redirect Model Detail',
            icon: 'fa-info-circle',
            subMenu: false,
            onClick: () => {
                Navigation.navigate({ url: '/model/' + genericData.modelId });
            },
            disabled: false,
        },
        {
            id: 0,
            name: 'Preferences Settings',
            icon: 'fa-gift',
            subMenu: false,
            // disabled: this.preferenceObj ? true : false,
            onClick: () => {
                const preferenceObj = {
                    // used for editing preferences
                    name: menuDetail.pageName, // preference name to be shown on modal
                    role: true,
                };
                if (
                    genericData.preDefinedmethods &&
                    genericData.preDefinedmethods.preferenceSetting
                ) {
                    genericData.preDefinedmethods.preferenceSetting(
                        menuDetail.preference,
                        preferenceObj
                    );
                }
            },
        },
    ];

    if (isLoading || isEmptyObject(genericData)) {
        return (
            <GenericLoader
                menuDetail={menuDetail}
                loadingAnimation
                mode={props.mode}
            />
        );
    }

    return (
        <div
            className={cn('p-2 main-listing-container', {
                ' 2xl:container': props.mode === 'boxed',
            })}
        >
            {/* <GlobalHotKeys {...{ keyMap, handlers }} /> */}
            <Card className='generic-listing-container'>
                {/* Top Page Bar */}
                <div
                    className={cn(
                        'flex justify-between items-center px-2 py-2 page-bar',
                        props.pageBarClassName
                    )}
                >
                    {/* Local Search for Listing */}
                    <div className='flex gap-4 items-center search-bar'>
                        <div className='generic-listing-search'>
                            {filterContent && filterContent.dictionary && (
                                <ListingSearch
                                    genericData={genericData}
                                    // localSearch={localSearch}
                                    // onEdit={this.filterLocally}
                                    searchDetail={{
                                        name: genericData.model.display_column,
                                    }}
                                    dictionary={filterContent.dictionary}
                                />
                            )}
                        </div>
                        <div className='search-wrapper'>
                            {filterContent && filterContent.dictionary && (
                                <DynamicFilter
                                    toggleAdvancedFilter={toggleAdvancedFilter}
                                />
                            )}
                        </div>
                    </div>
                    {/* Local Search Ends */}

                    {/* Header Actions */}
                    <div className='header-actions'>
                        <div className='flex gap-2'>
                            {/* Refresh Button */}
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={(e) => {
                                    resetGenericListing(e);
                                }}
                            >
                                <i className='fa fa-refresh' />
                            </Button>
                            {/* Refresh Button Ends */}

                            {/* Export Button */}
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={(e) => {
                                    exportGenericListingTable(e);
                                }}
                            >
                                <i className='fa fa-share-alt' />
                            </Button>
                            {/* Export Button Ends */}

                            {/* Custom Action generates all the actions from the api  */}
                            <CustomAction
                                position='header'
                                callback={refreshGenericListing}
                                parentData={parentData}
                                menuDetail={menuDetail}
                                history={history}
                                genericData={genericData}
                                actions={genericData.nextActions}
                                // selectedRows={selectedRows}
                                portlet={portlet}
                                placement='as_header'
                            />
                            {/* Custom Action Ends */}

                            {/* Table Configurator */}
                            {!isEmptyObject(genericData.columns) ? (
                                <TableConfigurator
                                    className='bg-base-200'
                                    display_name='name'
                                    source={source}
                                    onSubmit={onLayoutChanges}
                                    listName={genericData.listName}
                                    layout={genericData.layout}
                                    columns={genericData.columns}
                                    menuId={menuDetail.menuId}
                                    userId={currentUser?.id}
                                />
                            ) : null}
                            {/* Table Configurator Ends */}
                        </div>
                    </div>
                </div>

                {/* Dynamic Filter for advanced filter */}
                <div className='configure-filter-wrapper'>
                    {filterContent && (
                        <ConfigureDynamicFilter
                            filters={genericData.userFilter}
                            content={filterContent}
                        />
                    )}
                </div>
                {/* Dynamic Filter Ends */}

                <div className='listing-container'>
                    {!isEmptyArray(finalColumns) ? (
                        <div className='table-wrapper'>
                            {/* Portlet Table */}
                            <PortletTable
                                tableType='listing'
                                // onRowSelect={onRowSelect}
                                // deleteRow={deleteRow}
                                rowOptions={rowOptions}
                                parentData={parentData}
                                genericData={genericData}
                                finalColumns={finalColumns}
                                listing={listing}
                                callback={refreshGenericListing}
                                menuDetail={menuDetail}
                                source={propsSource || 'model'}
                                filterColumn={filterColumn}
                                portlet={portlet}
                            />
                            {/* Portlet Table Ends */}
                        </div>
                    ) : null}
                    {finalColumns[0] && finalColumns[0].defaultLayout ? (
                        <div className='p-2 text-muted-foreground'>
                            No columns were selected, displaying default columns
                        </div>
                    ) : null}

                    {/* Pagination for the table */}
                    {!isEmptyArray(finalColumns) ? (
                        <ListingPagination
                            stats={{
                                current_page: parseInt(genericData.currentPage),
                                limit: genericData.limit,
                                records: genericData.listing
                                    ? genericData.listing.length
                                    : 0,
                            }}
                        />
                    ) : (
                        <div className='p-2 text-muted-foreground'>
                            Looks like no columns are selected , Configure it by
                            pressing the settings icon.
                        </div>
                    )}
                    {/* Listing Pagination Ends */}
                </div>
            </Card>
        </div>
    );
};

export { GenericListingScene };
