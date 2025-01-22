import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Star } from 'lucide-react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
    title: 'Component/Badge',
    component: Badge,
    argTypes: {
        as: {
            type: 'string',
            table: {
                defaultValue: { summary: 'span' },
            },
        },
    },
};

export default meta;

export const Example: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

Example.args = {
    variant: 'error',
    size: 'md',
    children: 'Badge',

    as: 'span',
};

export const Bordered: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

Bordered.args = {
    type: 'bordered',
    variant: 'error',

    size: 'md',
    children: 'Badge',
    as: 'span',
    radius: 'md',
};

export const Gradient: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

Gradient.args = {
    type: 'gradient',
    variant: 'info',
    size: 'md',
    children: 'Badge',
    as: 'span',
};

export const Circle: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

Circle.args = {
    size: 'md',
    variant: 'error',
    className: 'items-center justify-center',
    shape: 'square',
    radius: 'full',
    children: 'B',
    as: 'span',
};

const LeftIconTemplate: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

export const LeftIcon = LeftIconTemplate.bind({});

LeftIcon.args = {
    size: 'md',
    variant: 'error',
    children: 'Badge',
    leftIcon: <Star className='w-3 h-3 ltr:mr-1 rtl:ml-1' />,
    as: 'span',
};

const RightIconTemplate: StoryFn<typeof Badge> = ({ ...args }) => {
    return <Badge {...args} />;
};

export const RightIcon = RightIconTemplate.bind({});
RightIcon.args = {
    size: 'md',
    variant: 'error',
    children: 'Badge',
    rightIcon: <Star className='w-3 h-3  ltr:mr-1 rtl:ml-1' />,
    as: 'span',
};
