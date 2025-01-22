import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { DropdownAction } from './drop-down-action';

const meta: Meta<typeof DropdownAction> = {
    title: 'Component/DropdownAction',
    component: DropdownAction,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof DropdownAction> = ({ ...args }) => {
    return (
        <DropdownAction
            menuLabel='Settings Management'
            {...args}
            isSearchable
            actions={[
                {
                    name: 'Profile',
                    key: 'profile',
                    suffix: '⌘P',
                    isCancel: true,
                },

                {
                    name: 'Theme',
                    key: 'theme',
                    subMenuActions: [
                        {
                            name: 'System',
                            key: 'system',
                        },
                        {
                            name: 'Dark',
                            key: 'dark',
                        },
                        {
                            name: 'Light',
                            key: 'light',
                        },
                    ],
                },

                {
                    name: 'Settings',
                    key: 'settings',
                    suffix: '⌘S',
                    subMenuActions: [
                        {
                            name: 'General',
                            key: 'general',
                        },
                        {
                            name: 'Personal',
                            key: 'personal',
                        },
                        {
                            name: 'Market',
                            key: 'market',
                            subMenuActions: [
                                {
                                    name: 'Settings',
                                    key: 'settings',
                                },
                            ],
                        },
                    ],
                },
            ]}
            // isSearchable={false}
        />
    );
};
