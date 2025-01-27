import React from 'react';
import {
    ArrowBigLeft,
    CameraIcon,
    CheckCircle,
    FileIcon,
    InfoIcon,
    Mic,
} from 'lucide-react';

export const YourTemplatesPreview = ({
    body = '',
    title = '',
    footer = '',
}: {
    body: string;
    title?: string;
    footer?: string;
}) => {
    return (
        <div className='w-[350px] h-[612px] bg-green-400 rounded-lg shadow-md flex flex-col'>
            <header className='w-full h-[44px] bg-primary-900 flex items-center px-4 justify-between'>
                <div className='flex gap-2 items-center'>
                    <i className='material-symbols-outlined text-primary-50'>
                        <ArrowBigLeft color='white' />
                    </i>
                    <div className='w-[28px] h-[28px] bg-white rounded-full overflow-hidden'>
                        <img
                            src='https://tools-api.webcrumbs.org/image-placeholder/28/28/avatars/1'
                            alt='avatar'
                            className='object-contain w-full h-full'
                        />
                    </div>
                    <span className='text-sm text-primary-50 font-title'>
                        Whatsapp
                    </span>
                    <span className='text-sm text-white material-symbols-outlined'>
                        <CheckCircle />
                    </span>
                </div>
            </header>
            <section className='flex flex-col flex-1 gap-4 justify-start items-center p-4 bg-neutral-300'>
                <div className='w-[90%] bg-primary text-white p-2 flex rounded-md text-primary-950 text-xs'>
                    <i className='mr-1 text-base align-middle material-symbols-outlined text-primary-500'>
                        <InfoIcon />
                    </i>
                    <span>
                        This business uses a secure service from Meta to manage
                        this chat. Tap to learn more
                    </span>
                </div>
                <div className='bg-white rounded-md p-3 shadow-md  w-[90%] self-end flex flex-col gap-1 text-black'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold'>{title}</h3>
                        <span
                            className='text-sm text-primary-950'
                            dangerouslySetInnerHTML={{ __html: body }}
                        ></span>
                    </div>
                    <div className='flex items-end text-muted-foreground'>
                        <span className='flex-1 text-xs text-primary-950'>
                            {footer}
                        </span>
                        <span className='text-xs text-right text-neutral-500'>
                            {`${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`}
                        </span>
                    </div>
                </div>
            </section>
            <footer className='w-full h-[60px] bg-neutral-50 flex items-center gap-3 px-4'>
                <i className='material-symbols-outlined text-primary-500'>
                    <FileIcon />
                </i>
                <div className='flex-1 px-4 py-2 bg-white rounded-full border border-neutral-300'>
                    <input
                        type='text'
                        placeholder='Type a message'
                        className='w-full text-sm bg-transparent outline-none text-primary-950'
                    />
                </div>
                <i className='material-symbols-outlined text-primary-500'>
                    <Mic />
                </i>
                <i className='material-symbols-outlined text-primary-500'>
                    <CameraIcon />
                </i>
            </footer>
        </div>
    );
};
