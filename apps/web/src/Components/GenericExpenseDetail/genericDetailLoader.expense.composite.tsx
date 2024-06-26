import { Container, PageTitle } from '@finnoto/design-system';

const GenericDetailExpenseLoader = () => {
    return (
        <Container className='gap-6 py-6 col-flex h-content-screen'>
            <PageTitle title='Loading ....' />
            <div className='flex items-center justify-between w-full'>
                <div className='w-full gap-2 py-0 text-sm breadcrumbs text-base-primary col-flex'>
                    <p className='w-1/4 h-5 mb-1 text-xl font-medium capitalize rounded bg-base-300/30 animate-pulse'></p>
                    <ul>
                        <li className='flex items-center w-full gap-2'>
                            <p className='w-1/12 h-5 mb-1 text-xl font-medium capitalize rounded bg-base-300/30 animate-pulse'></p>
                            <p className='w-1/12 h-5 mb-1 text-xl font-medium capitalize rounded bg-base-300/30 animate-pulse'></p>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 rounded bg-base-300/20 animate-pulse'></div>
                    <div className='w-40 h-10 rounded bg-base-300/20 animate-pulse'></div>
                </div>
            </div>
            <div className='flex items-center flex-1 gap-3'>
                <div className='w-3/12 h-full gap-3 p-4 rounded col-flex bg-base-300/20'>
                    <p className='w-1/4 h-16 mb-1 text-xl font-medium capitalize rounded bg-base-300/20 animate-pulse'></p>
                    <div className='gap-3 col-flex'>
                        <p className='h-10 mb-1 text-xl font-medium capitalize rounded w-4/4 bg-base-300/20 animate-pulse'></p>
                        <p className='h-10 mb-1 text-xl font-medium capitalize rounded w-4/4 bg-base-300/20 animate-pulse'></p>
                        <p className='h-10 mb-1 text-xl font-medium capitalize rounded w-4/4 bg-base-300/20 animate-pulse'></p>
                    </div>
                </div>
                <div className='w-full h-full gap-3 rounded col-flex'>
                    <div className='flex items-center gap-2 px-2 py-2 rounded bg-base-300/20'>
                        <div className='w-1/12 rounded h-7 animate-pulse bg-base-300/20'></div>
                        <div className='w-1/12 rounded h-7 animate-pulse bg-base-300/20'></div>
                        <div className='w-1/12 rounded h-7 animate-pulse bg-base-300/20'></div>
                        <div className='w-1/12 rounded h-7 bg-base-300/20'></div>
                    </div>
                    <div className='flex-1 w-full gap-2 p-4 rounded bg-base-300/20 col-flex'>
                        <div className='w-full h-12 rounded animate-pulse bg-base-300/20'></div>
                        <div className='w-full rounded h-52 animate-pulse bg-base-300/20'></div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default GenericDetailExpenseLoader;
