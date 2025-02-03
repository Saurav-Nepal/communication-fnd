'use client';

import { useApp, useMenu } from '@finnoto/core';
import { cn, Sidebar } from '@finnoto/design-system';

import { SpotlightSearch } from '@Components/Spotlight/spotlightSearch.component';

import ArcHeader from '../Components/arc.header.component';

const ArcAdminWrapper = ({ children }: any) => {
    const { modules, bottomModules } = useMenu();
    const { isSidebarExpand } = useApp();

    return (
        <main className='dashboard full-width-topnav arc-portal'>
            <ArcHeader />
            <div className='relative flex-1 row-flex'>
                <Sidebar
                    menus={modules}
                    bottomMenus={bottomModules}
                    hideBanner
                    showArcHamburger
                />
                <article
                    className={cn('relative dashboard-content', {
                        expanded: isSidebarExpand,
                    })}
                >
                    {children}
                </article>
            </div>
            <SpotlightSearch
                menus={[...modules, ...bottomModules]}
                queries={['gstin']}
            />
        </main>
    );
};

export default ArcAdminWrapper;
