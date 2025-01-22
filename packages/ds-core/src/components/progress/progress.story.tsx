import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Button } from '../button/button';
import { CircularProgress } from './circular-progress';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
    title: 'Component/Progress',
    component: Progress,
};

export default meta;

export const Basic: StoryFn<typeof Progress> = ({ ...args }) => {
    return <Progress {...args} />;
};

Basic.args = {
    variant: 'primary',
    size: 'md',
    duration: 300,
    radius: 'none',
    animate: false,
    value: 50,
    background: 'muted',
};

export const Animated: StoryFn<typeof Progress> = ({ ...args }) => {
    return <Progress {...args} />;
};

Animated.args = {
    variant: 'primary',
    size: 'md',
    duration: 300,
    radius: 'none',
    animate: true,
    value: 50,
    background: 'muted',
};

export const Large: StoryFn<typeof Progress> = ({ ...args }) => {
    return <Progress {...args} />;
};

Large.args = {
    variant: 'primary',
    size: 'lg',
    duration: 300,
    radius: 'none',
    animate: false,
    value: 50,
    background: 'muted',
};

export const Variants: StoryFn<typeof Progress> = ({ ...args }) => {
    return <Progress {...args} />;
};

Variants.args = {
    variant: 'success',
    size: 'md',
    duration: 300,
    radius: 'none',
    animate: false,
    value: 50,
    background: 'muted',
};

export const CircularProgressBar: StoryFn<typeof CircularProgress> = ({
    ...args
}) => {
    const [value, setValue] = React.useState(50);
    const handleAdd = () => {
        if (value < 100) {
            setValue(value + 10);
        }
    };

    const handleSubtract = () => {
        if (value > 0) {
            setValue(value - 10);
        }
    };

    return (
        <>
            <div className='flex items-center gap-2'>
                <CircularProgress
                    value={value}
                    color='primary'
                    size='md'
                    showValue
                />
                <div className='flex gap-2'>
                    <Button size={'xs'} onClick={handleSubtract}>
                        -
                    </Button>
                    <Button size={'xs'} onClick={handleAdd}>
                        +
                    </Button>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <CircularProgress value={67} color='success' size={'micro'} />
                <CircularProgress value={67} color='info' size={'mini'} />
                <CircularProgress value={67} color='warning' size={'small'} />

                <CircularProgress
                    value={50}
                    color='primary'
                    loading
                    size={'xs'}
                />
                <CircularProgress
                    value={50}
                    color='dark'
                    isStripe
                    size={'sm'}
                />
                <CircularProgress
                    value={90}
                    color='warning'
                    showValue
                    size={'md'}
                />
                <CircularProgress value={80} color='error' size={'lg'} />
                <CircularProgress value={80} color='success' size={'xl'} />
            </div>
        </>
    );
};

CircularProgressBar.args = {
    color: 'primary',
    size: 'md',
    value: 50,
    showValue: true,
};
