import { IsEmptyArray, IsFunction, IsUndefined } from '@finnoto/core';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from './contextMenu.core';
import { RightClickProps, RightClickRowOptionProps } from './rightClick.types';

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
        if (IsFunction(rowAction.visible)) return rowAction.visible(data);
        if (IsUndefined(rowAction.visible)) return true;
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
                        IsEmptyArray(rowOption.actions)
                    )
                        return <ContextMenuSeparator key={key} />;

                    if (IsEmptyArray(rowOption.actions))
                        return (
                            <ContextMenuItem
                                key={key}
                                className={rowOption.className}
                                onClick={(e) => rowOption.onClick(props, e)}
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
                                                action.onClick(props, e)
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
