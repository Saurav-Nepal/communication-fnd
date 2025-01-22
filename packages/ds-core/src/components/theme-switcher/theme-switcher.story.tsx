import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { ThemeSwitcher } from './theme-switcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'Component/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof ThemeSwitcher> = () => {
    return <ThemeSwitcher />;
};

Example.args = {};
