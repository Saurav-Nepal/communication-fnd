export interface BottomNavigationProps {
    actions: BottomNavigationActions[];
}

export interface BottomNavigationActions {
    name: string;
    url?: string;
    urlProps?: any;
    action?: (_?: any) => void;
    visible?: boolean;
    icon: string | (() => any);
    activeIcon?: string | (() => any);
    isMain?: boolean;
}
