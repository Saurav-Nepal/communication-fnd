import Fuse from 'fuse.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce, useToggle } from 'react-use';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../backend/Dtos';
import {
    CLOSE_SPOTLIGHT,
    IdentifierConstants,
    OPEN_SPOTLIGHT,
} from '../Constants';
import { SPOTLIGHT_QUERY_CONTROLLER_ROUTE } from '../Constants/controller.router.constant';
import { SearchQueryType } from '../Types';
import {
    GetObjectFromArray,
    IndexOfObjectInArray,
    IsEmptyArray,
    IsFunction,
    IsValidString,
} from '../Utils/common.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../Utils/stateManager.utils';
import { Functions } from '../Utils/ui.utils';
import { useApp } from './useApp.hook';
import { FetchData } from './useFetchData.hook';

type SearchMode = 'history' | 'query';

interface SearchQueryItem {
    name: string;
    type: SearchQueryType;
    method?: string;
    transformData?: (data: any) => any[];
    detailAction: (id: number) => void;
    filterClassParams?: ObjectDto;
}

export const useSpotlightSearch = (
    menus: any[],
    queries: SearchQueryType[] = [],
    options?: { onOpen?: () => void; onClose?: () => void }
) => {
    const { onOpen = () => {}, onClose = () => {} } = options || {};

    const { product_id } = useApp();

    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [searchType, setSearchType] = useState<SearchQueryType | null>(null);
    const [mode, setMode] = useState<SearchMode | null>(null);

    const [hidden, setHidden] = useToggle(true);
    const [menuList, setMenuList] = useState<any[]>([]);
    const [recentPaths, setRecentPaths] = useState<string[]>([]);

    useDebounce(
        () => {
            setDebouncedSearchText(searchText);
            handleIdentifierQuery(searchText);
        },
        500,
        [searchText]
    );

    const open_spotlight = useCallback(() => {
        setMode(null);
        setHidden(false);
        setSearchType(null);
        setSearchText('');

        onOpen();
    }, [onOpen, setHidden]);

    const open_history = useCallback(() => {
        open_spotlight();
        setMode('history');
    }, [open_spotlight]);

    const close_spotlight = useCallback(() => {
        if (mode === 'query') {
            setMode(null);
            setSearchType(null);
            return;
        }

        setHidden(true);
        onClose();
    }, [mode, onClose, setHidden]);

    const force_close = useCallback(() => {
        setMode(null);
        setSearchType(null);
        setHidden(true);
        onClose();
    }, [onClose, setHidden]);

    const searchQueryItems = useMemo(() => {
        const items: SearchQueryItem[] = [
            {
                name: 'GSTIN',
                type: 'gstin',
                method: 'getGstin',
                transformData: (data) => {
                    if (!data) return [];
                    return [
                        {
                            id: data.gstin,
                            identifier: data.gstin,
                            subtitle: data.trade_name,
                        },
                    ];
                },
                detailAction: (gstin) => {
                    if (IsFunction(Functions.openGSTFillingDetails))
                        Functions.openGSTFillingDetails(gstin);
                    force_close();
                },
            },
        ];

        return items.filter((item) => queries.includes(item.type));
    }, [force_close, queries]);

    const currentQueryItems: SearchQueryItem = useMemo(
        () => GetObjectFromArray(searchQueryItems, 'type', searchType),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchType]
    );

    const fetchDocumentList = async (searchType: SearchQueryType) => {
        const className = SPOTLIGHT_QUERY_CONTROLLER_ROUTE[searchType];
        if (!className) return { success: false };

        const { success, response } = await FetchData({
            className,
            method: currentQueryItems?.method || 'list',
            methodParams: debouncedSearchText,
            classParams: {
                search: debouncedSearchText,
                limit: 5,
                document_type_identifier: searchType,
                ...currentQueryItems?.filterClassParams,
            },
        });

        if (!success) return Promise.reject([]);
        if (IsFunction(currentQueryItems?.transformData))
            return currentQueryItems.transformData(response);
        return response.records;
    };

    const { data, isFetching } = useQuery({
        initialData: [],
        queryKey: ['spotlightSearch', 'query', debouncedSearchText, searchType],
        enabled:
            mode === 'query' &&
            IsValidString(searchType) &&
            IsValidString(debouncedSearchText) &&
            debouncedSearchText.length >= 3,
        queryFn: () => fetchDocumentList(searchType),
    });

    const filteredMenus = useMemo(() => {
        if (IsValidString(mode)) return [];
        if (!IsValidString(searchText)) return menuList;

        const fuse = new Fuse(menuList, {
            keys: [
                { name: 'name', weight: 2 },
                { name: 'parent', weight: 1.5 },
                'path',
            ],
            threshold: 0.4,
        });

        const searchResult = fuse.search(searchText);
        return searchResult.flatMap((result) => result.item);
    }, [menuList, searchText, mode]);

    const filteredRecents = useMemo(() => {
        if (mode && mode !== 'history') return [];
        if (IsValidString(searchText) && mode !== 'history') return [];
        if (!IsValidString(searchText)) return recentPaths;

        const fuse = new Fuse(recentPaths, {
            keys: [{ name: 'detail.display_name', weight: 2 }, 'path'],
            threshold: 0.4,
        });

        const searchResult = fuse.search(searchText);
        return searchResult.flatMap((result) => result.item);
    }, [mode, recentPaths, searchText]);

    const handlers = useMemo(
        () => ({
            open_spotlight,
            open_history,
            close_spotlight,
        }),
        [open_spotlight, open_history, close_spotlight]
    );

    const handlePages = (pages: any) => {
        const menus: any[] = [];
        pages.forEach((page: any) => {
            const innerMenus = [
                ...(page.menus || []),
                ...(page.dropdownMenus || []),
            ].filter((menu) => menu.visibility === true);

            if (page.path && page.path.length > 0 && !innerMenus.length) {
                menus.push({ name: page.display_name, path: page.path });
                if (
                    page.ui_action &&
                    IndexOfObjectInArray(
                        menus,
                        'action',
                        page.ui_action.name
                    ) === -1
                ) {
                    menus.push({
                        name: page.ui_action.display_name,
                        action: page.ui_action.name,
                    });
                }
                return;
            }

            if (innerMenus?.length > 0) {
                innerMenus.forEach((menu: any) => {
                    if (menu.path && menu.path.length > 0) {
                        menus.push({
                            name: menu.display_name,
                            parent: page.display_name,
                            path: menu.path,
                        });
                    }
                    if (menu.addPath && menu.addPath.length > 0) {
                        menus.push({
                            name: `Create ${menu.display_name}`,
                            parent: page.display_name,
                            path: menu.addPath,
                        });
                    }
                    if (
                        menu.ui_action &&
                        IndexOfObjectInArray(
                            menus,
                            'action',
                            menu.ui_action.name
                        ) === -1
                    ) {
                        if (!menu.path) {
                            menus.push({
                                name: menu.display_name,
                                parent: page.display_name,
                                action: menu.ui_action.name,
                            });
                        }
                        if (menu.path) {
                            menus.push({
                                name: menu.ui_action.display_name,
                                parent: page.display_name,
                                action: menu.ui_action.name,
                            });
                        }
                    }
                });
            }
        });

        if (IsEmptyArray(menus)) return;
        setMenuList(menus);
    };

    const handleIdentifierQuery = (text: string) => {
        if (!!searchType) return null;
        if (text.length < 3) return null;

        for (const [key, pattern] of Object.entries(IdentifierConstants)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(text)) {
                setMode('query');
                setSearchType(key as any);
                return key;
            }
        }
    };

    useEffect(() => {
        SubscribeToEvent({
            eventName: OPEN_SPOTLIGHT,
            callback: open_spotlight,
        });

        return () => {
            UnsubscribeEvent({
                eventName: OPEN_SPOTLIGHT,
                callback: open_spotlight,
            });
        };
    }, [open_spotlight]);

    useEffect(() => {
        handlePages(menus);
    }, [menus]);
    useEffect(() => {
        SubscribeToEvent({
            eventName: CLOSE_SPOTLIGHT,
            callback: close_spotlight,
        });

        return () => {
            UnsubscribeEvent({
                eventName: CLOSE_SPOTLIGHT,
                callback: close_spotlight,
            });
        };
    }, [close_spotlight]);

    useEffect(() => {
        handlePages(menus);
    }, [menus]);

    return {
        mode,
        searchData: data,
        searchText,
        searchType,
        searchQueryItems,
        debouncedSearchText,
        isSearchLoading: isFetching,
        currentQueryItems,
        hidden,
        filteredMenus,
        recentPaths,
        filteredRecents,
        handlers,
        setMode,
        setRecentPaths,
        setHidden,
        setSearchText,
        setSearchType,
    };
};

export const OpenSpotlight = () => {
    StoreEvent({ eventName: OPEN_SPOTLIGHT, isTemp: true });
};
