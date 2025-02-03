// Importing necessary dependencies and utility functions
'use client';

import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import {
    AccessNestedObject,
    EmptyFunction,
    FormatCurrencyAcc,
    IsArray,
    ObjectDto,
    useApp,
} from '@finnoto/core';

import {
    cn,
    GetObjectFromArray,
    IsEmptyArray,
    IsEmptyObject,
    IsFunction,
    IsNumber,
} from '../../../Utils/common.ui.utils';
import { FormatCurrencyStyled } from '../../../Utils/component.utils';
import { DropdownMenu } from '../../Inputs/DropdownMenu/dropdownMenu.component';
import { IconButton } from '../../Inputs/Icon-Button/iconButton.component';
import { RightClick } from '../../Inputs/RightClick/rightClick.component';
import { ArcPagination } from '../../Navigation/Pagination/arc.pagination.component';
import { Pagination } from '../../Navigation/Pagination/pagination.component';
import { Ellipsis } from '../Ellipsis/ellipsis.component';
import { Icon } from '../Icon/icon.component';
import { NoDataFound } from '../NoDataFound/noDataFound.component';
import { Tooltip } from '../Tooltip/Tooltip.component';
import TableLoader from './Loaders/tableLoader';
import {
    TableCell,
    TableContainer,
    TableFooter,
    TableHeadGroup,
    TableRow,
    TableWrapper,
} from './table.core';
import {
    TableAppearanceTypes,
    TablemenuActionProps,
    TableProps,
    TableSizesTypes,
} from './table.types';
import {
    handleSeletedColumnHeader,
    handleSeletedColumnRow,
    handleTableColumn,
    handleTableItemDisplay,
} from './table.utils';
import { useTable } from './useTable.hook';

import { ArcMoreVerticalSvgIcon, MoreIcon } from 'assets';

/**
 *
 * @description Basic Table, feature include multi select, sorting, pagination, individual row action
 *
 * @returns Table
 * @author Saurav Nepal
 */
export const Table = ({
    column,
    data,
    preferences = {},
    pagination: propsPagination = {},
    sorting: propsSorting = {},
    rowAction = {},
    contextActions = [],
    rowNumbering = true,
    select = {},
    handleStatus = EmptyFunction,
    noDataFound,
    loading,
    isHideSummary = true,
    footer,
    customHeader,
    showHover = true,
    selectedList,
    ...props
}: TableProps) => {
    // Destructure props
    const {
        display: selectedDisplay = false,
        handleSelectedData = () => {},
        initialSelectAll,
        disabled: selectedDisabled = false,
        disableSelectAll = false,
        type = 'check',
        defaultSelectedList,
    } = select;

    const {
        appreance = 'neutral',
        size = 'sm',
        roundedCorners = true,
        bordered = true,
        fullHeight = true,
        stickyHeader = false,
        stickyRowAction = false,
    } = preferences;

    const {
        display: paginationDisplay = true,
        pagination,
        containerClass: paginationContainerClass,
        onPaginationChange,
        onlyShowPrevNext,
        showEntries,
        totalRecords,
    } = propsPagination;

    const { separateCustomFooterRow = false } = footer || {};

    const { sorting, onSortingChange = () => {} } = propsSorting || {};

    const { display: rowActionDisplay = true, menuActions } = rowAction;

    const [hoverIndex, setHoverIndex] = useState<undefined | number>();

    // Custom hook for managing table state and behavior
    const {
        sanitizedTableColumn,
        sanitizedTableData,
        selectedRows,
        handleSelectDeselectAll,
        pushSelected,
        removeSelected,
        handleColumnSort,
    } = useTable({
        column,
        data,
        initialSelectAll,
        defaultSelectedList,
    });

    const { isArc: isArcPortal } = useApp();

    // Define sorting filter options for table columns
    const tableSortingFilter = [
        {
            action: (value, col) => handleColumnSort(value, col),
            name: 'Ascending',
            key: 'asc',
            icon: <ArrowUpNarrowWide size={14} />,
        },
        {
            name: 'Descending',
            key: 'desc',
            icon: <ArrowDownWideNarrow size={14} />,
            action: (value, col) => handleColumnSort(value, col),
        },
    ];

    // Filter the menuActions into innerMenuAction and outerMenuAction
    const getInnerMenuAction = useCallback(
        (item?: ObjectDto) => {
            let action = [];

            if (IsFunction(menuActions)) action = menuActions(item);
            if (!IsFunction(menuActions)) action = menuActions;

            return action?.filter((val) => val?.type !== 'outer');
        },
        [menuActions]
    );

    const getOuterMenuAction = useCallback(
        (item?: ObjectDto) => {
            let action = [];

            if (IsFunction(menuActions)) action = menuActions(item);
            if (!IsFunction(menuActions)) action = menuActions;

            return action?.filter((val) => val?.type === 'outer');
        },
        [menuActions]
    );

    const isRowActionVisible = useMemo(() => {
        if (!rowActionDisplay) {
            return false;
        }
        if (IsFunction(menuActions)) return true;

        const innerMenuVisibility = getInnerMenuAction()?.filter(
            (val) => val?.visible !== false
        );
        const outerMenuVisibility = getOuterMenuAction()?.filter(
            (val) => val?.visible !== false
        );
        if (
            IsEmptyArray(innerMenuVisibility) &&
            IsEmptyArray(outerMenuVisibility)
        ) {
            return false;
        }
        return true;
    }, [getInnerMenuAction, getOuterMenuAction, menuActions, rowActionDisplay]);

    // Update selected rows data when it changes
    useUpdateEffect(() => {
        handleSelectedData(selectedRows);
    }, [selectedRows]);

    const totalColumn = useMemo(() => {
        let col = sanitizedTableColumn.length + 1;

        if (rowNumbering) {
            col++;
        }
        if (isRowActionVisible) {
            col++;
        }

        return col;
    }, [isRowActionVisible, rowNumbering, sanitizedTableColumn]);

    const renderFooterColumn = useCallback(
        (column) => {
            const { data } = footer;
            const col = data?.find((d) => d.key === column?.key);
            if (!col) return <EmptyCell />;
            return (
                <TableCell
                    key={column?.key}
                    className={cn('!border-l-0 text-end px-2', col?.className)}
                >
                    {col.renderValue()}
                </TableCell>
            );
        },
        [footer]
    );

    const renderFooter = useCallback(() => {
        if (!footer || (!footer?.customFooter && !footer?.data)) return null;

        if (footer?.customFooter && !separateCustomFooterRow)
            return (
                <TableRow
                    className={cn(
                        'bg-base-200 border-b  table-footer',
                        footer?.className
                    )}
                >
                    {footer?.customFooter}
                </TableRow>
            );

        const sliceIndex = (() => {
            if (rowNumbering || select.display) return 0;
            return 1;
        })();

        return (
            <>
                <TableRow
                    className={cn(
                        'bg-base-200 border-b  table-footer',
                        footer?.className
                    )}
                >
                    <TableCell className='!py-2.5 !px-2'>
                        <span className='flex gap-4 items-center font-bold w-fit'>
                            {footer?.leftComponent}
                        </span>
                    </TableCell>
                    {sanitizedTableColumn
                        .slice(sliceIndex)
                        .map((column) => renderFooterColumn(column))}
                </TableRow>
                {footer?.customFooter && footer?.separateCustomFooterRow && (
                    <TableRow
                        className={cn(
                            'bg-base-200 border-b  table-footer',
                            footer?.className
                        )}
                    >
                        {footer?.customFooter}
                    </TableRow>
                )}
            </>
        );
    }, [
        footer,
        renderFooterColumn,
        rowNumbering,
        sanitizedTableColumn,
        select.display,
        separateCustomFooterRow,
    ]);

    const renderTableData = useCallback(() => {
        if (loading)
            return (
                <td className='p-0 m-0' colSpan={totalColumn}>
                    <TableLoader rows={6} />
                </td>
            );
        if (IsEmptyArray(sanitizedTableData))
            return (
                <td colSpan={totalColumn} className='w-full h-full'>
                    {noDataFound?.customNoData || (
                        <NoDataFound
                            size='lg'
                            title='No records'
                            description='There are no records available.'
                            className='mx-auto'
                            {...noDataFound}
                        />
                    )}
                </td>
            );

        return sanitizedTableData?.map((item, index) => {
            const serialNumber =
                index +
                1 +
                (pagination?.limit || 0) * ((pagination?.page || 1) - 1); // calculate serial number according to pagination

            const rowClassName =
                IsFunction(props?.rowClassName) && props?.rowClassName(item);

            return (
                <TableRow
                    onMouseEnter={() => {
                        if (!selectedDisplay) return;
                        setHoverIndex(index);
                    }}
                    onMouseLeave={() => {
                        if (!selectedDisplay) return;
                        setHoverIndex(undefined);
                    }}
                    key={serialNumber}
                    className={cn('body-row group', rowClassName)}
                >
                    {/* Render the selected column row */}
                    {handleSeletedColumnRow({
                        isSelectEnable: selectedDisplay,
                        isDisabled: IsFunction(selectedDisabled)
                            ? selectedDisabled(item)
                            : selectedDisabled,
                        rowNumbering: rowNumbering ? serialNumber : false,
                        onSnOpen: () => props.openSnModal?.(item),
                        showTooltip: props?.showToltip,
                        isOneSeleted: !IsEmptyArray(selectedRows),
                        hasHovered: hoverIndex === index,
                        type: select?.type,
                        checked: !!GetObjectFromArray(
                            selectedRows,
                            'id',
                            item?.id
                        ),
                        onEdit: select?.onEdit?.bind(null, item),
                        onDelete: select?.onDelete?.bind(null, item),
                        onClickToCheckBox: (state) => {
                            // handle radio selection
                            if (select.type === 'radio') {
                                // initially its empty

                                if (!IsEmptyArray(selectedRows)) {
                                    // on select, max 1 item is in array, so remove first index
                                    removeSelected(0);
                                }

                                // push item to empty array
                                pushSelected(item);
                            }

                            // handle checkbox selection
                            else {
                                if (state) {
                                    pushSelected(item);
                                    return;
                                }
                                removeSelected(
                                    selectedRows.findIndex(
                                        (row) => row?.id === item?.id
                                    )
                                );
                            }
                        },
                    })}

                    {/* Render the table cells */}
                    {sanitizedTableColumn?.map((col, colIndex) => {
                        if (
                            !IsEmptyArray(contextActions) &&
                            !col?.disableRightClick
                        ) {
                            return (
                                <RightClick
                                    key={colIndex + col.key}
                                    rowOptions={contextActions}
                                    column={col}
                                    rowData={item}
                                    rowIndex={index}
                                >
                                    <TableCell
                                        className={cn(
                                            'align-middle',
                                            IsFunction(col.className)
                                                ? col?.className(item)
                                                : col?.className
                                        )}
                                        key={col?.key}
                                    >
                                        {handleTableItemDisplay(
                                            item,
                                            col,
                                            handleStatus,
                                            colIndex,
                                            index,
                                            isArcPortal
                                        )}
                                    </TableCell>
                                </RightClick>
                            );
                        }
                        return (
                            <TableCell
                                className={cn(
                                    'align-middle',
                                    IsFunction(col.className)
                                        ? col?.className(item)
                                        : col?.className
                                )}
                                key={col?.key}
                                style={{
                                    backgroundColor: col?.hex?.bg,
                                    color: col?.hex?.text,
                                }}
                            >
                                {handleTableItemDisplay(
                                    item,
                                    col,
                                    handleStatus,
                                    colIndex,
                                    index,
                                    isArcPortal
                                )}
                            </TableCell>
                        );
                    })}

                    {/* Render the row action column */}
                    {isRowActionVisible && (
                        <TableCell
                            className={cn('w-0', {
                                'sticky right-0 bg-inherit group-hover:bg-base-200 bg-base-100':
                                    stickyRowAction,
                            })}
                        >
                            <div
                                className={cn(
                                    'flex gap-4 justify-center items-center'
                                )}
                            >
                                {/* Render outerMenuActions */}
                                {getOuterMenuAction(item)?.map((val, index) => (
                                    <RenderInitailAction
                                        key={index}
                                        outerRowAction={val}
                                        item={item}
                                    />
                                ))}

                                {/* Render innerMenuActions */}

                                {!IsEmptyArray(getInnerMenuAction(item)) && (
                                    <DropdownMenu
                                        align='end'
                                        hideOnNoAction
                                        actions={
                                            getInnerMenuAction(item) as any
                                        }
                                        params={item}
                                    >
                                        <IconButton
                                            icon={
                                                isArcPortal
                                                    ? ArcMoreVerticalSvgIcon
                                                    : MoreIcon
                                            }
                                            noHover
                                            size='xs'
                                            iconClass={cn({
                                                'rotate-90': !isArcPortal,
                                            })}
                                            appearance={
                                                isArcPortal
                                                    ? 'polaris-tertiary'
                                                    : 'primary_light'
                                            }
                                            className={cn({
                                                'bg-transparent': isArcPortal,
                                            })}
                                        />
                                    </DropdownMenu>
                                )}
                            </div>
                        </TableCell>
                    )}
                </TableRow>
            );
        });
    }, [
        loading,
        totalColumn,
        sanitizedTableData,
        noDataFound,
        pagination?.limit,
        pagination?.page,
        selectedDisplay,
        selectedDisabled,
        rowNumbering,
        props,
        selectedRows,
        hoverIndex,
        select?.type,
        select?.onEdit,
        select?.onDelete,
        sanitizedTableColumn,
        isRowActionVisible,
        stickyRowAction,
        getOuterMenuAction,
        getInnerMenuAction,
        isArcPortal,
        removeSelected,
        pushSelected,
        contextActions,
        handleStatus,
    ]);
    const renderColumnwithEllipsis = (data, col: any) => {
        if (!col?.ellipse) return data || '-';
        if (typeof col?.ellipse === 'number') {
            return (
                <Ellipsis width={col?.ellipse} withShowMore>
                    {data || '-'}
                </Ellipsis>
            );
        }
        if (typeof col?.ellipse === 'boolean') {
            return (
                <Ellipsis width={170} withShowMore>
                    {data || '-'}
                </Ellipsis>
            );
        }
    };
    const summaryOfColumns = useMemo(() => {
        return sanitizedTableColumn.map((column: ObjectDto) => {
            if (!['currency', 'currency_acc'].includes(column.type))
                return {
                    ...column,
                    isHide: true,
                };
            const value: number = getTotalAmount(data, column?.key);
            if (column?.type === 'currency_acc') {
                return {
                    ...column,
                    value: (
                        <span className='flex justify-end w-full font-medium text-base-secondary'>
                            {renderColumnwithEllipsis(
                                FormatCurrencyAcc(value),
                                column
                            )}
                        </span>
                    ),
                };
            }
            return {
                ...column,
                value: FormatCurrencyStyled({
                    amount: value || 0,
                    noDecimal: false,
                    size: 'sm',
                    className: 'text-end text-base-primary',
                    textType: 'primary',
                }),
                name: `${column?.name}`,
            };
        });
    }, [data, sanitizedTableColumn]);
    const isVisibleSummary = useMemo(() => {
        if (!data?.length) return;
        return (
            !isHideSummary &&
            summaryOfColumns?.filter((col: ObjectDto) => !col?.isHide)?.length >
                0
        );
    }, [data?.length, isHideSummary, summaryOfColumns]);

    // Render the table component
    return (
        <TableContainer
            className={cn(
                'finnoto__table',
                {
                    'overflow-auto max-h-[calc(100vh-var(--main-header-height)-30px)]':
                        stickyHeader,
                },
                {
                    'table-fullheight': fullHeight,
                    'rounded-corners': roundedCorners,
                }
            )}
        >
            <div className='overflow-x-auto flex-1 bg-base-100 finnoto__table__wrapper'>
                <TableWrapper
                    className={cn(
                        'finnoto__table__container',
                        TableAppearanceTypes[appreance],
                        TableSizesTypes[size],
                        {
                            'table-bordered': bordered,
                            'h-full': IsEmptyArray(sanitizedTableData),
                        }
                    )}
                >
                    {/* Render table header */}
                    <TableHeadGroup
                        className={cn({
                            'sticky top-0 z-20': stickyHeader,
                        })}
                    >
                        {customHeader || (
                            <TableRow>
                                {/* Render the selected column header */}
                                {handleSeletedColumnHeader(
                                    selectedDisplay,
                                    IsNumber(hoverIndex),
                                    rowNumbering,
                                    !IsEmptyArray(selectedRows),
                                    handleSelectDeselectAll,
                                    data?.length === selectedRows?.length,
                                    disableSelectAll,
                                    IsFunction(select?.onDelete)
                                        ? 'w-[80px]'
                                        : '',
                                    type
                                )}
                                {/* Render the column headers */}
                                {sanitizedTableColumn?.map((val) => {
                                    return (
                                        <TableCell
                                            className={cn(
                                                `${val?.className} ${val?.headerClassName} border border-r-0 border-base-300`,
                                                {
                                                    'text-end': [
                                                        'currency',
                                                        'currency_acc',
                                                    ].includes(val?.type),
                                                }
                                            )}
                                            key={val?.key}
                                        >
                                            {handleTableColumn(
                                                val,
                                                sorting?.column === val?.key,
                                                sorting?.order,
                                                onSortingChange
                                                // clearSortedData
                                            )}
                                        </TableCell>
                                    );
                                })}
                                {/* Render the row action column header */}
                                {isRowActionVisible && (
                                    <TableCell
                                        className={cn(
                                            'text-center !text-white border border-x-0',
                                            {
                                                'sticky right-0 finnoto__table--stickyaction':
                                                    stickyRowAction,
                                            }
                                        )}
                                    >
                                        {!isArcPortal && 'Action'}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableHeadGroup>

                    {renderTableData()}
                    {isVisibleSummary && (
                        <TableRow className='sticky bottom-0'>
                            <TableCell className='pl-2 bg-base-100'>
                                <span className='font-medium text-base-primary'>
                                    Total Amount
                                </span>
                            </TableCell>
                            {summaryOfColumns.map(
                                (column: ObjectDto, index: number) => {
                                    const hideBorder =
                                        !(summaryOfColumns[index - 1] as any)
                                            ?.value && !column?.value;

                                    return (
                                        <TableCell
                                            className={cn(
                                                'p-2 font-medium text-right bg-base-100',
                                                {
                                                    '!border-l-0': hideBorder,
                                                }
                                            )}
                                            key={column?.key}
                                        >
                                            {column?.value || ''}
                                        </TableCell>
                                    );
                                }
                            )}
                            {isRowActionVisible && (
                                <TableCell className=''>{''}</TableCell>
                            )}
                        </TableRow>
                    )}
                    {renderFooter()}

                    {/* Render an empty row for full height */}
                    {fullHeight && (
                        <TableRow className='w-full h-full bg-base-100'>
                            <React.Fragment></React.Fragment>
                        </TableRow>
                    )}
                </TableWrapper>
            </div>

            {/* Render table footer with pagination */}
            {paginationDisplay && (
                <TableFooter>
                    {!isArcPortal ? (
                        <Pagination
                            {...{
                                pagination,
                                containerClass: paginationContainerClass,
                                onPaginationChange,
                                showEntries,
                                totalRecords: totalRecords || pagination?.total,
                                onlyShowPrevNext,
                            }}
                        />
                    ) : (
                        <ArcPagination
                            {...{
                                pagination,
                                containerClass: paginationContainerClass,
                                onPaginationChange,
                                showEntries,
                                totalRecords: totalRecords || pagination?.total,
                                onlyShowPrevNext,
                            }}
                        />
                    )}
                </TableFooter>
            )}
        </TableContainer>
    );
};

/**
 * Render an initial action component
 * @param outerRowAction - The outer row action object
 * @param item - The data item
 */
const RenderInitailAction = memo(
    ({
        outerRowAction,
        item,
    }: {
        outerRowAction: TablemenuActionProps;
        item: ObjectDto;
    }) => {
        // If the outer row action object is empty or does not have an icon, return an empty fragment
        if (!outerRowAction?.icon || IsEmptyObject(outerRowAction))
            return <></>;

        let visible: any = outerRowAction?.visible;
        let tooltipName: any = outerRowAction?.tooltipName;
        tooltipName = IsFunction(tooltipName) ? tooltipName(item) : tooltipName;

        // If the action is not visible, return an empty fragment
        if (visible === false) return <></>;

        // If the visible property is a function, evaluate it with the item as an argument
        if (IsFunction(visible)) {
            visible = visible(item);

            // If the visible function returns false, return an empty fragment
            if (visible === false) return <></>;
        }

        let icon = outerRowAction?.icon;

        // If a custom renderIcon function is provided, use it to render the icon
        if (outerRowAction?.renderIcon) {
            icon = outerRowAction.renderIcon(item);
        }

        let color = outerRowAction?.color;
        let action = outerRowAction?.action;

        // If the color property is a function, evaluate it with the item as an argument
        if (IsFunction(outerRowAction?.color)) {
            color = outerRowAction.color(item);
        }

        // Render the IconButton component with the icon, color, and action
        const IconButton = () => (
            <Icon
                className='transition-all cursor-pointer text-base-secondary hover:text-primary'
                source={icon}
                isSvg
                size={outerRowAction?.size || 20}
                iconClass={color || ''}
                onClick={() => action(item)}
            />
        );
        if (IsFunction(outerRowAction?.renderValue))
            return <> {outerRowAction?.renderValue(item)}</>;

        // If tooltipName is provided, wrap the IconButton component with a Tooltip component
        if (!tooltipName && !outerRowAction?.name) return <IconButton />;

        return (
            <Tooltip
                asChild={false}
                message={tooltipName || outerRowAction?.name || ''}
            >
                <IconButton />
            </Tooltip>
        );
    }
);

const getTotalAmount = (data: ObjectDto[], key: string): number => {
    try {
        if (!IsArray(data)) return 0;
        return data?.reduce((acc, next: ObjectDto) => {
            acc += AccessNestedObject(next, key) || 0;
            return acc;
        }, 0) as number;
    } catch (error) {
        return 0;
    }
};
const EmptyCell = () => (
    <TableCell className='!border-l-0'>
        <span></span>
    </TableCell>
);
