import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Button } from './button';
import { RippleButton } from './ripple-button';

const meta: Meta<typeof Button> = {
    title: 'Component/Button',
    component: Button,
    argTypes: {
        tag: {
            type: 'string',
            table: {
                defaultValue: { summary: 'button' },
            },
        },
    },
};

export default meta;

export const Example: StoryFn<typeof Button> = ({ ...args }) => {
    return <Button {...args} />;
};

export const RippleButtons: StoryFn<typeof RippleButton> = ({ ...args }) => {
    return <RippleButton {...args} />;
};

export const PressEffect: StoryFn<typeof Button> = ({ ...args }) => {
    return <Button {...args} />;
};
export const ClickEffect: StoryFn<typeof Button> = ({ ...args }) => {
    return <Button {...args} />;
};

export const LoadingButton: StoryFn<typeof Button> = ({ ...args }) => {
    return <Button {...args} />;
};

Example.args = {
    variant: 'default',
    size: 'default',
    children: 'Button',
    tag: 'button',
};

RippleButtons.args = {
    variant: 'outline',
    size: 'default',
    children: 'Button',
    tag: 'button',
    color: 'error',
};

PressEffect.args = {
    variant: 'default',
    size: 'default',
    children: 'Button',
    tag: 'button',
    btnPressEffect: true,
    color: 'primary',
};

ClickEffect.args = {
    variant: 'default',
    size: 'default',
    children: 'Button',
    tag: 'button',
    clickEffect: true,
    color: 'success',
};

LoadingButton.args = {
    variant: 'default',
    size: 'default',
    children: 'Button',
    tag: 'button',
    isLoading: true,
    color: 'info',
};
