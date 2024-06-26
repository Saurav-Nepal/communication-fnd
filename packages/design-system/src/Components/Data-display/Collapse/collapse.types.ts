import { ReactNode } from 'react';

export interface CollapseProps {
    title?: any;
    subtitle?: string | ReactNode;
    expand?: boolean;
    defaultExpand?: boolean;
    collapseDisabled?: boolean;
    hideCollapseIcon?: boolean;
    children: any;
    className?: string;
    titleClassName?: string;
    headerClassName?: string;
    subtitleClassName?: string;
    collapseContainerClassName?: string;
    onExpandChange?: (_: boolean) => void;
    icon?: any;
    renderOnExpand?: boolean;
    footer?: ReactNode;
    footerClassName?: string;
    iconClassName?: string;
    hideDefaultTitleStyle?: boolean;
}

export interface ToggleCollapseProps extends Omit<CollapseProps, 'icon'> {
    hideCollapseIcon?: boolean;
}
