import { useRef } from 'react';
import { SearchIcon } from 'lucide-react';

import {
    Badge,
    InputGroup,
    InputGroupElement,
    InputGroupInput,
    Spotlight,
    SpotlightEmpty,
    SpotlightGroup,
    SpotlightInput,
    SpotlightItem,
    SpotlightList,
} from '@slabs/ds-core';
import { isEmptyArray } from '@slabs/ds-utils';

import { AdminWrapperProps } from '@/types';

import useSpotlightSearch from './useSpotlightSearch';

const SpotlightSearch = ({ menus }: { menus: AdminWrapperProps['menus'] }) => {
    const {
        isOpen,
        search,
        setSearch,
        setIsOpen,
        searchMenus,
        os,
        handleMenuClick,
        mode,
        setMode,
        history,
    } = useSpotlightSearch({ menus });

    const cmdRef = useRef<HTMLDivElement>(null);

    return (
        <Spotlight
            trigger={
                <InputGroup
                    size='sm'
                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
                    onClick={() => setIsOpen(true)}
                    className='min-w-[300px]'
                >
                    <InputGroupElement>
                        <SearchIcon size={12} />
                    </InputGroupElement>
                    <InputGroupInput placeholder='Search...' readOnly />
                    <InputGroupElement className='text-xs text-muted-foreground'>
                        {os === 'macos' ? '⌘' : 'Ctrl'} + K
                    </InputGroupElement>
                </InputGroup>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onOpen={(e) => {
                if (e.key === 'h') {
                    setMode('history');
                }
            }}
            keys={['mod+k', 'mod+h']}
            onClose={() => setMode('search')}
            disableFilter
        >
            <div className='relative'>
                <SpotlightInput
                    placeholder='What do you need?'
                    value={search}
                    onChange={(val) => {
                        setSearch(val.trimStart());

                        setTimeout(() => {
                            cmdRef?.current?.scrollTo({
                                top: 0,
                                behavior: 'instant',
                            });
                        }, 100);
                    }}
                />
                {mode === 'history' && (
                    <div className='flex absolute right-2 top-1/2 gap-2 items-center pr-8 -translate-y-1/2'>
                        <Badge variant='primary' type='bordered' size='xs'>
                            History
                        </Badge>
                    </div>
                )}
            </div>
            <SpotlightList ref={cmdRef}>
                <SpotlightEmpty />
                {!isEmptyArray(history) && (
                    <SpotlightGroup heading='History'>
                        {history?.map((menu) => (
                            <SpotlightItem
                                key={menu?.title}
                                title={menu?.title}
                                subtitle={menu?.url}
                                onClick={() => handleMenuClick?.(menu ?? {})}
                            />
                        ))}
                    </SpotlightGroup>
                )}

                {!isEmptyArray(searchMenus) && (
                    <SpotlightGroup heading='Menus'>
                        {searchMenus.map((menu) => (
                            <SpotlightItem
                                key={menu.title.join('')}
                                title={menu.title}
                                onClick={() => handleMenuClick(menu)}
                            />
                        ))}
                    </SpotlightGroup>
                )}
            </SpotlightList>
        </Spotlight>
    );
};

export default SpotlightSearch;
