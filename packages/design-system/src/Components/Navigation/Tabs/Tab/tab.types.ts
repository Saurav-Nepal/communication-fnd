import { ReactNode } from 'react';

import { DropdownMenuActionProps } from '../../../Inputs/DropdownMenu/dropdownMenu.types';
import { TabsProps } from '../commonTab.types';

// This interface extends the TabsProps interface and adds an additional property called "appreance"

export interface TabBorderButtonAction {
    name: string | ReactNode;
    key: string;
    action?: () => void;
    visible?: boolean;
    appearance?: 'primary' | 'success';
    type?: 'dropdown' | 'button';
    actions?: DropdownMenuActionProps[];
}
export interface BorderTabProps extends TabsProps {
    contentContainerClass?: string; // Custom Content Container class
    containerClassName?: string; // Custom Container class, this is the parent component.
    actions?: TabBorderButtonAction[];
    tabListClassName?: string;
    tabTriggerClassName?: string;
    animationClassName?: string;
    tabChangecallback?: (key: string) => void;
    globalAction?: () => React.ReactNode;
}
