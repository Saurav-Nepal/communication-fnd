import ListActions from '@Components/GenericDocumentListing/Components/listActions.component';
import { IsEmptyArray, Navigation, useApp } from '@finnoto/core';
import { Icon, InlineModal, Typography, cn } from '@finnoto/design-system';
import { Slot } from '@radix-ui/react-slot';
import * as Icons from 'assets';
import * as HomeIcons from 'assets/MobileMenuIcons';
import { useCallback } from 'react';
import * as FunctionsUtil from '../../Utils/functions.utils';

const HomeMenu = ({
    topMenus = [],
    menus = [],
    className,
}: {
    topMenus?: any[];
    menus: any[];
    className?: string;
}) => {
    return (
        <div className={cn('col-flex gap-4', className)}>
            {!IsEmptyArray(topMenus) && (
                <RenderMenus menus={topMenus} showIcon />
            )}
            <RenderMenus menus={menus} showIcon />
        </div>
    );
};

const RenderMenus = ({
    menus,
    showIcon = true,
    resolveUrl,
    menuClassName = '',
}: {
    menus: any[];
    showIcon: boolean;
    resolveUrl?: boolean;
    menuClassName?: string;
}) => {
    const { basePath } = useApp();
    // Function to check if a menu has a submenu
    const hasSubmenu = useCallback((menu: any) => {
        return menu.menus?.some((menu: any) => menu.visibility !== false);
    }, []);

    // Function to get the add action path
    const getAddActionPath = useCallback(
        (menu: any) => {
            if (menu.attributes?.action === true) return undefined;
            if (resolveUrl && menu.ui_action?.url) return menu.ui_action?.url;
            return menu.ui_action?.url;
        },
        [resolveUrl]
    );

    // Function to get the add action name
    const getAddActionName = useCallback((menu: any) => {
        if (menu.attributes?.action === true || menu.ui_action?.url)
            return undefined;

        return menu.ui_action?.name;
    }, []);

    return (
        <div className='menu-items'>
            {menus.map((menu, index) => {
                if (menu.visibility === false) return null;
                if (menu.attributes?.no_pwa === true) return null;

                if (hasSubmenu(menu)) {
                    const subMenus = menu.menus?.map((menu) => ({
                        name: menu.display_name,
                        defaultName: menu.display_name,
                        // icon: showIcon ? menu.image : null,
                        // isSvg: true,
                        visible: menu.visibility,
                        action:
                            menu.ui_action && !menu.ui_action.url
                                ? menu.ui_action.name
                                : null,
                        url:
                            basePath === menu.path
                                ? `${menu.path}?dashboard=true`
                                : menu.path,
                    }));

                    return (
                        <InlineModal
                            key={index}
                            component={ListActions}
                            props={{ actions: subMenus }}
                            title={menu.display_name}
                        >
                            <RenderMenuItem
                                name={menu.display_name}
                                defaultName={menu.display_name}
                                icon={showIcon ? menu.image : null}
                                isSvg={true}
                                className={menuClassName}
                                // isInsideSubmenu={true}
                            />
                        </InlineModal>
                    );
                }

                return (
                    <RenderMenuItem
                        key={index}
                        name={menu.display_name}
                        defaultName={menu.display_name}
                        path={
                            basePath === menu.path
                                ? `${menu.path}?dashboard=true`
                                : menu.path
                        }
                        action={
                            menu.ui_action && !menu.ui_action.url
                                ? menu.ui_action.name
                                : null
                        }
                        icon={showIcon ? menu.image : null}
                        isSvg={true}
                        addPath={getAddActionPath(menu)}
                        addAction={getAddActionName(menu)}
                        addActionProps={menu.addActionProps}
                        className={menuClassName}
                    />
                );
            })}
        </div>
    );
};

const RenderMenuItem = ({
    name,
    defaultName,
    icon,
    path,
    isSvg,
    addPath,
    action,
    className = '',
    onClick = () => {},
}: {
    name: string;
    defaultName?: string;
    icon: string | any;
    path?: string;
    isSvg?: boolean;
    addPath?: string;
    addAction?: any;
    addActionProps?: object;
    action?: any;
    className?: string;
    onClick?: any;
}) => {
    const getMenu = useCallback(
        (path?: string) => {
            const handleNavigation = (path, e) => {
                Navigation.navigate({ url: path }, e);
            };

            const iconSource = () => {
                if (
                    typeof icon === 'string' &&
                    (HomeIcons as any)[icon] &&
                    isSvg
                ) {
                    return (HomeIcons as any)[icon];
                }

                if (typeof icon === 'string' && (Icons as any)[icon] && isSvg) {
                    return (Icons as any)[icon];
                }
                return icon;
            };

            return (
                <div
                    onClickCapture={(e) => {
                        if (path) handleNavigation(path, e);
                        onClick(e);
                    }}
                    className={cn('menu-item', className)}
                >
                    {icon && (
                        <div className='p-3 rounded-full bg-base-200/50'>
                            <Icon
                                source={iconSource()}
                                isSvg={isSvg}
                                iconColor='text-primary'
                                size={32}
                            />
                        </div>
                    )}
                    <Typography noStyle className='sidebar-item-title'>
                        {defaultName || name}
                    </Typography>
                    {addPath && (
                        <div
                            className='sidebar-item-addPath'
                            onClick={(e) => {
                                e.preventDefault();
                                Navigation.navigate({ url: addPath });
                            }}
                        >
                            <Icon className='m-1' source={'add'} size={20} />
                        </div>
                    )}
                </div>
            );
        },
        [addPath, className, defaultName, icon, isSvg, name, onClick]
    );

    if (action) {
        return (
            <Slot
                onClick={
                    typeof action === 'string'
                        ? (FunctionsUtil as any)[action]
                        : action
                }
            >
                {getMenu()}
            </Slot>
        );
    }

    return getMenu(path);
};

export default HomeMenu;
