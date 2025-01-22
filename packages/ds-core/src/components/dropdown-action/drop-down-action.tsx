import React, { useMemo } from 'react';

import { cn, isEmptyArray } from '@slabs/ds-utils';

import { CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '../button/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../core/dropdown-menu';
import { Input } from '../core/input';
import {
    ActionItemType,
    DropdownMenuActionsProps,
} from './drop-down-action.types';

const getVisibleFilterActions = (
    actions: ActionItemType[],
    isSortable?: boolean
) => {
    const newActions = actions.filter((action) => {
        if (action.visible) {
            if (typeof action.visible === 'function') {
                return action.visible();
            }
            return action.visible;
        }
        return true;
    });
    if (isSortable) return newActions; // sort actions
    return newActions;
};
export const DropdownAction = ({
    disabled,
    isSortable,
    className,
    actions,
    menuLabel,
    children,
    isSearchable,
    side,
    align,
}: DropdownMenuActionsProps) => {
    const filterActions = useMemo(() => {
        return getVisibleFilterActions(actions, isSortable);
    }, [actions]);

    const isSeparatorVisible = useMemo(
        () => !isEmptyArray(filterActions) && !!menuLabel,
        [filterActions, menuLabel]
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled} asChild>
                {children ?? (
                    <Button variant='outline'>
                        Actions{' '}
                        <CaretSortIcon className='ml-2 w-4 h-4 opacity-50 shrink-0' />
                    </Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent {...{ align, side }} className={className}>
                {menuLabel && (
                    <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
                )}
                {isSeparatorVisible && <DropdownMenuSeparator />}
                {isSearchable && (
                    <div className='pt-0 pb-2'>
                        <Input
                            placeholder='Search ...'
                            className='min-w-full h-8'
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
                {!isEmptyArray(filterActions) && (
                    <DropdownMenuActionItemList
                        actions={filterActions}
                        {...{ isSortable }}
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const DropdownMenuActionItemList = ({
    actions,
    isSortable,
}: {
    actions: ActionItemType[];
    isSortable?: boolean;
}) => {
    return actions?.map((action) => {
        const filterActions = (() => {
            return getVisibleFilterActions(
                action?.subMenuActions || [],
                isSortable
            );
        })();

        if (filterActions?.length) {
            return (
                <DropdownMenuSub key={action?.key}>
                    <DropdownMenuSubTrigger>
                        {action?.prefix}
                        {action?.name}{' '}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuActionItemList
                                actions={filterActions}
                                {...{ isSortable }}
                            />
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            );
        }

        return (
            <DropdownMenuItem
                key={action.key}
                className={cn(action?.className, {
                    'hover:bg-error focus:bg-error focus:text-error-foreground hover:text-error-foreground':
                        action?.isCancel,
                })}
                textValue={action?.name || ''}
                disabled={action.disabled}
                onClick={action?.action}
            >
                {action?.prefix}
                {action?.name}{' '}
                {action?.suffix && (
                    <div className='ml-auto'>{action?.suffix}</div>
                )}
            </DropdownMenuItem>
        );
    });
};
