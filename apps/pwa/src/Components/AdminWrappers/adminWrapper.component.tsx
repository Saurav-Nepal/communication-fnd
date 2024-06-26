import { AdminWrapperProps } from '@finnoto/core';

const AdminWrapper = ({ children }: AdminWrapperProps) => {
    return (
        <main className='dashboard'>
            <article className='dashboard-content'>{children}</article>
        </main>
    );
};

export default AdminWrapper;
