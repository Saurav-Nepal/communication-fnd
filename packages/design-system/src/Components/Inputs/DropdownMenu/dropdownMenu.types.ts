import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuProps
    extends Pick<DropdownMenuContentProps, 'align' | 'side'> {
    actions: DropdownMenuActionProps[];
    children?: React.ReactNode;
    // autoWidth?: boolean;
    // onClick?: (val: any, data?: any) => void;
    labelKey?: string;
    valueKey?: string;
    activeValue?: string;
    className?: string;
    disabled?: boolean;
    // bottomComponent?: React.ReactNode;
    // renderValue?: (val: any) => React.ReactNode;
    // loading?: boolean;
    // success?: any;
    actionClassName?: string;
    // arrow?: boolean;
    hideOnNoAction?: boolean;
    params?: any; // If you want to send something while clicking to the action
    searchable?: boolean;
    asChild?: boolean;
    autoFocus?: boolean;
    onOpenChangeCallback?: (open: boolean) => void;
    isSortable?: boolean;
    // trigger?: 'click' | 'hover' | 'focus';
    // usePortal?: boolean;
    size?: keyof typeof dropdownMenuSizes;
}

export interface DropdownMenuActionProps {
    name: string;
    url?: string;
    urlProps?: any;
    action?: (_?: any) => void;
    visible?: boolean | ((_?: any) => boolean);
    icon?: string | (() => any);
    isSvg?: boolean;
    isCancel?: boolean;
    isSuccess?: boolean;
    [key: string]: any;
    className?: string;
    expandableActions?: DropdownMenuActionProps[];
    size?: keyof typeof dropdownMenuSizes;
}

export const dropdownMenuSizes = {
    xs: 'h-[24px] p-1',
    sm: 'h-[28px] p-1',
    md: 'h-[32px] p-1 px-3',
    lg: 'h-[40px] px-3 py-2',
};

export const dropdownMenuIconSizes = {
    xs: 16,
    sm: 20,
    md: 20,
    lg: 24,
};
