import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { useBoolean } from '@slabs/ds-hooks';

import { Hamburger } from './hamburger';

const meta: Meta<typeof Hamburger> = {
    title: 'Component/Hamburger',
    component: Hamburger,
    args: {},
};

export default meta;

export const Example: StoryFn<typeof Hamburger> = () => {
    const [isCollapsed, setIsCollapsed] = useBoolean(false);

    return (
        <div className='flex justify-center'>
            <Hamburger
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
        </div>
    );
};
