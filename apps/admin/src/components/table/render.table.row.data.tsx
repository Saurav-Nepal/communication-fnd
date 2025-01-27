import { ReactNode } from 'react';
import Link from 'next/link';

import { isFunction } from '@slabs/ds-utils';

import { flexRender } from '@tanstack/react-table';

export const renderTableRowData = (cell: any): ReactNode => {
    const linkFn = cell?.column.columnDef?.link;

    const original = cell?.row?.original;
    const data = flexRender(cell.column.columnDef.cell, cell.getContext());

    if (isFunction(linkFn)) {
        const href = linkFn?.(original);
        return (
            <Link className='text-info hover:underline' href={href}>
                {data}
            </Link>
        );
    }

    return data;
};
