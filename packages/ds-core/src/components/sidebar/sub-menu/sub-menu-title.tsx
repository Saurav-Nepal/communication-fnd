import React from 'react';

import { cn } from '@slabs/ds-utils';

import { Typography } from '../../typography/typography';
import { useSidebarContext } from '../sidebar.context';

export const SubMenuTitle = ({ className }: { className?: string }) => {
    const { activeMenu } = useSidebarContext();

    return (
        <Typography variant={'heading'} className={cn('px-4 py-3', className)}>
            {activeMenu?.title}
        </Typography>
    );
};
