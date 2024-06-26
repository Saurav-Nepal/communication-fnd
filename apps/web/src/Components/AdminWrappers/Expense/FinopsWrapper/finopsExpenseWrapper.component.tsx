'use client';

import { useMenu } from '@finnoto/core';
import { Sidebar } from '@finnoto/design-system';

import Header from '@Components/AdminWrappers/Components/header.component';
import { SpotlightSearch } from '@Components/Spotlight/spotlightSearch.component';

const FinopsExpenseWrapper = ({ children }: any) => {
    const { modules, bottomModules } = useMenu();

    return (
        <main className='dashboard expense-vendor'>
            <div className='relative flex-1 row-flex'>
                <Sidebar menus={modules} bottomMenus={bottomModules} />
                <article className='dashboard-content'>
                    <Header />
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

export default FinopsExpenseWrapper;
