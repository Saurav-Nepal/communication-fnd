import { ButtonProps } from '@slabs/ds-core/lib/components/button/button';

export interface ConfirmUtilProps {
    title?: string;
    onCancelPress?: Function;
    message: string | any;
    confirmAppearance?: ButtonProps['color'];
    onConfirmPress?: Function;
    confirmText?: string;
    cancelText?: string;
    cancelable?: boolean;
    translateMessage?: boolean;
    noHeader?: boolean;
    isReverseAction?: boolean;
    icon?: any;
    iconAppearance?: 'primary' | 'success' | 'error' | 'warning' | 'hold';
    disableCloseModal?: boolean;
    isArc?: boolean;
    cancelAppearance?: ButtonProps['color'];

    // arc confirm util props
    customContent?: React.ReactNode;
    footerButtonsType?: 'compact' | 'full';
    hideCancel?: boolean;
    hideIcon?: boolean;
    appearance?: 'info' | 'success' | 'error' | 'warning';
}
