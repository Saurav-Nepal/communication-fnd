import React from 'react';

import { cn, isEmptyArray, isFunction, isUndefined } from '@slabs/ds-utils';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '../core/context-menu';
import { RightClickProps, RightClickRowOptionProps } from './right-click.types';

export const RightClick = ({
    children,
    className,
    actions,
    disabled,
    ...props
}: RightClickProps) => {
    const isVisible = (rowAction: RightClickRowOptionProps, data: any) => {
        if (isFunction(rowAction.visible)) return rowAction.visible(data);
        if (isUndefined(rowAction.visible)) return true;
        return rowAction.visible;
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger disabled={disabled} asChild>
                {children ?? <></>}
            </ContextMenuTrigger>
            <ContextMenuContent className={cn('w-48', className)}>
                {actions.map((rowOption, key) => {
                    if (!isVisible(rowOption, props)) return null;
                    if (
                        typeof rowOption.onClick !== 'function' &&
                        isEmptyArray(rowOption.subMenuActions)
                    )
                        return <ContextMenuSeparator key={key} />;

                    if (isEmptyArray(rowOption.subMenuActions))
                        return (
                            <ContextMenuItem
                                key={key}
                                className={rowOption.className}
                                onClick={(e) => rowOption.onClick?.(props, e)}
                                disabled={
                                    isFunction(rowOption.disabled)
                                        ? rowOption.disabled(props)
                                        : rowOption.disabled
                                }
                            >
                                {rowOption.name}
                            </ContextMenuItem>
                        );

                    return (
                        <ContextMenuSub key={key}>
                            <ContextMenuSubTrigger
                                disabled={
                                    isFunction(rowOption?.disabled)
                                        ? rowOption.disabled(props)
                                        : rowOption.disabled
                                }
                            >
                                {rowOption.name}
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent className='w-40'>
                                {rowOption.subMenuActions.map(
                                    (action, index) => {
                                        if (!isVisible(action, props))
                                            return null;
                                        return (
                                            <ContextMenuItem
                                                key={index}
                                                className={rowOption.className}
                                                onClick={(e) =>
                                                    action.onClick?.(props, e)
                                                }
                                                disabled={
                                                    typeof action.disabled ==
                                                    'function'
                                                        ? action.disabled(props)
                                                        : action.disabled
                                                }
                                            >
                                                {action.name}
                                            </ContextMenuItem>
                                        );
                                    }
                                )}
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                    );
                })}
            </ContextMenuContent>
        </ContextMenu>
    );
};
