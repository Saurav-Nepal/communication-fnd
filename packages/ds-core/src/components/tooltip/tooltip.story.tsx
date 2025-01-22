import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Button } from '../button/button';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Component/Tooltip',
    component: Tooltip,
};

export default meta;

export const Example: StoryFn<typeof Tooltip> = ({ ...args }) => {
    return (
        <Tooltip {...args}>
            <Button>Hover me</Button>
        </Tooltip>
    );
};

Example.args = {
    message: 'This is a tooltip',
    variant: 'error',
    type: 'top',
    position: 'center',
    arrow: true,
    sideOffset: 10,
};
