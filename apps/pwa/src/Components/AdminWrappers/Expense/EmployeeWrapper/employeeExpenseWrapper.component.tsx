'use client';

import { AdminWrapperProps } from '@finnoto/core';

const EmployeeExpenseWrapper = ({ children }: AdminWrapperProps) => {
    return (
        <main className='dashboard'>
            <article className='dashboard-content'>{children}</article>
        </main>
    );
};

export default EmployeeExpenseWrapper;
