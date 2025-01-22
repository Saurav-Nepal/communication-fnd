import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Card, CardContent } from '../card/card';
import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
    title: 'Component/Alert',
    component: Alert,
    argTypes: {
        as: {
            type: 'string',
            table: {
                defaultValue: { summary: 'span' },
            },
        },
        variant: {
            options: ['default', 'info', 'warning', 'error', 'success'],
            table: {
                defaultValue: { summary: 'default' },
            },
        },
    },
};
export default meta;

export const Example: StoryFn<typeof Alert> = ({ ...args }) => {
    return (
        <Card>
            <CardContent>
                <Alert {...args} />
            </CardContent>
        </Card>
    );
};

Example.args = {
    variant: 'info',
    size: 'sm',
    children:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.',
    title: 'New version is available',
    className: 'max-w-[450px]',
    type: 'default',
    as: 'span',
};
