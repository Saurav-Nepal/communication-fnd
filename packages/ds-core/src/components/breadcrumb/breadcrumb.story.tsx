import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { BreadCrumb } from './breadcrumb';

const meta: Meta<typeof BreadCrumb> = {
    title: 'Component/BreadCrumb',
    component: BreadCrumb,
};

export default meta;

export const Example: StoryFn<typeof BreadCrumb> = ({ ...args }) => {
    return <BreadCrumb {...args} />;
};

Example.args = {
    spacing: 'sm',
    separator: '>',
    variant: 'sm',
    isMultiline: false,
    children: [<p>Home</p>, <p>List</p>, <p>Item</p>, <p>Details</p>],
    highlightLast: true,
};

export const WithTitle: StoryFn<typeof BreadCrumb> = ({ ...args }) => {
    return <BreadCrumb {...args} />;
};

WithTitle.args = {
    spacing: 'sm',
    separator: '>',
    variant: 'sm',
    isMultiline: false,
    children: [<p>Home</p>, <p>List</p>, <p>Item</p>, <p>Details</p>],
    highlightLast: true,
    title: 'Breadcrumb',
};

export const LargeSize: StoryFn<typeof BreadCrumb> = ({ ...args }) => {
    return <BreadCrumb {...args} />;
};

LargeSize.args = {
    spacing: 'md',
    separator: '>',
    variant: 'lg',
    isMultiline: false,
    children: [<p>Home</p>, <p>List</p>, <p>Item</p>, <p>Details</p>],
    highlightLast: true,
    title: 'Large Size',
};
