import { Globe2, History, Link, LucideIcon, MoveRight } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-use';

import {
    GetItem,
    IsEmptyArray,
    IsObject,
    IsValidString,
    Navigation,
    ObjectDto,
    PublicRoutes,
    RECENT_PATH,
    SearchQueryType,
    SetItem,
    useApp,
    useSpotlightSearch,
} from '@finnoto/core';
import {
    Button,
    cn,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading,
    CommandSeparator,
    Icon,
    Modal,
} from '@finnoto/design-system';

export const SpotlightSearch = ({
    menus = [],
    queries = [],
}: {
    menus?: any[];
    queries?: SearchQueryType[];
}) => {
    const getFilterMenus = useCallback((menus: any) => {
        const newMenus = [];
        for (let menu of menus) {
            if (menu?.attributes?.no_pwa) continue;

            if (menu?.menus?.length > 0) {
                menu.menus = getFilterMenus(menu?.menus);
            }
            newMenus.push(menu);
        }
        return newMenus;
    }, []);
    const filterMenus = useMemo(() => {
        return getFilterMenus(menus);
    }, [getFilterMenus, menus]);

    const {
        mode,
        searchData,
        searchText,
        searchType,
        searchQueryItems,
        debouncedSearchText,
        isSearchLoading,
        currentQueryItems,
        hidden,
        filteredMenus,
        filteredRecents,
        handlers,
        setMode,
        setRecentPaths,
        setSearchText,
        setSearchType,
    } = useSpotlightSearch(filterMenus, queries, {
        onOpen: () => {
            const recentStates = GetItem(RECENT_PATH) || [];
            if (!IsEmptyArray(recentStates)) {
                setRecentPaths(recentStates);
            }
            // setTimeout(() => {
            //     inputRef.current?.focus();
            //     searchContainerRef.current?.scrollIntoView();
            // }, 100);
        },
    });

    const {
        state: { as: routePath },
    } = useLocation();
    const { menuDetails } = useApp();

    const storeRecentPath = useCallback(
        (path: string) => {
            const recentStates: any[] = GetItem(RECENT_PATH) || [];
            const pathParts = path.split('?');

            const recentArray = recentStates.filter((prevPath) => {
                if (IsObject(prevPath) && prevPath.path) {
                    const prevPathParts = prevPath.path.split('?');
                    return prevPathParts[0] !== pathParts[0];
                }
                return false;
            });
            recentArray.push({
                path,
                detail: { display_name: menuDetails?.display_name },
            });

            setRecentPaths(recentArray);
            SetItem(RECENT_PATH, recentArray);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [menuDetails]
    );

    const navigateToPath = (path: string) => {
        Modal.closeAll();
        Navigation.navigate({ url: path });
        storeRecentPath(path);
    };

    useEffect(() => {
        const isPublicRoute = Object.values(PublicRoutes).some((route) =>
            routePath.startsWith(route)
        );
        if (isPublicRoute) return;
        storeRecentPath(routePath);
    }, [routePath, storeRecentPath]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.metaKey) {
                handlers.open_spotlight();
            }
            if (e.key === 'h' && e.metaKey) {
                handlers.open_history();
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [handlers]);

    const renderRecentSearch = (items: any[]) => {
        if (IsEmptyArray(items)) return null;

        let filteredItems = [...items].reverse();
        filteredItems = filteredItems.filter(
            (item: any) => item?.path !== routePath
        );
        if (mode !== 'history') {
            filteredItems = filteredItems.slice(0, 5);
        }

        if (IsEmptyArray(filteredItems)) return null;

        return (
            <>
                <CommandGroup heading='History'>
                    {filteredItems.map((path, index: number) => {
                        const pathName = path?.path;
                        if (!pathName) return null;

                        return (
                            <Item
                                key={index}
                                icon={History}
                                subtitle={pathName}
                                title={path?.detail?.display_name}
                                onClick={() => {
                                    navigateToPath(pathName);
                                    handlers.close_spotlight();

                                    // when the user clicks then i close all dialogs

                                    Modal.closeAll();
                                }}
                            />
                        );
                    })}
                </CommandGroup>
            </>
        );
    };

    const renderMenus = (items: any[]) => {
        if (IsEmptyArray(items)) return null;

        return (
            <CommandGroup heading='Menus'>
                {items.map((menu, index: number) => {
                    return (
                        <Item
                            key={index}
                            title={
                                <span>
                                    Go to{' '}
                                    <span>
                                        {menu.parent ? (
                                            <span>{menu.parent} &rarr;</span>
                                        ) : null}{' '}
                                        {menu.name}
                                    </span>
                                </span>
                            }
                            onClick={() => {
                                navigateToPath(menu.path);
                                handlers.close_spotlight();
                            }}
                        />
                    );
                })}
            </CommandGroup>
        );
    };

    const renderQuerySearch = (items: typeof searchQueryItems) => {
        if (IsEmptyArray(items) || !!mode || IsValidString(searchType))
            return null;

        return (
            <CommandGroup heading='Query'>
                {items.map((item, index: number) => {
                    return (
                        <Item
                            key={index}
                            icon={Globe2}
                            title={<span>{item.name}</span>}
                            onClick={() => {
                                setMode('query');
                                setSearchType(item.type);
                            }}
                        />
                    );
                })}
            </CommandGroup>
        );
    };

    const renderQueryResults = (items: ObjectDto[]) => {
        if (!IsValidString(searchType) || mode !== 'query') return null;
        if (IsEmptyArray(items)) return null;

        return (
            <CommandGroup heading='Query'>
                {items.map((item, index: number) => {
                    return (
                        <Item
                            key={index}
                            icon={Link}
                            title={
                                <span>
                                    <b className='capitalize'>
                                        {searchType?.split('_').join(' ')}
                                    </b>{' '}
                                    &rarr; {item.identifier}
                                </span>
                            }
                            subtitle={item.subtitle}
                            onClick={() => {
                                currentQueryItems.detailAction(item.id);
                            }}
                        />
                    );
                })}
            </CommandGroup>
        );
    };

    return (
        <CommandDialog
            open={!hidden}
            onOpenChange={(open) => {
                if (open) handlers.open_spotlight();
                if (!open) handlers.close_spotlight();
            }}
            full
            modal
        >
            <div className='relative'>
                <CommandInput
                    value={searchText}
                    placeholder='What do you need?'
                    onValueChange={(value) => setSearchText(value.trimStart())}
                />
                {IsValidString(searchType) && (
                    <div className='absolute items-center gap-2 -translate-y-1/2 right-2 top-1/2 text-base-secondary row-flex'>
                        <div className='text-xs capitalize badge badge-outline badge-sm'>
                            {searchType?.split('_').join(' ')}
                        </div>
                        <Icon source={'travel_explore'} />
                        <div className='kbd kbd-xs'>Esc</div>
                    </div>
                )}

                {mode === 'history' && (
                    <div className='absolute items-center gap-2 -translate-y-1/2 right-2 top-1/2 text-base-secondary row-flex'>
                        <div className='text-xs badge badge-outline badge-sm'>
                            HISTORY
                        </div>
                        <div className='kbd kbd-xs'>Esc</div>
                    </div>
                )}
            </div>
            <CommandList className='sm:max-h-[400px]'>
                {!searchQueryItems.length && (
                    <CommandEmpty hidden={isSearchLoading}>
                        No results found.
                    </CommandEmpty>
                )}

                {!!searchQueryItems.length && (
                    <CommandEmpty hidden={isSearchLoading}>
                        <div className='items-center justify-center flex-1 gap-2 col-flex'>
                            {debouncedSearchText.length < 3 ? (
                                <span>
                                    Enter Search query (min 3 characters)
                                </span>
                            ) : (
                                <span>No results found.</span>
                            )}
                            <Button
                                appearance='errorHover'
                                size='xs'
                                onClick={() => {
                                    setMode(null);
                                    setSearchType(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CommandEmpty>
                )}
                {isSearchLoading ? (
                    <CommandLoading />
                ) : (
                    <>
                        {renderRecentSearch(filteredRecents)}
                        <CommandSeparator />
                        {renderMenus(filteredMenus)}
                        <CommandSeparator />
                        {renderQuerySearch(searchQueryItems)}
                        {renderQueryResults(searchData)}
                    </>
                )}
            </CommandList>
        </CommandDialog>
    );
};

const Item = ({
    icon = MoveRight,
    title,
    subtitle,
    onClick,
}: {
    icon?: LucideIcon;
    title: string | ReactNode;
    subtitle?: string;
    onClick?: (e) => void;
}) => {
    const IconComponent = icon;

    return (
        <CommandItem
            className={cn({ 'py-1.5': !!subtitle })}
            onSelect={onClick}
        >
            <IconComponent className='w-4 h-4 mr-2' />
            <span>
                <div className='text-base'>{title}</div>
                {!!subtitle && <div className='text-xs'>{subtitle}</div>}
            </span>
        </CommandItem>
    );
};
