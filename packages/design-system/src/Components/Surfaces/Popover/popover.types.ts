import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PopoverContentProps } from '@radix-ui/react-popover';

export interface PopoverProps
    extends Pick<PopoverContentProps, 'align' | 'side'> {
    className?: string;
    children: React.ReactNode;
    element: React.ReactElement;
    // arrow?: boolean;
    disabled?: boolean;
    visible?: boolean;
    defaultVisible?: boolean;
    // destroyOnHide?: boolean;
    autoWidth?: boolean;
    offsetY?: number;
    id?: any;
    offsetX?: number;
    onVisibleChange?: (state: boolean) => void;
    trigger?: 'click' | 'manual';
    type?: 'button' | 'reset' | 'submit' | undefined;
    noAutofocus?: boolean;
}

export interface PopoverPrimitiveProps
    extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    arrow?: boolean;
}
