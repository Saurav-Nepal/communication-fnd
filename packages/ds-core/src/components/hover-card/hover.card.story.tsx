import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Button } from '../button/button';
import { Typography } from '../typography/typography';
import { HoverCard } from './hover.card';

const meta: Meta<typeof HoverCard> = {
    title: 'Component/HoverCard',
    component: HoverCard,
};

export default meta;

export const Example: StoryFn<typeof HoverCard> = (args) => {
    return (
        <div className='flex items-center justify-center w-full'>
            <HoverCard {...args} />
        </div>
    );
};

Example.args = {
    className: 'w-fit',
    openDelay: 0,
    closeDelay: 0,
    offsetX: 0,
    offsetY: 8,
    side: 'bottom',
    align: 'start',
    children: <Typography variant='subHeading'>Hover Card Content</Typography>,
    trigger: <Button>Hover Card Trigger</Button>,
};
