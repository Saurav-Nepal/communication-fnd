import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { RightClick } from './right-click';

const meta: Meta<typeof RightClick> = {
    title: 'Component/RightClick',
    component: RightClick,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof RightClick> = ({ ...args }) => {
    return (
        <RightClick
            {...args}
            actions={[
                {
                    name: 'Profile',
                    key: 'profile',
                    onClick: () => {},
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
        >
            <div className='flex items-center justify-center h-20 border border-dashed w-44'>
                Right Click Here
            </div>
        </RightClick>
    );
};
