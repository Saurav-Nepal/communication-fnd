import { ReactNode } from 'react';

export interface CardProps {
    children?: any;
    title?: ReactNode;
    titleClassName?: string;
    icon?: any;
    isSvgIcon?: boolean;
    className?: string;
    noBorder?: boolean;
    onClick?: (e: any) => void;
}
