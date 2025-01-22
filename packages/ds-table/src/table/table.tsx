import React, { memo, useCallback, useMemo, useState } from 'react';

import { DropdownAction, Tooltip } from '@slabs/ds-core';
import { useUpdateEffect } from '@slabs/ds-hooks';
import {
    accessNestedObject,
    cn,
    getObjectFromArrayByValue,
    isArray,
    isEmptyArray,
    isEmptyObject,
    isFunction,
    isUndefined,
    ObjectDto,
} from '@slabs/ds-utils';

import { Icon } from '../icon/icon.component';
import { Pagination } from '../pagination/pagination.component';
import { RightClick } from '../right-click/right-click.component';
import { FormatCurrencyStyled } from '../utils';
import { TableLoader } from './table-loader';
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
import { useTable } from './use-table.hook';

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
    handleStatus = () => {},
    loading,
    isHideSummary = true,
    footer,
    customHeader,
    disableContextActions = false,
    ...props
}: TableProps) => {
    const {
        display: shouldDisplaySelect = false,
        handleSelectedData = () => {},
        isInitialSelectAll,
        disabled: selectedDisabled = false,
        isSelectAllDisabled = false,
        type = 'check',
        defaultSelectedList,
    } = select;

    const {
        appearance = 'neutral',
        size = 'sm',
        hasRoundedCorners = true,
        isBordered = true,
        isFullHeight = true,
        isStickyHeader = false,
        isStickyRowAction = false,
    } = preferences;

    const {
        display: hasPagination = true,
        pagination,
        containerClass: paginationContainerClass,
        onPaginationChange,
        onlyShowPrevNext: shouldShowPrevNext,
        showEntries: shouldShowEntries,
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
    } = useTable({
        column,
        data,
        isInitialSelectAll,
        defaultSelectedList,
    });

    // Filter the menuActions into innerMenuAction and outerMenuAction
    const getInnerMenuAction = useCallback(
        (item?: ObjectDto) => {
            let action: TablemenuActionProps[] = [];

            if (isFunction(menuActions)) action = menuActions(item ?? {});
            if (!isFunction(menuActions)) action = menuActions ?? [];

            return action?.filter((val) => val?.type !== 'outer');
        },
        [menuActions]
    );

    const getOuterMenuAction = useCallback(
        (item?: ObjectDto) => {
            let action: TablemenuActionProps[] = [];

            if (isFunction(menuActions)) action = menuActions(item ?? {});
            if (!isFunction(menuActions)) action = menuActions ?? [];

            return action?.filter((val) => val?.type === 'outer');
        },
        [menuActions]
    );

    const isRowActionVisible = useMemo(() => {
        if (!rowActionDisplay) {
            return false;
        }
        if (isFunction(menuActions)) return true;

        const innerMenuVisibility = getInnerMenuAction()?.filter(
            (val) => val?.visible !== false
        );
        const outerMenuVisibility = getOuterMenuAction()?.filter(
            (val) => val?.visible !== false
        );
        if (
            isEmptyArray(innerMenuVisibility) &&
            isEmptyArray(outerMenuVisibility)
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
        (column: ObjectDto) => {
            const { data } = footer || {};
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
                        <span className='flex items-center gap-4 font-bold w-fit'>
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
        if (isEmptyArray(sanitizedTableData))
            return (
                <td colSpan={totalColumn} className='w-full h-full '>
                    <p>No Records</p>
                </td>
            );

        return sanitizedTableData?.map((item, index) => {
            const serialNumber =
                index +
                1 +
                (pagination?.limit || 0) * ((pagination?.page || 1) - 1); // calculate serial number according to pagination

            const rowClassName =
                isFunction(props?.rowClassName) && props?.rowClassName(item);

            return (
                <TableRow
                    onMouseEnter={() => {
                        if (!shouldDisplaySelect) return;
                        setHoverIndex(index);
                    }}
                    onMouseLeave={() => {
                        if (!shouldDisplaySelect) return;
                        setHoverIndex(undefined);
                    }}
                    key={serialNumber}
                    className={cn('body-row group', rowClassName)}
                >
                    {/* Render the selected column row */}
                    {handleSeletedColumnRow({
                        isSelectEnable: shouldDisplaySelect,
                        isDisabled: isFunction(selectedDisabled)
                            ? selectedDisabled(item)
                            : selectedDisabled,
                        rowNumbering: rowNumbering ? serialNumber : false,
                        onSnOpen: () => props.openSnModal?.(item),
                        showTooltip: props?.showToltip,
                        isOneSeleted: !isEmptyArray(selectedRows),
                        hasHovered: hoverIndex === index,
                        type: select?.type,
                        checked: !!getObjectFromArrayByValue(
                            selectedRows,
                            'id',
                            item?.id
                        ),
                        onEdit: select?.onEdit?.bind(null, item),
                        onDelete: select?.onDelete?.bind(null, item),
                        onClickToCheckBox: (state: boolean) => {
                            // handle radio selection
                            if (select.type === 'radio') {
                                // initially its empty

                                if (!isEmptyArray(selectedRows)) {
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
                                        (row: ObjectDto) => row?.id === item?.id
                                    )
                                );
                            }
                        },
                    })}

                    {/* Render the table cells */}
                    {sanitizedTableColumn?.map((col, colIndex) => {
                        if (
                            !isEmptyArray(contextActions) &&
                            !disableContextActions &&
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
                                            isFunction(col.className)
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
                                            index
                                        )}
                                    </TableCell>
                                </RightClick>
                            );
                        }
                        return (
                            <TableCell
                                className={cn(
                                    'align-middle',
                                    isFunction(col.className)
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
                                    index
                                )}
                            </TableCell>
                        );
                    })}

                    {/* Render the row action column */}
                    {isRowActionVisible && (
                        <TableCell
                            className={cn('w-0', {
                                'sticky right-0 bg-inherit group-hover:bg-base-200 bg-base-100':
                                    isStickyRowAction,
                            })}
                        >
                            <div
                                className={cn(
                                    'flex items-center gap-4 justify-center'
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

                                {!isEmptyArray(getInnerMenuAction(item)) && (
                                    <DropdownAction
                                        align='end'
                                        actions={
                                            getInnerMenuAction(item) as any
                                        }
                                    >
                                        Actions
                                    </DropdownAction>
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
        pagination?.limit,
        pagination?.page,
        props,
        shouldDisplaySelect,
        selectedDisabled,
        rowNumbering,
        selectedRows,
        hoverIndex,
        select.type,
        select?.onEdit,
        select?.onDelete,
        sanitizedTableColumn,
        isRowActionVisible,
        isStickyRowAction,
        getOuterMenuAction,
        getInnerMenuAction,
        pushSelected,
        removeSelected,
        contextActions,
        disableContextActions,
        handleStatus,
    ]);

    const summaryOfColumns = useMemo(() => {
        return sanitizedTableColumn.map((column: ObjectDto) => {
            if (!['currency', 'currency_acc'].includes(column.type))
                return {
                    ...column,
                    isHide: true,
                };
            const value: number = getTotalAmount(data, column?.key);

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

    const isSelectVisibleAll = useMemo(() => {
        if (!select?.display) return false;
        return isUndefined(select?.type) || select?.type === 'check';
    }, [select?.display, select?.type]);

    return (
        <TableContainer
            className={cn(
                'finnoto__table',
                {
                    'overflow-auto max-h-[calc(100vh-var(--main-header-height)-30px)]':
                        isStickyHeader,
                },
                {
                    'table-fullheight': isFullHeight,
                    'rounded-corners': hasRoundedCorners,
                }
            )}
        >
            <div
                className={cn(
                    'flex-1 overflow-x-auto bg-base-100 finnoto__table__wrapper'
                )}
            >
                <TableWrapper
                    className={cn(
                        'finnoto__table__container',
                        TableAppearanceTypes[appearance],
                        TableSizesTypes[size],
                        {
                            'table-bordered': isBordered,
                            'h-full': isEmptyArray(sanitizedTableData),
                        }
                    )}
                >
                    {/* Render table header */}
                    <TableHeadGroup
                        className={cn({
                            'sticky top-0 z-20': isStickyHeader,
                        })}
                    >
                        {customHeader || (
                            <TableRow>
                                {/* Render the selected column header */}
                                {handleSeletedColumnHeader(
                                    shouldDisplaySelect,
                                    !!hoverIndex,
                                    rowNumbering,
                                    !isEmptyArray(selectedRows) ||
                                        isSelectVisibleAll,
                                    handleSelectDeselectAll as any,
                                    data?.length === selectedRows?.length,
                                    isSelectAllDisabled,
                                    isFunction(select?.onDelete)
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
                                                    ].includes(val?.type ?? ''),
                                                }
                                            )}
                                            key={val?.key}
                                        >
                                            {handleTableColumn(
                                                val,
                                                sorting?.column === val?.key,
                                                sorting?.order as any,
                                                onSortingChange
                                            )}
                                        </TableCell>
                                    );
                                })}
                                {/* Render the row action column header */}
                                {isRowActionVisible && (
                                    <TableCell
                                        className={cn(
                                            'text-center border border-x-0',
                                            {
                                                'finnoto__table--stickyaction sticky right-0':
                                                    isStickyRowAction,
                                            }
                                        )}
                                    >
                                        Action
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableHeadGroup>

                    {renderTableData()}
                    {isVisibleSummary && (
                        <TableRow className='sticky bottom-0'>
                            <TableCell className={cn('pl-2 bg-base-100')}>
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
                    {isFullHeight && (
                        <TableRow className='w-full h-full bg-base-100'>
                            <React.Fragment></React.Fragment>
                        </TableRow>
                    )}
                </TableWrapper>
            </div>

            {/* Render table footer with pagination */}
            {hasPagination && (
                <TableFooter>
                    <Pagination
                        {...{
                            pagination,
                            containerClass: paginationContainerClass,
                            onPaginationChange,
                            showEntries: shouldShowEntries,
                            totalRecords: totalRecords || pagination?.total,
                            onlyShowPrevNext: shouldShowPrevNext,
                            selectedCount: selectedRows?.length,
                        }}
                    />
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
        if (!outerRowAction?.icon || isEmptyObject(outerRowAction))
            return <></>;

        let visible: any = outerRowAction?.visible;
        let tooltipName: any = outerRowAction?.tooltipName;
        tooltipName = isFunction(tooltipName) ? tooltipName(item) : tooltipName;

        // If the action is not visible, return an empty fragment
        if (visible === false) return <></>;

        // If the visible property is a function, evaluate it with the item as an argument
        if (isFunction(visible)) {
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
        if (isFunction(outerRowAction?.color)) {
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
        if (isFunction(outerRowAction?.renderValue))
            return <> {outerRowAction?.renderValue(item)}</>;

        // If tooltipName is provided, wrap the IconButton component with a Tooltip component
        if (!tooltipName && !outerRowAction?.name) return <IconButton />;

        return (
            <Tooltip message={tooltipName || outerRowAction?.name || ''}>
                <IconButton />
            </Tooltip>
        );
    }
);

const getTotalAmount = (data: ObjectDto[], key: string): number => {
    try {
        if (!isArray(data)) return 0;
        return data?.reduce((acc, next: ObjectDto) => {
            acc += accessNestedObject(next, key) || 0;
            return acc;
        }, 0);
    } catch (error) {
        return 0;
    }
};
const EmptyCell = () => (
    <TableCell className='!border-l-0'>
        <span></span>
    </TableCell>
);
