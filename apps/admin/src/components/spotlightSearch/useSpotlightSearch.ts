import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Fuse from 'fuse.js';

import { useBoolean, useOs } from '@slabs/ds-hooks';
import { isEmptyObject } from '@slabs/ds-utils';

import { communicationWrapperProps, MenuProps, ObjectDto } from '@/types';
import { GetItem, SetItem } from '@/utils/localStorage.utils';
import { Navigation } from '@/utils/navigation.utils';

const HISTORY_KEY = 'spotlight_history';
const HISTORY_LIMIT = 5;

type HistoryItem = {
    url: string;
    title: string;
};

const useSpotlightSearch = ({
    menus,
}: {
    menus: communicationWrapperProps['menus'];
}) => {
    const [isOpen, setIsOpen] = useBoolean(false);
    const [search, setSearch] = useState('');
    const [mode, setMode] = useState<'history' | 'search'>('search');

    const [history, setHistory] = useState<HistoryItem[]>(
        GetItem(HISTORY_KEY, true) ?? []
    );

    const path = usePathname();

    const os = useOs();

    // filter visible menus and transform them to spotlight menu format
    const spotlightMenus = useMemo(() => {
        if (!menus) return [];

        return menus.modules.flatMap((module) => {
            if (!module.menus) return [];
            return module.menus
                ?.filter((menu) => menu.visibility)
                .map((menu) => {
                    return {
                        ...menu,
                        title: [module.name, menu.name],
                        onClick: () => Navigation.navigate({ url: menu?.path }),
                        url: '/' + menu?.path,
                    };
                });
        });
    }, [menus]);

    // search menus
    const searchMenus = useMemo(() => {
        if (mode === 'history') return [];

        if (!search) return spotlightMenus;

        // transform menu title to fuse options. eg: ['Module', 'Menu'] => { level0: 'Module', level1: 'Menu' }
        const transformedMenus = spotlightMenus.map((menu) => {
            return {
                ...menu,
                ...transformMenusInfoFuseOptions(menu.title),
            } as ObjectDto;
        });

        const fuse = new Fuse(transformedMenus, {
            keys: [
                { name: 'level1', weight: 3 },
                { name: 'level0', weight: 1.5 },
            ],
            threshold: 0.3,
        });

        const searchResult = fuse.search(search);
        return searchResult.map((result) => result.item);
    }, [search, menus, spotlightMenus, mode]);

    // history menus
    const searchHistory = useMemo(() => {
        // add onClick to history items
        const historyWithNavigation = history
            .map((item) => {
                const menu = getMenuByUrl(spotlightMenus, item.url);
                if (!menu) return null;

                return {
                    ...item,
                    onClick: () => Navigation.navigate({ url: menu.path }),
                } as HistoryItem;
            })
            .toReversed();

        // filter out based on limit
        const historyWithLimit =
            mode === 'history'
                ? historyWithNavigation
                : historyWithNavigation.slice(0, HISTORY_LIMIT);

        if (!search) return historyWithLimit;

        const fuse = new Fuse(historyWithLimit, {
            keys: ['title', 'url'],
            threshold: 0.3,
        });

        const searchResult = fuse.search(search);
        return searchResult.map((result) => result.item);
    }, [search, history, mode]);

    const storeHistory = (menu) => {
        // if menu is already in history, don't add it again
        const isAlreadyExist = history
            .filter((val) => !isEmptyObject(val))
            .some((val) => val.url === menu?.path);

        if (isAlreadyExist) return;

        // add new menu to history
        setHistory((prev) => {
            const newHistory = [
                ...prev,
                // only store the last part of the title. eg: ['Module', 'Menu'] => 'Menu'
                { url: menu?.path, title: menu?.title.slice(-1)[0] },
            ];

            SetItem(HISTORY_KEY, newHistory, {
                isNonVolatile: true,
            });

            return newHistory;
        });
    };

    // store history on path change
    useEffect(() => {
        const menu = getMenuByUrl(spotlightMenus, path);

        // only store history if menu is found
        if (!menu) return;
        storeHistory(menu);
    }, [path]);

    const handleMenuClick = (menu: ObjectDto) => {
        menu.onClick();
        setIsOpen(false);
        storeHistory(menu);
    };

    return {
        isOpen,
        setIsOpen,
        search,
        setSearch,
        os,
        searchMenus,
        mode,
        setMode,
        handleMenuClick,
        history: searchHistory,
    };
};

// transform menu title to fuse options. eg: ['Module', 'Menu'] => { level0: 'Module', level1: 'Menu' }
// used for searching priority
const transformMenusInfoFuseOptions = (title: string[]) => {
    return title.reduce((acc, val, index) => {
        acc['level' + index] = val;
        return acc;
    }, {});
};

const getMenuByUrl = (menus: MenuProps[], url: string) => {
    if (!menus) return null;
    return menus.flat().find((menu) => menu.path === url);
};

export default useSpotlightSearch;
