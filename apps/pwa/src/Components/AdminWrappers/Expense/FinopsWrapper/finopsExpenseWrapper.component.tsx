'use client';

import { AdminWrapperProps } from '@finnoto/core';
import { cn } from '@finnoto/design-system';

const FinopsExpenseWrapper = ({ children }: AdminWrapperProps) => {
    return (
        <main className='dashboard'>
            <article className={cn('dashboard-content')}>{children}</article>
        </main>
    );
};

export default FinopsExpenseWrapper;
