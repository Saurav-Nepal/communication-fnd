import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import LoginPage from './login.component';

const meta: Meta<typeof LoginPage> = {
    title: 'Component/LoginPage',
    component: LoginPage,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof LoginPage> = () => {
    return <LoginPage />;
};
