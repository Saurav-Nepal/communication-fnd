import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { useBoolean } from '@slabs/ds-hooks';

import { BellIcon } from '@radix-ui/react-icons';

import { Button } from '../button/button';
import { Header } from './header';

const meta: Meta<typeof Header> = {
    title: 'Component/Header',
    component: Header,
};

export default meta;

export const Example: StoryFn<typeof Header> = () => {
    const [isCollapsed, setIsCollapsed] = useBoolean(false);

    return (
        <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            user={{
                title: 'Rhn Doe',
                subtitle: 'john@gmail.com',
                image: 'https://picsum.photos/200/300',
                actions: [
                    {
                        key: 'profile',
                        name: 'Profile',
                        action: () => {},
                    },
                    {
                        key: 'theme',
                        name: 'Theme',
                        subMenuActions: [
                            {
                                key: 'system',
                                name: 'System',
                            },
                            {
                                key: 'dark',
                                name: 'Dark',
                            },
                            {
                                key: 'light',
                                name: 'Light',
                            },
                        ],
                    },
                    {
                        key: 'logout',
                        name: 'Logout',
                        action: () => {},
                        isCancel: true,
                    },
                ],
            }}
        />
    );
};

Example.args = {};

export const CustomUserTrigger: StoryFn<typeof Header> = () => {
    const [isCollapsed, setIsCollapsed] = useBoolean(false);

    return (
        <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            user={{
                title: 'Rhn Doe',
                subtitle: 'john@gmail.com',
                image: 'https://picsum.photos/200/300',
                actions: [
                    {
                        key: 'profile',
                        name: 'Profile',
                        action: () => {},
                    },
                    {
                        key: 'theme',
                        name: 'Theme',
                        subMenuActions: [
                            {
                                key: 'system',
                                name: 'System',
                            },
                            {
                                key: 'dark',
                                name: 'Dark',
                            },
                            {
                                key: 'light',
                                name: 'Light',
                            },
                        ],
                    },
                    {
                        key: 'logout',
                        name: 'Logout',
                        action: () => {},
                        isCancel: true,
                    },
                ],
                customTrigger: <Button>Custom Trigger</Button>,
            }}
        />
    );
};

export const NoActions: StoryFn<typeof Header> = () => {
    const [isCollapsed, setIsCollapsed] = useBoolean(false);

    return (
        <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            user={{
                title: 'Rhn Doe',
                subtitle: 'john@gmail.com',
                image: 'https://picsum.photos/200/300',
            }}
        />
    );
};

export const CustomRightComponent: StoryFn<typeof Header> = () => {
    const [isCollapsed, setIsCollapsed] = useBoolean(false);

    return (
        <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            user={{
                title: 'Rhn Doe',
                subtitle: 'john@gmail.com',
                image: 'https://picsum.photos/200/300',
            }}
            rightComponent={
                <div className='flex items-center gap-3'>
                    <BellIcon width={20} height={20} />
                </div>
            }
        />
    );
};
