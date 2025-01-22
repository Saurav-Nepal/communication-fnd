import { ReactNode } from 'react';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

export type ActionItemType = {
    name: string;
    key: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    action?: (_?: any) => void;
    visible?: boolean | ((_?: any) => boolean);
    isSvg?: boolean;
    isCancel?: boolean;
    className?: string;
    disabled?: boolean;
    subMenuActions?: ActionItemType[];
};

export interface DropdownMenuActionsProps
    extends Pick<DropdownMenuContentProps, 'align' | 'side'> {
    actions: ActionItemType[];
    isSortable?: boolean;
    disabled?: boolean;
    className?: string;
    menuLabel?: ReactNode;
    children?: ReactNode;
    isSearchable?: boolean;
}
