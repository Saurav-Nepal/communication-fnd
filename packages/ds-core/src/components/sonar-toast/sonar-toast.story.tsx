import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { toast } from 'sonner';

import { SlabProvider } from '../../core';
import { Toast } from '../../utils';
import { Button } from '../button/button';
import { Toaster } from './sonar-toast';

const meta: Meta<typeof Toaster> = {
    title: 'Component/Toaster',
    component: Toaster,
    argTypes: {},
};

export default meta;

export const NormalToast: StoryFn<typeof Toaster> = ({ ...args }) => {
    return (
        <SlabProvider>
            <Toaster {...args} />

            <Button
                onClick={() => {
                    toast.loading('This is an error toast', {
                        description: 'This is an error toast',
                        classNames: {
                            description: 'text-muted-foreground',
                            title: 'text-info-300',
                            closeButton: 'text-info-300',
                        },
                    });
                }}
            >
                Click Me
            </Button>
        </SlabProvider>
    );
};

export const ToastUtils: StoryFn<typeof Toaster> = ({ ...args }) => {
    return (
        <SlabProvider>
            <Toaster {...args} />
            <div className='flex flex-row gap-3'>
                <Button
                    onClick={() => {
                        Toast.error({
                            message: 'This is toast',
                            duration: 3000,
                            position: 'bottom-center',
                            description: 'This is an error toast',
                            closeButton: true,
                        });
                    }}
                    color={'error'}
                >
                    Error
                </Button>
                <Button
                    onClick={() => {
                        Toast.success({
                            message: 'This is toast',
                            duration: 1000,
                            position: 'bottom-left',
                            description: 'This is an success toast',
                            closeButton: true,
                        });
                    }}
                    color={'success'}
                >
                    Success
                </Button>
                <Button
                    onClick={() => {
                        Toast.warning({
                            message: 'This is toast',
                            duration: 3000,
                            position: 'top-right',
                            description: 'This is an warning toast',
                            closeButton: true,
                        });
                    }}
                    color={'warning'}
                >
                    Warning
                </Button>
                <Button
                    onClick={() => {
                        Toast.info({
                            message: 'This is Toast',

                            // duration: 3000,
                            position: 'top-center',

                            description: 'This is Info Toast With Action',
                            action: {
                                label: 'Action',
                                onClick: () => {},
                            },
                        });
                    }}
                    color={'info'}
                >
                    Info
                </Button>
                <Button
                    onClick={() => {
                        Toast.loading({
                            message: 'This is toast',
                            duration: 3000,
                            position: 'top-left',
                            description: 'This is an error toast',
                        });
                    }}
                    color={'primary'}
                >
                    Im Loading
                </Button>
                <Button
                    onClick={() => {
                        Toast.dismissAll();
                    }}
                    color={'secondary'}
                >
                    Dismiss All
                </Button>
            </div>
        </SlabProvider>
    );
};

NormalToast.args = {
    position: 'bottom-center',
};
