import { useMemo } from 'react';

import { FormatCurrency, IsEmptyArray, ObjectDto } from '@finnoto/core';
import {
    cn,
    DebugConfigurationButton,
    FormatCurrencyStyled,
} from '@finnoto/design-system';
import {
    TableCell,
    TableFooterGroup,
    TableHeadGroup,
    TableRow,
    TableRowGroup,
    TableWrapper,
} from '@finnoto/design-system/src/Components/Data-display/Table/table.core';

interface DashboardTableProps {
    columns: {
        name: string;
        key: string | number;
    }[];
    rows: { name: string; key: string | number }[];
    fn: (rowKey: string | number, columnKey: string | number) => ObjectDto;
    onClickToCell?: (__: any, _: any) => void;
    slug?: string;
    refetch?: any;
}

const DashboardTable = ({
    columns,
    rows,
    slug,
    refetch,
    fn = () => ({}),
    onClickToCell = () => {},
}: DashboardTableProps) => {
    const totalData = useMemo(() => {
        const total = [];
        columns?.forEach((column) => {
            const initValue = {};
            rows?.forEach((row) => {
                const newVal = fn(row.key, column.key);
                Object.keys(newVal).forEach((key) => {
                    if (initValue.hasOwnProperty(key)) {
                        return (initValue[key] = initValue[key] + newVal[key]);
                    }
                    initValue[key] = newVal[key];
                });
            });
            total.push(initValue);
        });

        return total;
    }, [columns, rows, fn]);

    if (IsEmptyArray(columns)) return <></>;
    return (
        <TableWrapper>
            <TableHeadGroup>
                <DebugConfigurationButton
                    slug={slug}
                    position='topright'
                    options={{ callback: refetch }}
                />
                <TableRow className='bg-[#F6F6F6] dark:bg-base-200'>
                    <CustomTableCell className='font-medium border-base-300 cursor-default'>
                        Entities/ Status
                    </CustomTableCell>
                    {columns?.map((val, index) => {
                        return (
                            <CustomTableCell
                                className='font-medium cursor-default'
                                key={index}
                            >
                                {val?.name}
                            </CustomTableCell>
                        );
                    })}
                </TableRow>
            </TableHeadGroup>
            <TableRowGroup>
                {rows.map((row, index) => {
                    return (
                        <TableRow key={row.key + '-' + index}>
                            <CustomTableCell className='font-medium bg-base-200 cursor-default'>
                                {row.name}
                            </CustomTableCell>
                            {columns.map((column, index) => {
                                const count = fn(row.key, column.key).count;

                                return (
                                    <CustomTableCell
                                        onClick={() => {
                                            if (count !== 0)
                                                onClickToCell(column, row);
                                        }}
                                        className={`hover:bg-primary hover:text-primary-content ${
                                            count === 0 && 'cursor-not-allowed'
                                        }`}
                                        key={column.key + '-' + index}
                                    >
                                        <div className='flex items-center justify-between '>
                                            <span>
                                                {FormatCurrencyStyled({
                                                    amount: fn(
                                                        row.key,
                                                        column.key
                                                    ).amount,
                                                })}
                                            </span>
                                            <p>{count}</p>
                                        </div>
                                    </CustomTableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableRowGroup>
            <TableFooterGroup>
                <TableRow>
                    <CustomTableCell className='font-medium border-b-0 bg-base-200 cursor-default'>
                        Total
                    </CustomTableCell>
                    {totalData.map((total, index) => (
                        <CustomTableCell
                            className='border-b-0 cursor-not-allowed'
                            key={index}
                        >
                            <div className='flex items-center justify-between font-medium '>
                                <span>
                                    {FormatCurrencyStyled({
                                        amount: total.amount,
                                        size: 'md',
                                    })}
                                </span>
                                <p>{total.count}</p>
                            </div>
                        </CustomTableCell>
                    ))}
                </TableRow>
            </TableFooterGroup>
        </TableWrapper>
    );
};

const CustomTableCell = ({
    children,
    className,
    onClick,
}: {
    children: any;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <TableCell
            onClick={onClick}
            className={cn(
                'px-3 py-4  border-b border-r border-base-300  cursor-pointer last:border-r-0',
                className
            )}
        >
            {children}
        </TableCell>
    );
};

export default DashboardTable;
