import { ButtonProps } from '../../Inputs/Button/button.types';

export interface ConfirmUtilProps {
    title?: string;
    onCancelPress?: Function;
    message: string | any;
    confirmAppearance?: ButtonProps['appearance'];
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
    cancelAppearance?: ButtonProps['appearance'];

    // arc confirm util props
    customContent?: React.ReactNode;
    footerButtonsType?: 'compact' | 'full';
    hideCancel?: boolean;
    hideIcon?: boolean;
    appearance?: 'info' | 'success' | 'error' | 'warning';
}
