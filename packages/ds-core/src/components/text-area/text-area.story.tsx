import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Textarea } from './text-area';

const meta: Meta<typeof Textarea> = {
    title: 'Component/TextArea',
    component: Textarea,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof Textarea> = ({ ...args }) => {
    return <Textarea {...args} />;
};

Example.args = {
    variant: 'flat-underline',
    color: 'primary',
};
