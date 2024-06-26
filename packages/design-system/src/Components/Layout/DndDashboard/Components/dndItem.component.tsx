import { forwardRef, Fragment, ReactElement } from 'react';

import { IsEmptyArray, IsFunction } from '@finnoto/core';

import { cn } from '../../../../Utils/common.ui.utils';
import { IconButton } from '../../../Inputs/Icon-Button/iconButton.component';

import { DeleteSvgIcon } from 'assets';

interface DndItemProps {
    children: ReactElement[];
    isEdit?: boolean;
    className?: string;
    onDelete?: (i: string) => void;
    layout?: ReactGridLayout.Layout;
    [key: string]: any;
}
const DndItem = forwardRef(
    (
        {
            isEdit,
            id,
            className,
            children,
            onDelete,
            layout,
            ...rest
        }: DndItemProps,
        ref
    ) => {
        return (
            <div
                key={id}
                className={cn(className, {
                    'overflow-hidden select-none z-10': isEdit,
                    'isEditable cursor-move border-dashed border-2 overflow-hidden':
                        isEdit && !layout.static,
                    'pointer-events-none ': isEdit && layout.static,
                })}
                ref={ref as any}
                {...rest}
            >
                {isEdit && IsFunction(onDelete) ? (
                    <IconButton
                        icon={DeleteSvgIcon}
                        appearance='polaris-transparent'
                        className='absolute z-50 right-2 top-2 text-error hover:text-error bg-polaris-bg-surface-secondary'
                        onClick={(_, e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDelete(id);
                        }}
                    />
                ) : null}
                {!IsEmptyArray(children) &&
                    children.map((child, index) => {
                        if (
                            isEdit &&
                            !(child?.key || '').startsWith('resizableHandle-')
                        ) {
                            return (
                                <div
                                    key={index}
                                    className='h-full pointer-events-none'
                                >
                                    {child}
                                </div>
                            );
                        }
                        return <Fragment key={index}>{child}</Fragment>;
                    })}
            </div>
        );
    }
);

export default DndItem;
