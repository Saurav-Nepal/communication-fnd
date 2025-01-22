import React from 'react';

import { ScrollArea } from '../../scroll-area/scroll-area';

type MainMenuTopListType = {
    children: React.ReactNode;
};

export const MainMenuTopList = ({ children }: MainMenuTopListType) => {
    return (
        <ScrollArea className='pt-6'>
            <div className='flex flex-col gap-3 px-3'>{children}</div>
        </ScrollArea>
    );
};
