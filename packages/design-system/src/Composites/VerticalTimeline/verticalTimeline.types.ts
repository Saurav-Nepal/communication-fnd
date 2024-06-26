import { ReactNode } from 'react';

export interface VerticalTimelineItem {
    title?: string | ReactNode;
    titleClassName?: string;
    contentClassName?: string;
    titleContainerClassName?: string;
    containerClass?: string;
    children?: any;
    onClick?: () => void;
    align?: 'center' | 'start';
    titleLeftComponent?: ReactNode;
    lineClassName?: string;
    fullWidth?: boolean;
}
