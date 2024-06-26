import { useApp } from '@finnoto/core';
import { ErrorSvgIcon } from 'assets';
import { EmptyFunction, cn } from '../../../Utils/common.ui.utils';
import { ConfirmUtil } from '../../../Utils/confirm.utils';
import { SlidingPane } from '../../../Utils/slidingPane.utils';
import { Sheet, SheetContent } from '../Base/sheet.core';
import { SlidingPaneProps } from './slidingPane.types';

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
 *
 * @author Rumesh Udash
 */
export const SlidingPaneSheet = ({
    component: RenderInner,
    size = 'default',
    props,
    // closeOnEsc = true,
    isVisible,
    closable = true,
    // closeIcon = true,
    shouldWarnFormUpdate = false,
    position = 'right',
    onClose = EmptyFunction,
    overlay = true,
    autoFocus,
}: SlidingPaneProps) => {
    const { isFormUpdated } = useApp();

    /**
     * Handles the closing of the modal.
     *
     * @return {void} Nothing is returned from this function.
     */
    const onModalClose = () => {
        if (shouldWarnFormUpdate && isFormUpdated) {
            ConfirmUtil({
                title: 'Warning',
                icon: ErrorSvgIcon,
                iconAppearance: 'warning',
                message:
                    'Do you want to exit? The details you have entered will be deleted.',
                onConfirmPress: () => {
                    onClose();
                    SlidingPane.close();
                },
                confirmAppearance: 'error',
            });
            return;
        }
        if (!closable) return;
        onClose();
        SlidingPane.close();
    };

    return (
        <Sheet open={isVisible} onOpenChange={onModalClose}>
            <SheetContent
                className={cn('p-0')}
                position={position}
                size={size}
                closeable={closable}
                onOpenAutoFocus={(e) => {
                    if (!autoFocus) e.preventDefault();
                }}
                overlay={overlay}
            >
                {RenderInner && <RenderInner inModal={true} {...props} />}
            </SheetContent>
        </Sheet>
    );
};
