import { ObjectDto } from '@finnoto/core';

export interface ModalProps {
    component?: React.FC<any>;
    props?: ObjectDto;
    containerStyle?: { [key: string]: number | string };
    // wrapperStyle?: { [key: string]: number | string };
    isVisible?: boolean;
    closable?: boolean;
    onClose?: Function;
    closeModal?: Function;
    closeIcon?: boolean;
    autofocus?: boolean;
    shouldWarnFormUpdate?: boolean;
    modalOffset?: { [key: string]: number | string }; // content position top bottom
    modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full' | 'auto';
    position?: 'bottom' | 'top';
    headingTitle?: string;
    className?: string;
    closeClassName?: string;
    closeWarningText?: string;
    withScrollableModal?: boolean;
}
