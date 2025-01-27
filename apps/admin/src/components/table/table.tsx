'use client';

import { useMemo, useState } from 'react';
import { MoreHorizontalIcon } from 'lucide-react';

import { Button, DropdownAction } from '@slabs/ds-core';
import { DropdownMenuActionsProps } from '@slabs/ds-core/lib/components/dropdown-action/drop-down-action.types';
import { Pagination } from '@slabs/ds-table';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import { renderTableRowData } from './render.table.row.data';
import { TableLoader } from './table-loader';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './table.core';

const getRowNumberColumn = <TData, TValue>(): ColumnDef<TData, TValue> => ({
    id: 'index',
    header: 'S.N',
    cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return pageIndex * pageSize + row.index + 1;
    },
    size: 10,
    enableSorting: false,
});

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: { limit: number; page: number; total: number }; // Updated to handle pagination from API
    showRowNumbers?: boolean;
    rowActionProps: DropdownMenuActionsProps;
    isLoading?: boolean; // Added loading prop
    onPaginationChange: any;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onPaginationChange,
    pagination,
    showRowNumbers = true,
    rowActionProps,
    isLoading = false, // Destructure the new prop
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const finalColumns = useMemo(() => {
        if (!showRowNumbers) return columns;
        return [getRowNumberColumn<TData, TValue>(), ...columns];
    }, [columns, showRowNumbers]);

    const { ...table } = useReactTable({
        data,
        columns: finalColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className='min-h-[600px] border flex flex-col rounded overflow-hidden bg-white communication-table'>
            <div className='overflow-hidden flex-1 rounded-md'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className='font-semibold uppercase text-nowrap'
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                                <TableHead>ACTION</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className='bg-white'>
                        {isLoading ? (
                            // Skeleton loading effect
                            Array.from({ length: pagination.limit }).map(
                                (_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={columns.length + 2}>
                                            <TableLoader />
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {renderTableRowData(cell)}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell className='flex justify-center items-center w-full'>
                                        <DropdownAction
                                            {...rowActionProps}
                                            actions={rowActionProps.actions.map(
                                                (acc) => ({
                                                    ...acc,
                                                    action: () =>
                                                        acc.action?.(
                                                            row?.original
                                                        ),
                                                })
                                            )}
                                        >
                                            <Button
                                                variant={'outline'}
                                                size={'xs'}
                                            >
                                                <MoreHorizontalIcon />
                                            </Button>
                                        </DropdownAction>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 20}
                                    className='w-full h-[400px] text-center !border-b-0'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                containerClass='w-full'
                showEntries
                onPaginationChange={onPaginationChange}
                pagination={pagination}
                totalRecords={pagination?.total}
            />
        </div>
    );
}
