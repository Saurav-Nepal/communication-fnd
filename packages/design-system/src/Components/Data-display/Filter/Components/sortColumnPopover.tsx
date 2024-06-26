import { ArrowDownIcon, ArrowUpIcon, LucideIcon } from 'lucide-react';
import { forwardRef, HTMLAttributes } from 'react';

import { useUncontrolled } from '@finnoto/core';

import { cn } from '../../../../Utils/common.ui.utils';
import { SortColumnPopoverProps, SortValue } from '../filter.types';

export const SortColumnPopover = ({
    value,
    defaultValue,
    columns,
    onSortChange,
}: SortColumnPopoverProps) => {
    const [sort, setSort] = useUncontrolled<SortValue>({
        value,
        defaultValue,
        finalValue: { column: null, order: 'asc' },
        onChange: onSortChange,
    });

    const handleSortColumn = (column: string) => {
        setSort({ column, order: sort.order });
    };
    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSort({ column: sort.column, order });
    };

    return (
        <div className='col-flex'>
            <div className='px-3 py-2 space-y-1 border-b col-flex'>
                <span className='font-medium text-polaris-size-325'>
                    Sort by
                </span>
                {columns.map((column) => (
                    <label
                        key={column.value}
                        className={cn(
                            'flex gap-2 items-center text-polaris-size-325 cursor-pointer'
                        )}
                    >
                        <input
                            type='radio'
                            className='radio radio-xs'
                            name='sortColumn'
                            value={column.value}
                            checked={sort.column === column.value}
                            onChange={() => handleSortColumn(column.value)}
                        />
                        {column.label}
                    </label>
                ))}
            </div>
            <div className='px-1 py-2 space-y-1 col-flex'>
                <SortOrderButton
                    icon={ArrowUpIcon}
                    isActive={sort.order === 'asc'}
                    onClick={() => handleSortOrder('asc')}
                >
                    Ascending
                </SortOrderButton>
                <SortOrderButton
                    icon={ArrowDownIcon}
                    isActive={sort.order === 'desc'}
                    onClick={() => handleSortOrder('desc')}
                >
                    Descending
                </SortOrderButton>
            </div>
        </div>
    );
};

const SortOrderButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement> & { icon: LucideIcon; isActive?: boolean }
>(({ className, children, icon: Icon, isActive, ...props }, ref) => {
    return (
        <button
            className={cn(
                'flex gap-1 items-center py-1 px-2 rounded-md hover:bg-polaris-bg-surface-hover text-xs font-medium text-polaris-text',
                className,
                { 'bg-polaris-bg-surface-selected': isActive }
            )}
            ref={ref}
            {...props}
        >
            <Icon className='w-4 h-4' />
            {children}
        </button>
    );
});
