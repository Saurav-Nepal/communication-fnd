import React from 'react';

import { isEmptyArray, isFunction, isUndefined } from '@slabs/ds-utils';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from './context-menu.core';
import { RightClickProps, RightClickRowOptionProps } from './right-click.types';

export const RightClick = ({
    id,
    children,
    className,
    renderTag,
    rowOptions,
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
            <ContextMenuTrigger asChild>{children ?? <></>}</ContextMenuTrigger>
            <ContextMenuContent className='w-48'>
                {rowOptions.map((rowOption, key) => {
                    if (!isVisible(rowOption, props)) return null;
                    if (
                        typeof rowOption.onClick !== 'function' &&
                        isEmptyArray(rowOption.actions)
                    )
                        return <ContextMenuSeparator key={key} />;

                    if (isEmptyArray(rowOption.actions))
                        return (
                            <ContextMenuItem
                                key={key}
                                className={rowOption.className}
                                onClick={(e) => rowOption.onClick?.(props, e)}
                                disabled={
                                    typeof rowOption.disabled == 'function'
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
                                    typeof rowOption.disabled == 'function'
                                        ? rowOption.disabled(props)
                                        : rowOption.disabled
                                }
                            >
                                {rowOption.name}
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent className='w-40'>
                                {rowOption.actions.map((action, index) => {
                                    if (!isVisible(action, props)) return null;
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
                                })}
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                    );
                })}
            </ContextMenuContent>
        </ContextMenu>
    );
};
