import React from 'react';

import { SunIcon } from '@radix-ui/react-icons';

import { useSlabColorScheme } from '../../core';
import { DropdownAction } from '../dropdown-action/drop-down-action';

export const ThemeSwitcher = () => {
    const { setColorScheme } = useSlabColorScheme();

    return (
        <DropdownAction
            actions={[
                {
                    key: 'light',
                    name: 'Light',
                    action: () => setColorScheme?.('light'),
                },
                {
                    key: 'dark',
                    name: 'Dark',
                    action: () => setColorScheme?.('dark'),
                },
                {
                    key: 'auto',
                    name: 'System',
                    action: () => setColorScheme?.('auto'),
                },
            ]}
            align='end'
        >
            <button className='flex items-center transition-all bg-card justify-center w-8 h-8 rounded-full data-[state="open"]:bg-primary/10 focus:outline-none focus:shadow-none focus:ring-0 outline-none group hover:bg-primary/10'>
                <SunIcon
                    fontSize={16}
                    className='transition-all group-hover:text-primary text-card-foreground'
                />
            </button>
        </DropdownAction>
    );
};
