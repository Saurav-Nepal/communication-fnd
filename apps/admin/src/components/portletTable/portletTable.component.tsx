import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    RightClick,
} from '@slabs/ds-core';
import { isEmptyArray } from '@slabs/ds-utils';

import { GENERIC_DATA, ROW_TYPE, UI_ACTION_TYPE } from '@/types';
import { Navigation } from '@/utils/navigation.utils';

import CustomAction from '../customAction/customAction.component';
import { ReportTemplate, RowTemplate } from './utils/portletTable.utils';

interface PortletTableProps {
    tableType: string;
    finalColumns?: any;
    listing: ROW_TYPE[];
    genericData: GENERIC_DATA;
    is_report?: boolean;
    deleteRow?: (listRow: object, boolean) => void;
    onRowSelect?: (data: ROW_TYPE, isSelectAll?: boolean) => void;
    rowOptions?: object[];
    parentData?: object;
    // history: any;
    // match: any;
    callback: (input: {
        withoutIdentifier: boolean;
        exportVariable: boolean;
    }) => void;
    menuDetail: object;
    source: string;
    filterColumn?: any;
    portlet?: any;
    rowTemplate?: any;
    disableAdvancedFilter?: boolean;
    rowKey?: string;
    selectAll?: boolean;
    splitList?: boolean;
    onRowClick?: (row: ROW_TYPE) => void;
}

const PortletTable = (props: PortletTableProps) => {
    const { listing, genericData, is_report } = props || {};

    const [reverse, setReverse] = useState<boolean>(false);
    const [sortKey, setSortKey] = useState<string>();

    const uiActions = useMemo(() => {
        if (isEmptyArray(genericData.nextActions)) return [];

        const actions: UI_ACTION_TYPE[] = [];

        genericData.nextActions.forEach((action) => {
            if (!action.as_record || !action.active) return;
            actions.push(action);
        });

        return actions;
    }, [genericData?.nextActions]);

    const sortedListing = useMemo(() => {
        if (!sortKey || !listing || isEmptyArray(listing)) return listing;

        function generateSortFn(prop, rev) {
            return function (a, b) {
                //ascending: reverse off , descending: reverse on

                if (a[prop] == null && b[prop] != null) {
                    //reverse: off- put valued object above null. reverse: on- put valued object below null
                    return rev ? -1 : 1;
                } else if (b[prop] == null && a[prop] != null) {
                    //reverse: off- put valued object below null. reverse: on- put valued object above nul
                    return rev ? 1 : -1;
                } else if (b[prop] == null && a[prop] == null) {
                    //reverse: off, on - do nothing for both nulls
                    //Do_nothing
                } else if (a[prop] < b[prop]) {
                    //Do comparison on the basis of alphabetical order.
                    return rev ? 1 : -1;
                } else if (a[prop] > b[prop]) {
                    //Do comparison on the basis of alphabetical order.
                    return rev ? -1 : 1;
                }
                return 0;
            };
        }

        return listing.sort(generateSortFn(sortKey, reverse));
    }, [reverse, sortKey, listing]);

    const onSort = (sortColumn) => {
        let newSortkey: string;

        if (is_report) {
            newSortkey = sortColumn.column_name;
        } else {
            if (sortColumn.type_id) {
                newSortkey = sortColumn.path;
            } else {
                newSortkey = sortColumn.headerName;
            }
        }
        setReverse(sortKey === newSortkey ? !reverse : false);
        setSortKey(newSortkey);
    };

    const renderTable = useCallback(() => {
        if (isEmptyArray(sortedListing))
            return <div className='no-data-to-show'>No Data to show</div>;

        return (
            <div className='table table-bordered'>
                <TableHeader
                    hasRowAction={!isEmptyArray(uiActions)}
                    {...{ reverse, sortKey, onSort }}
                    {...props}
                />

                <div className='table-row-group'>
                    {sortedListing.map((listingRow, rowKey) => {
                        return (
                            <TableRows
                                key={rowKey}
                                listingRow={listingRow}
                                starter={genericData.starter}
                                currentPage={genericData.currentPage}
                                limit={genericData.limit}
                                rowKey={rowKey}
                                uiActions={uiActions}
                                {...props}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }, [props, sortedListing, reverse, sortKey]);

    return (
        <div
            className={clsx('table-container bg-card', {
                'no-data': isEmptyArray(listing),
            })}
        >
            {renderTable()}
        </div>
    );
};

const TableHeader = (props: any) => {
    const { finalColumns, hasRowAction } = props || {};
    return (
        <div className='table-header-group'>
            <div className='table-row'>
                <div className='table-cell max-w-xs'>
                    <div>#</div>
                </div>
                {!isEmptyArray(finalColumns) &&
                    finalColumns
                        .filter((column) => !column.hide)
                        .map((column, colIndex) => {
                            return (
                                <TableColumns
                                    key={column.path + column.key + colIndex}
                                    selectedColumn={column}
                                    index={column.path}
                                    {...props}
                                />
                            );
                        })}
                {hasRowAction && (
                    <div className='table-cell w-max text-center table-action'>
                        <span>Actions</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const TableColumns = ({
    selectedColumn,
    reverse,
    sortKey,
    onSort,
    is_report,
    disableAdvancedFilter,
    tableType,
    filterColumn,
}: any) => {
    const sortTypes = [
        {
            id: 0,
            icon: 'fa-sort-numeric-asc',
            caption: 'Sort Asc',
            type: 'asc',
        },
        {
            id: 1,
            icon: 'fa-sort-numeric-desc',
            caption: 'Sort Desc',
            type: 'desc',
        },
    ];

    const conditionForSorting = useMemo(() => {
        if (is_report) {
            if (sortKey == selectedColumn.column_name) {
                return reverse ? 'fa-long-arrow-up' : 'fa-long-arrow-down';
            }
        }

        if (sortKey == selectedColumn.parent + '.' + selectedColumn.name) {
            return reverse ? 'fa-long-arrow-up' : 'fa-long-arrow-down';
        }

        return '';
    }, [reverse, sortKey]);

    const handleDBSorting = (sort) => {
        const urlParams = Navigation.search() as any;
        urlParams.order = is_report
            ? selectedColumn.column_name
            : `${selectedColumn.parent}.${selectedColumn.name}`;
        urlParams.sort = sort.type;

        Navigation.search(urlParams);
        // CloseAllPoppers();
    };

    return (
        <div className='table-cell'>
            <div className='flex'>
                {/* Column Title */}
                <div className='flex-1 column-title'>
                    <a
                        className='cursor-pointer'
                        onClick={() => onSort(selectedColumn)}
                    >
                        <span className='printable'>
                            {selectedColumn.display_name}
                        </span>{' '}
                        &nbsp;
                        <i className={`fa ${conditionForSorting}`} />
                    </a>
                </div>
                {/* Column Title Ends */}

                {/* Filter Column */}
                {!disableAdvancedFilter &&
                ((tableType == 'listing' &&
                    selectedColumn &&
                    selectedColumn.path &&
                    selectedColumn.path.split('.').length < 3) ||
                    is_report) ? (
                    <div className='pl-2 cursor-pointer filter-column'>
                        <a onClick={() => filterColumn(selectedColumn)}>
                            <i className='fa fa-filter' />
                        </a>
                    </div>
                ) : null}
                {/* Filter Ends */}

                {/* DB Level */}
                {(!disableAdvancedFilter &&
                    selectedColumn &&
                    selectedColumn.path.split('.').length == 2 &&
                    selectedColumn.type_id) ||
                is_report
                    ? tableType == 'listing' && (
                          <div className='pl-2 db-level-sort'>
                              <DropdownMenu
                              //   element={
                              //       <RenderDBTableSorting
                              //           sortTypes={sortTypes}
                              //           onSortClick={handleDBSorting}
                              //       />
                              //   }
                              //   placement='bottom-start'
                              //   arrow={false}
                              >
                                  <DropdownMenuTrigger asChild>
                                      <a className='cursor-pointer text-neutral-content'>
                                          <i className='fa fa-sort-amount-asc' />
                                      </a>
                                  </DropdownMenuTrigger>
                                  <RenderDBTableSorting
                                      sortTypes={sortTypes}
                                      onSortClick={handleDBSorting}
                                  />
                              </DropdownMenu>
                          </div>
                      )
                    : null}
            </div>
        </div>
    );
};

const RenderDBTableSorting = ({ sortTypes, onSortClick }: any) => {
    return (
        <DropdownMenuContent>
            {sortTypes.map((sort) => (
                <DropdownMenuItem
                    key={sort.type}
                    className='gap-2'
                    onClick={() => onSortClick(sort)}
                >
                    <i className={`fa ${sort.icon}`} /> {sort.caption}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    );
};

const TableRows = (props: any) => {
    const {
        listingRow,
        genericData,
        rowOptions = [],
        finalColumns,
        rowTemplate,
        currentPage,
        limit,
        rowKey,
        callback,
        is_report,
        uiActions,
    } = props;

    const rightClickKey = `${genericData.starter}-${
        listingRow[genericData.starter + '.id']
    }`;

    const rightClickOptions = useMemo(() => {
        if (isEmptyArray(genericData.nextActions)) return rowOptions;

        const actions = [...rowOptions];

        genericData.nextActions.forEach((action) => {
            if (!action.as_context || !action.active) return;
            actions.push(action);
        });

        return actions;
    }, [genericData, rowOptions]);

    const renderRowData = (selectedColumn) => {
        if (rowTemplate) {
            return rowTemplate({
                listingRow,
                selectedColumn,
                modelHash: genericData.modelHash,
                name: genericData.model.name,
                identifier: genericData.starter,
                rowKey,
                callback,
            });
        }

        if (!is_report) {
            return RowTemplate({
                listingRow,
                selectedColumn,
                modelHash: genericData.modelHash,
                name: genericData.model.name,
                identifier: genericData.starter,
                rowKey,
                url: genericData.url,
                callback: callback,
            });
        }

        return ReportTemplate({ listingRow, selectedColumn });
    };

    return (
        <>
            <div className='table-row'>
                <TableIndex {...{ listingRow, limit, rowKey, currentPage }} />

                {finalColumns
                    .filter((column) => !column.hide)
                    .map((column, key) => {
                        return (
                            <div className='table-cell' key={key}>
                                {renderRowData(column)}
                            </div>
                        );

                        // TO-DO: Enable right click on table
                        return (
                            <RightClick
                                {...props}
                                className='table-cell'
                                key={rightClickKey + key}
                                id={rightClickKey + key}
                                rowOptions={rightClickOptions}
                                selectedColumn={column}
                            >
                                {renderRowData(column)}
                            </RightClick>
                        );
                    })}
                <TableRowAction {...props} />
            </div>
        </>
    );
};

const TableIndex = ({ currentPage, limit, rowKey }: any) => {
    return (
        <div className='table-cell'>
            <span className='number printable'>
                {(currentPage - 1) * limit + rowKey + 1}
            </span>
        </div>
    );
};
const TableRowAction = ({ uiActions, ...props }: any) => {
    return (
        <div className='table-cell w-1 table-action'>
            <CustomAction
                actions={uiActions}
                {...props}
                placement='as_dropdown'
            />
        </div>
    );
};

export default PortletTable;
