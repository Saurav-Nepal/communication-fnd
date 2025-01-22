import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Component/Avatar',
    component: Avatar,
    argTypes: {
        asChild: {
            type: 'boolean',
            defaultValue: true,
        },
    },
};

export default meta;

export const Example: StoryFn<typeof Avatar> = ({ ...args }) => {
    return (
        <Avatar {...args}>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};
export const AvatarImageExample: StoryFn<typeof Avatar> = ({ ...args }) => {
    return (
        <Avatar {...args} asChild={false}>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};
