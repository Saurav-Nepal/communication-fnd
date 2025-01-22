import React from 'react';
import { LogOutIcon } from 'lucide-react';

import { Typography } from '../../typography/typography';
import { SidebarSubmenuFooterType } from '../sidebar.types';
import { isCustomFooter } from '../sidebar.utils';

export const SubmenuFooter = (props: SidebarSubmenuFooterType) => {
    return (
        <div className='flex items-center justify-between gap-3 px-4 py-2 mt-auto bg-background'>
            {isCustomFooter(props) ? (
                props.renderFooter
            ) : (
                <>
                    <div className='flex flex-col'>
                        <Typography variant='info' weight='medium'>
                            {props.title}
                        </Typography>
                        <Typography
                            variant='subInfo'
                            className='text-muted-foreground'
                        >
                            {props.subtitle}
                        </Typography>
                    </div>
                    <button onClick={props.action} className='group'>
                        <LogOutIcon
                            size={20}
                            className='transition-all text-muted-foreground group-hover:text-error'
                        />
                    </button>
                </>
            )}
        </div>
    );
};
