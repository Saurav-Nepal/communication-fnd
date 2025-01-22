import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Label } from './label';

const meta: Meta<typeof Label> = {
    title: 'Component/Label',
    component: Label,
};

export default meta;

export const Example: StoryFn<typeof Label> = (args) => {
    return (
        <div className='flex items-center justify-center w-full'>
            <Label {...args} />
        </div>
    );
};

Example.args = {
    label: 'Hello World',
    required: true,
};
