import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { useBoolean } from '@slabs/ds-hooks';

import { CaretSortIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

import { MainMenuBottomList, MainMenuTopList } from './main-menu';
import { MainMenu } from './main-menu/main-menu';
import { MainMenuItem } from './main-menu/main-menu-item';
import { Sidebar } from './sidebar';
import { MenuItemType } from './sidebar.types';
import { SubMenuList } from './sub-menu';
import { SubMenu } from './sub-menu/sub-menu';
import { NestedSubmenuItem, SingleSubmenuItem } from './sub-menu/sub-menu-item';
import {
    NestedSubmenuChildNested,
    NestedSubmenuChildNestedChild,
    NestedSubmenuChildSingle,
} from './sub-menu/sub-menu-item-child';
import { SubMenuTitle } from './sub-menu/sub-menu-title';

const meta: Meta<typeof Sidebar> = {
    title: 'Component/Sidebar',
    component: Sidebar,
};

export default meta;

const bottomList: MenuItemType[] = [
    {
        icon: CaretSortIcon,
        title: 'Bottom Menu',
        menus: [
            {
                title: 'Bottom 1',
                href: '/expense',
            },
        ],
    },
    {
        icon: CaretSortIcon,
        title: 'Bottom Menu 2',
        href: '/bottom-menu-2',
    },
];

export const Example: StoryFn<typeof Sidebar> = (args) => {
    const [isOpen, setIsOpen] = useBoolean(true);

    return (
        <div className='min-h-[60vh]'>
            <Sidebar
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                menus={[...args.menus, ...bottomList]}
            >
                <MainMenu>
                    <MainMenuTopList>
                        {args.menus.map((menu) => (
                            <a href={menu.href}>
                                <MainMenuItem
                                    {...menu}
                                    key={menu.title}
                                    icon={undefined}
                                />
                            </a>
                        ))}
                    </MainMenuTopList>
                    <MainMenuBottomList>
                        {bottomList.map((menu) => (
                            <a href={menu.href}>
                                <MainMenuItem
                                    {...menu}
                                    key={menu.title}
                                    icon={undefined}
                                />
                            </a>
                        ))}
                    </MainMenuBottomList>
                </MainMenu>
                <SubMenu>
                    <SubMenuTitle />
                    <SubMenuList>
                        {(activeMenu) => {
                            return activeMenu?.menus?.map((menu) => {
                                if (menu.href)
                                    return (
                                        <a href={menu.href}>
                                            <SingleSubmenuItem
                                                {...menu}
                                                key={menu.title}
                                            />
                                        </a>
                                    );

                                return (
                                    <NestedSubmenuItem
                                        {...menu}
                                        key={menu.title}
                                    >
                                        {menu.menus?.map((submenu) => {
                                            if (submenu.href) {
                                                return (
                                                    <a href={submenu.href}>
                                                        <NestedSubmenuChildSingle
                                                            {...submenu}
                                                        />
                                                    </a>
                                                );
                                            }

                                            return (
                                                <NestedSubmenuChildNested
                                                    title={submenu.title}
                                                >
                                                    {submenu.menus?.map(
                                                        (nested) => (
                                                            <a
                                                                href={
                                                                    nested.href
                                                                }
                                                            >
                                                                <NestedSubmenuChildNestedChild
                                                                    {...nested}
                                                                />
                                                            </a>
                                                        )
                                                    )}
                                                </NestedSubmenuChildNested>
                                            );
                                        })}
                                    </NestedSubmenuItem>
                                );
                            });
                        }}
                    </SubMenuList>
                </SubMenu>
            </Sidebar>
        </div>
    );
};

Example.args = {
    menus: [
        {
            icon: CaretSortIcon,
            title: 'Dashboard',
            href: '/',
        },
        {
            icon: CheckIcon,
            title: 'Dashboard 2',
            href: '/dashboard-1',
        },
        {
            icon: Cross1Icon,
            title: 'Listing Pages',
            menus: [
                {
                    title: 'Expense Listing',
                    href: '/expense',
                    // icon: AiOutlineControl,
                },
                {
                    title: 'Vendor Listing',
                    // icon: AiOutlineFileJpg,
                    menus: [
                        {
                            title: 'Gst Vendors',
                            href: '/gst',
                        },
                        {
                            title: 'Non-Gst Vendors',
                            href: '/non-gst',
                        },
                        {
                            title: 'Misc Vendors',
                            menus: [
                                {
                                    title: 'Internal Vendors',
                                    href: '/internal',
                                },
                                {
                                    title: 'External Vendors',
                                    href: '/external',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            icon: CaretSortIcon,
            title: 'Application Menus',
            menus: [
                {
                    title: 'Menu 1',
                    href: '/menu-1',
                    // icon: AiOutlineFileJpg,
                },
                {
                    title: 'Menu 2',
                    // icon: AiOutlineFileJpg,
                    href: '/menu-2',
                },
            ],
        },
    ],
};
