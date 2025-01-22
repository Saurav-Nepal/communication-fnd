import React, { ReactNode } from 'react';
import { isValid as IsValidDate } from 'date-fns';
import {
    ArrowDownUp,
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    XCircle,
} from 'lucide-react';

import { Button, CheckBox, Tooltip, Typography } from '@slabs/ds-core';
import {
    accessNestedObject,
    cn,
    isFunction,
    isUndefined,
    ObjectDto,
} from '@slabs/ds-utils';

import { Ellipsis } from '../ellipsis/ellipsis.component';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
} from '../menubar/menubar.core';
import { FormatCurrencyStyled, FormatDisplayDateStyled } from '../utils';
import { TableCell } from './table.core';
import { SortingType, TableColumn } from './table.types';

// Function to get URL based on href and data
const getUrl = (href: string, data: ObjectDto) =>
    isFunction(href) ? href(data) : href;

// Function to handle the display of table items in a cell
export const handleTableItemDisplay = (
    item: ObjectDto,
    col: TableColumn,
    handleStatus: any,
    colIndex: number,
    rowIndex: number
) => {
    if (col?.visible === false) return null;

    if (col?.renderValue) {
        return col?.renderValue(item, col, rowIndex, colIndex);
    }

    const data: any = accessNestedObject(item, col?.key);

    const renderColumnwithEllipsis = (data: ObjectDto) => {
        return (
            <Ellipsis
                width={400}
                withShowMore
                truncateClassName={col?.truncateClass}
                className='break-words break-all'
            >
                {data || '-'}
            </Ellipsis>
        );
    };
    if (col?.url) {
        return <Typography>{data}</Typography>;
    }
    if (col?.secondaryUrl) {
        return <Typography>{data}</Typography>;
    }

    switch (col?.type) {
        case 'boolean':
            return (
                <Typography color={data ? 'success' : 'destructive'}>
                    {data ? 'Active' : 'Inactive'}
                </Typography>
            );

        case 'dualistic':
            return (
                <Typography color={data ? 'success' : 'destructive'}>
                    {data ? 'Yes' : 'No'}
                </Typography>
            );
        case 'currency':
            if (isUndefined(data)) return '-';
            return FormatCurrencyStyled({
                amount: data,
                noDecimal: false,
                size: 'sm',
                className: 'text-end',
            });
        case 'date':
        case 'date_lateral':
            if (!data) return '-';
            return FormatDisplayDateStyled({
                value: data,
                showTime: false,
                size: 'sm',
            });
        case 'date_time':
            if (!data) return '-';
            if (IsValidDate(new Date(data))) {
                return FormatDisplayDateStyled({
                    value: data,
                    size: 'sm',
                    showTime: true,
                });
            }
            return <Typography variant='info'>{data}</Typography>;
        case 'number':
            return (
                <Typography variant='info' className='text-center'>
                    {data}
                </Typography>
            );

        default:
            return (
                <Typography className={col?.className as any}>
                    {renderColumnwithEllipsis(data)}
                </Typography>
            );
    }
};

// Function to handle the display of table column header
export const handleTableColumn = (
    col: TableColumn,
    isSorted: boolean,
    order: 'asc' | 'desc',
    onSortingChange: (sorting: SortingType) => void
) => {
    if (col?.visible === false) return null;

    if (col?.enableDbSort === true) {
        const textAlign = (type: any) => {
            if (type === 'currency' || type === 'currency_acc') {
                return 'justify-end';
            }
            return 'justify-start';
        };

        return (
            <div
                className={cn('flex items-center group', textAlign(col?.type))}
            >
                <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => {
                        const newOrder = order === 'asc' ? 'desc' : 'asc';

                        onSortingChange?.({
                            column: col?.key,
                            order: isSorted ? newOrder : 'asc',
                        });
                    }}
                >
                    <div className={cn('flex items-center gap-2')}>
                        {col.name}
                        {!isSorted && (
                            <ArrowDownUp
                                className='invisible group-hover:visible'
                                size={14}
                            />
                        )}
                        {isSorted && order === 'asc' && (
                            <ArrowUpNarrowWide size={14} />
                        )}
                        {isSorted && order === 'desc' && (
                            <ArrowDownWideNarrow size={14} />
                        )}
                    </div>
                </Button>
            </div>
        );
    }

    if (
        col?.type === 'activate' ||
        col?.type === 'activate_badge' ||
        isFunction(col?.dynamicStatus)
    ) {
        return (
            <Typography color='primary' className='centralize'>
                {col.name}
            </Typography>
        );
    }
    return <Typography>{col.name}</Typography>;
};

// Function to handle the display of the selected column header
export const handleSeletedColumnHeader = (
    isSelectEnable: boolean,
    isHovered: boolean,
    rowNumbering: boolean,
    isOneSelected: boolean,
    onCheckBoxClick: () => void,
    isSelectedAll?: boolean,
    disableSelectAll?: boolean,
    className?: string,
    type?: 'check' | 'radio' | 'actions'
) => {
    if (!isSelectEnable && !rowNumbering) return null;

    if (type === 'radio' && isSelectEnable && !rowNumbering) {
        return (
            <TableCell className='border-l-0 border-y border-base-300'>
                <span></span>
            </TableCell>
        );
    }

    if (
        isSelectEnable &&
        !rowNumbering &&
        (!isOneSelected || disableSelectAll)
    ) {
        return (
            <TableCell className='border-l-0 border-y border-base-300'>
                <span></span>
            </TableCell>
        );
    }

    if (isOneSelected && !disableSelectAll) {
        return (
            <TableCell className='border-l-0 border-y border-base-300'>
                <CheckBox
                    onChange={onCheckBoxClick}
                    size='sm'
                    checked={!!isSelectedAll}
                    variant='success'
                />
            </TableCell>
        );
    }
    if (rowNumbering) {
        return (
            <TableCell
                className={cn(
                    'border-l-0 border-y border-base-300 ',
                    className
                )}
            >
                <Typography>S.N</Typography>
            </TableCell>
        );
    }
    if (isHovered)
        return (
            <TableCell className='w-0 border-l-0 border-y border-base-300'>
                <Typography className='w-0 text-center opacity-0 table-button'>
                    S.N
                </Typography>
            </TableCell>
        );
    return null;
};

// Function to handle the display of the selected column row
export const handleSeletedColumnRow = ({
    isSelectEnable,
    isOneSeleted,
    isDisabled,
    onClickToCheckBox,
    checked,
    hasHovered,
    rowNumbering,
    showTooltip = false,
    type = 'check',
    ...props
}: any) => {
    if (!isSelectEnable && !rowNumbering) return null;

    if (
        (isSelectEnable && (isOneSeleted || hasHovered)) ||
        (isSelectEnable && !rowNumbering)
    ) {
        if (type === 'check')
            return (
                <TableCell className='flex justify-center w-0'>
                    <CheckBox
                        size='sm'
                        onChange={onClickToCheckBox}
                        checked={checked}
                        disabled={!checked && isDisabled}
                    />
                </TableCell>
            );

        return (
            <TableCell className='flex justify-center w-0 !align-top'>
                <div className='flex justify-center gap-2'>
                    <Button
                        disabled={isDisabled}
                        size='sm'
                        onClick={props?.onEdit}
                    >
                        Edit
                    </Button>

                    <Button size='sm' onClick={props?.onDelete}>
                        Delete
                    </Button>
                </div>
            </TableCell>
        );
    }

    if (rowNumbering) {
        return (
            <TableCell
                className={cn(
                    'w-0 text-center cursor-pointer flex items-stretch !p-0 ',
                    {
                        '!px-8 !py-2.5 !align-top': type === 'actions',
                    }
                )}
                id='row-numbering'
                onClick={props.onSnOpen ? props.onSnOpen : null}
            >
                {showTooltip ? (
                    <Tooltip message={'Click to view details'}>
                        <div>
                            <Typography>{rowNumbering}</Typography>
                        </div>
                    </Tooltip>
                ) : (
                    <Typography>{rowNumbering}</Typography>
                )}
            </TableCell>
        );
    }
};

export interface SelectableMenuProps {
    active: string;
    menus: {
        name: string;
        key: string;
        icon?: any;
        action?: (key: string, col?: any) => void;
    }[];
    children?: ReactNode;
    onClickToClear?: (col: any) => void;
    col?: any;
    menubarContentClassName?: string;
    menubarTriggerClassName?: string;
}
export const SelectableMenu = ({
    active,
    menus,
    children,
    onClickToClear = () => {},
    col,
    menubarContentClassName,
    menubarTriggerClassName,
}: SelectableMenuProps) => {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger asChild className={menubarTriggerClassName}>
                    {children || 'Click'}
                </MenubarTrigger>
                <MenubarContent className={menubarContentClassName}>
                    <MenubarRadioGroup value={active}>
                        {menus?.map((menu) => {
                            return (
                                <MenubarRadioItem
                                    key={menu?.key}
                                    value={menu?.key}
                                    onClick={() =>
                                        isFunction(menu?.action)
                                            ? menu.action?.(menu?.key, col)
                                            : {}
                                    }
                                >
                                    {menu?.name}
                                </MenubarRadioItem>
                            );
                        })}
                        {!!active && (
                            <>
                                <MenubarSeparator />
                                <MenubarItem
                                    className='flex gap-2 text-error item focus:bg-error '
                                    onClick={() => onClickToClear(col)}
                                >
                                    <XCircle size={14} />
                                    Clear
                                </MenubarItem>
                            </>
                        )}
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
