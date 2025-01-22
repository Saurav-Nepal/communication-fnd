import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'Component/Switch',
    component: Switch,
    argTypes: {
        disabled: {
            type: 'boolean',
        },
        readOnly: {
            type: 'boolean',
        },
    },
};

export default meta;

export const Example: StoryFn<typeof Switch> = ({ ...args }) => {
    return <Switch {...args} />;
};
