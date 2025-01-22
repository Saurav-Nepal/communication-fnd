import React from 'react';

import { cn } from '@slabs/ds-utils';

import { SlidingPane } from '../../utils';
import { Sheet, SheetContent } from '../dialogs/sheet';
import { SlidingPaneProps } from './slidingpane.types';

/**
 * Renders a sliding pane sheet that displays a modal with the given child component.
 *
 * @param {object} props - The props object.
 * - component: The child component to render inside the sheet.
 * - size: The size of the sheet. Either 'small', 'default', 'large', or 'fullscreen'.
 * - props: The props to pass down to the child component.
 * - isVisible: Whether or not the sheet is visible.
 * - closable: Whether or not the sheet is closable.
 * - position: The position of the sheet. Either 'left' or 'right'.
 * - onClose: The function to call when the sheet is closed.
 * @return {JSX.Element} The sliding pane sheet component.
 */
export const SlidingPaneSheet = ({
    component: RenderInner,
    size = 'default',
    props,
    isVisible,
    closeable = true,
    position = 'right',
    overlay = true,
    autoFocus,
}: SlidingPaneProps) => {
    return (
        <Sheet
            open={isVisible}
            onOpenChange={() => {
                if (closeable) SlidingPane.close();
            }}
        >
            <SheetContent
                className={cn('p-0')}
                position={position}
                size={size}
                closeable={closeable}
                onOpenAutoFocus={(e: any) => {
                    if (!autoFocus) e.preventDefault();
                }}
                overlay={overlay}
            >
                {RenderInner && <RenderInner inModal={true} {...props} />}
            </SheetContent>
        </Sheet>
    );
};
