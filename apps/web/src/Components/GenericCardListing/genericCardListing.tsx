import { ArrowDropDownIcon } from '@Constants/imageMapping';
import {
    Ellipsis,
    FormatCurrency,
    FormatCurrencyAcc,
    FormatDisplayDate,
    GetDateValue,
    GetObjectProperty,
    IsEmptyArray,
    IsFunction,
    IsUndefined,
    IsUndefinedOrNull,
    ObjectDto,
    SortArrayObjectBy,
} from '@finnoto/core';
import {
    Button,
    DropdownMenu,
    DropdownMenuActionProps,
    Icon,
    IsNumber,
    NoDataFound,
    Pagination,
    TableColumn,
    TableProps,
} from '@finnoto/design-system';
import { MoreIcon } from 'assets';
import { format } from 'date-fns';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';

interface GenericCardListing extends TableProps {
    collapsComponent?: any;
    isCollapsable?: boolean;
    hideHeader?: boolean;
}

type TableSortByType = {
    key: string;
    order: 'asc' | 'desc';
    column: TableColumn;
};

type TableFunction<T> = (item: any, index: number) => T;

const GenericCardListing = ({
    data,
    column: columns,
    rowAction: { menuActions: rowActions },
    loading,
    rowNumbering = true,
    pagination: { pagination, onPaginationChange, display: showPagination },

    // hoverAction = false,
    preferences = {},
    select: { display = true, handleSelectedData: onRowSelectChange },
    isCollapsable = false,
    collapsComponent,
    hideHeader = false,
}: GenericCardListing) => {
    const [sortedData, setSortedData] = useState<any[]>(data || []);
    const [sortBy, setSortBy] = useState<TableSortByType | undefined>();

    const hasRowAction = useCallback(
        (item: any, index: number) => {
            if (!rowActions || IsEmptyArray(rowActions)) return false;
            if (IsFunction(rowActions)) return true;
            return rowActions.some((action) => {
                if (IsFunction(action.visible)) {
                    return action.visible(item, index);
                }

                return action.visible !== false;
            });
        },
        [rowActions]
    );

    const sortData = useCallback(
        (data: any[]) => {
            if (!sortBy || !data || IsEmptyArray(data) || data.length < 2)
                return data;

            return SortArrayObjectBy(
                data,
                sortBy.key,
                sortBy.order,
                ['date', 'date_time'].includes(sortBy.column.type || '')
            );
        },
        [sortBy]
    );

    const onSort = (column: TableColumn) => {
        if (!sortBy || sortBy.key !== column.key)
            return setSortBy({ key: column.key, order: 'asc', column });
        if (sortBy.order === 'asc')
            return setSortBy({ key: column.key, order: 'desc', column });
        return setSortBy(undefined);
    };

    useEffect(() => {
        setSortedData(sortData(data || []));
    }, [data, sortData]);

    const paginationData = useMemo(() => pagination, [pagination]);

    const handlePagination = (value: ObjectDto) => {
        onPaginationChange({ ...pagination, ...value });
    };

    return (
        <div className='table-wrapper new-table-wrapper'>
            <div
                className={`table w-full -mt-3  ${
                    !isCollapsable && ' border-spacing-y-3 border-separate'
                } `}
            >
                <div
                    className={`table-header-group sticky top-0  items-center  p-3 collapse-rounded-row bg-neutral ${
                        hideHeader && 'hidden'
                    }`}
                >
                    {columns.map((value, index) => (
                        <div
                            className='table-cell font-medium text-neutral-content'
                            key={index}
                        >
                            {value.name}
                        </div>
                    ))}
                    {!IsEmptyArray(rowActions) && (
                        <div className='table-cell'></div>
                    )}
                </div>

                {!loading && (
                    <ListingBody
                        {...{
                            data: sortedData,
                            columns,
                            rowActions: rowActions as DropdownMenuActionProps[],
                            hasRowAction,
                            sortBy,
                            rowNumbering,
                            pagination,

                            onRowSelectChange: onRowSelectChange,
                            collapsComponent,
                            isCollapsable,
                        }}
                    />
                )}
            </div>
            {!loading && IsEmptyArray(sortedData) && (
                <div className='items-center w-full h-full gap-2 py-6 rounded col-flex bg-base-100'>
                    <NoDataFound />
                </div>
            )}
            {showPagination && !IsEmptyArray(sortedData) && (
                <Pagination
                    pagination={paginationData}
                    containerClass={'!border-t-0 w-full'}
                    onPaginationChange={handlePagination}
                    showEntries={false}
                />
            )}
        </div>
    );
};

export default GenericCardListing;

const ListingBody = ({
    data = [],
    columns = [],
    rowActions,

    hoverAction,

    isCollapsable,
    collapsComponent,
}: {
    data: any[];
    columns: TableColumn[];
    rowActions?: DropdownMenuActionProps[];
    isCollapsable?: boolean;

    hoverAction?: boolean;

    collapsComponent?: any;
}) => {
    const withUrl = useCallback(
        (
            children: any,
            value: any,
            item: any,
            index: number,
            url?: string | TableFunction<string>,
            ellipsis?: number | boolean
        ) => {
            const truncateWidth = IsNumber(ellipsis) ? ellipsis : 250;

            if (!url || IsUndefined(value))
                return ellipsis ? (
                    <Ellipsis length={truncateWidth + 50} text={children} />
                ) : (
                    children
                );

            let path: string = '';

            if (typeof url === 'function') {
                path = url(item, index);
            } else {
                path = url;
            }

            return (
                <Link href={path}>
                    <a className='link link-hover'>
                        {ellipsis ? (
                            <Ellipsis text={children} length={truncateWidth} />
                        ) : (
                            children
                        )}
                    </a>
                </Link>
            );
        },
        []
    );

    const getColClassName = useCallback(
        (item: any, column: TableColumn, index: number) => {
            if (typeof column.className === 'function') {
                return column.className(item);
            }
            return column.className;
        },
        []
    );

    const getDisplayData = useCallback(
        (item: any, column: TableColumn, colIndex: number, index: number) => {
            if (column.visible === false) return null;

            const value = IsFunction(column.renderValue)
                ? (column as any).renderValue(item, index)
                : GetObjectProperty(item, column.key);

            if (column.type === 'number') {
                return (
                    <div
                        key={colIndex}
                        className={`text-right ${getColClassName(
                            item,
                            column,
                            index
                        )}`}
                    >
                        {withUrl(
                            (!IsUndefined(value) && value) || '-',
                            value,
                            item,
                            index,
                            column.url
                        )}
                    </div>
                );
            }

            if (column.type === 'currency') {
                const amount = FormatCurrency({ amount: value }).split('.');

                return (
                    <div
                        key={colIndex}
                        className={`text-right font-medium ${getColClassName(
                            item,
                            column,
                            index
                        )}`}
                    >
                        {amount[0]}
                        {amount[1] && (
                            <span className='text-xs text-base-secondary'>
                                .{amount[1]}
                            </span>
                        )}
                    </div>
                );
            }

            // if (column.type === 'currency_color') { @todo currency_color type remaining
            //     return (
            //         <div
            //             key={colIndex}
            //             className={`text-right ${getColClassName(
            //                 item,
            //                 column,
            //                 index
            //             )}`}
            //         >
            //             {withUrl(
            //                 FormatAmountColor(value || 0),
            //                 value,
            //                 item,
            //                 index,
            //                 column.url
            //             )}
            //         </div>
            //     );
            // }

            if (column.type === 'currency_acc') {
                return (
                    <div
                        key={colIndex}
                        className={`text-right ${getColClassName(
                            item,
                            column,
                            index
                        )}`}
                    >
                        {withUrl(
                            FormatCurrencyAcc(value || 0),
                            value,
                            item,
                            index,
                            column.url
                        )}
                    </div>
                );
            }

            if (column.type === 'date' || column.type === 'date_time') {
                const time = !IsUndefinedOrNull(value)
                    ? format(new Date(value), 'p')
                    : '';

                return (
                    <div
                        key={colIndex}
                        className={` text-sm ${getColClassName(
                            item,
                            column,
                            index
                        )}`}
                    >
                        {withUrl(
                            (!IsUndefined(value) &&
                                !isNaN(GetDateValue(value)) &&
                                FormatDisplayDate(value)) ||
                                '-',
                            value,
                            item,
                            index,
                            column.url
                        )}
                        <span className='ml-2 text-xs font-normal text-base-secondary'>
                            {time}
                        </span>
                    </div>
                );
            }

            if (column.type === 'boolean') {
                return (
                    <div
                        key={colIndex}
                        className={getColClassName(item, column, index)}
                    >
                        {withUrl(
                            value ? 'Yes' : 'No',
                            value,
                            item,
                            index,
                            column.url
                        )}
                    </div>
                );
            }

            let ellipse: any = column.ellipse !== false;
            if (ellipse && IsNumber(column.ellipse)) {
                ellipse = column.ellipse;
            }

            return (
                <div
                    key={colIndex}
                    className={getColClassName(item, column, index)}
                >
                    {withUrl(value, value, item, index, column.url, ellipse)}
                </div>
            );
        },
        [getColClassName, withUrl]
    );

    const [collapsShow, setCollapsShow] = useState(0);

    return (
        <div className='table-row-group overflow-y-auto collapse-table'>
            {!IsEmptyArray(data) &&
                data.map((item: any, index: number) => {
                    if (isCollapsable)
                        return (
                            <>
                                <CollapsableContainer
                                    item={item}
                                    columns={columns}
                                    key={index}
                                    getDisplayData={getDisplayData}
                                    index={index}
                                >
                                    <div className='rounded-lg text-primary max-w-[25px]'>
                                        <Icon
                                            onClick={() => {
                                                setCollapsShow(
                                                    index !== collapsShow
                                                        ? index
                                                        : null
                                                );
                                            }}
                                            iconClass={`flex justify-center items-center ${
                                                collapsShow === index
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                            className={` rounded-lg bg-primary/10 text-primary transition-all`}
                                            source={ArrowDropDownIcon}
                                            isSvg
                                            size={24}
                                        />
                                    </div>
                                </CollapsableContainer>
                                <td colSpan={data.length + 1} className={`p-0`}>
                                    <AnimateHeight
                                        height={
                                            collapsShow === index ? 'auto' : 0
                                        }
                                    >
                                        <div className='p-3 border-t bg-base-200 border-base-300'>
                                            {collapsComponent(item)}
                                        </div>
                                    </AnimateHeight>
                                </td>
                            </>
                        );
                    return (
                        <NormalRow
                            item={item}
                            columns={columns}
                            key={index}
                            getDisplayData={getDisplayData}
                            index={index}
                        >
                            {!IsEmptyArray(rowActions) && !hoverAction && (
                                <div className='table-cell '>
                                    <span className='relative items-center justify-center cursor-pointer row-flex'>
                                        <span className='items-center justify-center row-flex'>
                                            <DropdownMenu actions={rowActions}>
                                                <Button
                                                    size='xs'
                                                    appearance='ghost'
                                                    shape='square'
                                                    className='rounded bg-primary/10 text-primary'
                                                >
                                                    <Icon
                                                        iconClass={`flex justify-center items-center rotate-90`}
                                                        source={MoreIcon}
                                                        isSvg
                                                        size={24}
                                                    />
                                                </Button>
                                            </DropdownMenu>
                                        </span>
                                    </span>
                                </div>
                            )}
                        </NormalRow>
                    );
                })}
        </div>
    );
};
const NormalRow = ({ item, columns, getDisplayData, index, children }: any) => {
    return (
        <div className='items-center table-row px-4 py-2 transition-all border rounded-md cursor-pointer bg-base-100 hover:bg-base-200 hover:shadow-md collapse-rounded-row'>
            {columns.map((column: any, colIndex: number) => {
                return (
                    <div
                        className='items-center table-cell gap-4'
                        id={column.key}
                        key={colIndex + column.key}
                    >
                        {getDisplayData(item, column, colIndex, index)}
                    </div>
                );
            })}
            {children}
        </div>
    );
};

const CollapsableContainer = ({
    item,
    columns,
    getDisplayData,
    index,
    children,
}: any) => {
    return (
        <div className='items-center table-row px-4 py-2 cursor-pointer collapse-rounded-row '>
            {columns.map((column: any, colIndex: number) => {
                return (
                    <div
                        className='items-center table-cell'
                        id={column.key}
                        key={colIndex + column.key}
                    >
                        {getDisplayData(item, column, colIndex, index)}
                    </div>
                );
            })}
            <div className='table-cell'>{children}</div>
        </div>
    );
};
