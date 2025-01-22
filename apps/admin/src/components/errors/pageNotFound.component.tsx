import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@slabs/ds-core';

const PageNotFound = () => {
    return (
        <div className='h-[calc(100vh-(var(--header-height)+1rem))] flex items-center justify-center w-full'>
            <div className='flex items-center justify-center p-10 rounded bg-card w-fit '>
                <div className='flex flex-col items-center w-full'>
                    <div className='max-w-[740px]'>
                        <Image
                            src='/404.png'
                            alt='error image'
                            className='object-cover w-full h-full'
                            width={600}
                            height={400}
                        />
                    </div>
                    <div className='mt-16 text-center'>
                        <div className='text-2xl font-semibold md:text-4xl lg:text-5xl text-default-900'>
                            Oops! Page Not Found
                        </div>
                        <div className='mt-3 text-sm text-default-600 md:text-base'>
                            The page you are looking for might have been removed
                            had <br /> its name changed or is temporarily
                            unavailable.
                        </div>
                        <Button
                            asChild
                            className='mt-9  md:min-w-[300px]'
                            size='lg'
                        >
                            <Link href='/'>Go to Homepage</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
