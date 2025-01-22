export type SidebarType = {
    menus: MenuItemType[];
    bottomMenus?: MenuItemType[];
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
    mainMenuHeading: React.ReactNode;
    mainMenuFooter?: React.ReactNode;
    subMenuFooter: SidebarSubmenuFooterType;
    menuBorderType?: 'dashed' | 'solid';
};

export type SidebarReturnType = {
    activeMenu: MenuItemType | undefined;
    setActiveMenu: (title: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    pathName: string;
};

export type MenuItemType = {
    title: string;
    icon?: any;
    href?: string;

    // menu list of the active menu
    menus?: SubmenuItemType[];
};

// active list of menus at root level on submenu bar
export type SubmenuItemType = {
    href?: string;
    title: string;
    icon?: any;
    menus?: SubmenuItemChildType[];
    className?: string;
};
export type SubmenuItemChildType = {
    title: string;
    href?: string;

    // leaf nodes of the sidebar
    menus?: {
        title: string;
        href: string;
    }[];
};

export type SidebarSubmenuFooterType =
    | {
          renderFooter: React.ReactNode;
      }
    | {
          title: string;
          subtitle: string;
          action: () => void;
      };
