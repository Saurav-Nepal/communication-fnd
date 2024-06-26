import { ReactNode } from 'react';

export interface TooltipInterface {
    message: string | ReactNode;
    trigger?: 'hover' | 'click';
    displayDelay?: number;
    sideOffset?: number;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open?: boolean) => void;
    isArrow?: boolean;
    className?: string;
    align?: 'center' | 'start' | 'end';
    asChild?: boolean;
    messageClassName?: string;
    triggerClassName?: string;
}
