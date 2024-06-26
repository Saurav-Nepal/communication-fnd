import {
    IsFunction,
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@finnoto/core';
import { Slot } from '@radix-ui/react-slot';
import {
    createContext,
    forwardRef,
    useEffect,
    useImperativeHandle,
} from 'react';
import { useToggle } from 'react-use';
import { ModalComponent } from '../Modal/modal.component';
import { ModalProps } from '../Modal/modal.types';

let INLINE_MODAL_TOGGLE = 'inline-modal-toggle';
const InlineModal = forwardRef(
    (
        {
            children,
            size,
            title,
            disabled,
            ...rest
        }: Omit<ModalProps, 'modalSize' | 'headingTitle' | 'isVisible'> & {
            children: React.ReactElement;
            size?: ModalProps['modalSize'];
            title?: string;
            disabled?: boolean;
            toggleKey?: string;
        },
        ref: any
    ) => {
        const [open, toggleOpen] = useToggle(false);

        useImperativeHandle(
            ref,
            () => ({
                toggleOpen,
            }),
            [toggleOpen]
        );

        useEffect(() => {
            SubscribeToEvent({
                eventName: `${INLINE_MODAL_TOGGLE}-${rest?.toggleKey || title}`,
                callback: () => toggleOpen(false),
            });
            return () => {
                UnsubscribeEvent({
                    eventName: `${INLINE_MODAL_TOGGLE}-${
                        rest?.toggleKey || title
                    }`,
                    callback: () => toggleOpen(false),
                });
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [title]);

        return (
            <InlineModalContext.Provider value={{ toggleOpen }}>
                <Slot
                    aria-disabled={disabled}
                    onClick={() => {
                        if (!disabled) toggleOpen(true);
                    }}
                >
                    {children}
                </Slot>
                <ModalComponent
                    {...rest}
                    isVisible={open}
                    closeModal={() => {
                        if (IsFunction(rest.onClose)) rest.onClose();
                        toggleOpen(false);
                    }}
                    modalSize={size}
                    containerStyle={{
                        ...rest.containerStyle,
                        minHeight: '80px',
                    }}
                    headingTitle={title}
                />
            </InlineModalContext.Provider>
        );
    }
);

const InlineModalContext = createContext({
    toggleOpen: (_: any) => {},
});

const handleInlineModalToggle = (title: string) => {
    StoreEvent({
        eventName: `${INLINE_MODAL_TOGGLE}-${title}`,
    });
};

export { InlineModal, InlineModalContext, handleInlineModalToggle };
